-- updated_at maintenance -----------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Role checks -------------------------------------------------------------
-- security definer + fixed search_path: these read profiles.role without
-- re-triggering profiles' own RLS policies (which would otherwise recurse).
--
-- language plpgsql (not sql): a `language sql` function body is parsed and
-- resolved against the catalog immediately at CREATE FUNCTION time, but
-- `profiles` is created later in the same migration sequence (see
-- core_tables.sql). plpgsql defers that resolution to first call, so the
-- forward reference is fine.

create or replace function public.current_role_is(roles public.user_role[])
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
stable
as $$
begin
  return exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = any(roles)
  );
end;
$$;

create or replace function public.is_staff()
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
stable
as $$
begin
  return public.current_role_is(array['operator', 'verifier', 'admin']::public.user_role[]);
end;
$$;

create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
stable
as $$
begin
  return public.current_role_is(array['admin']::public.user_role[]);
end;
$$;

grant execute on function public.current_role_is(public.user_role[]) to authenticated, anon;
grant execute on function public.is_staff() to authenticated, anon;
grant execute on function public.is_admin() to authenticated, anon;

-- Prevent a user from escalating their own role or lifting their own
-- restricted/banned status. Only blocks *self*-edits (old.id = auth.uid());
-- an admin editing someone else's row, or a service-role script with no
-- authenticated user context, is unaffected.

create or replace function public.prevent_self_role_change()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if auth.uid() = old.id and not public.is_admin() then
    if new.role is distinct from old.role then
      raise exception 'Only an admin can change a profile role';
    end if;
    if new.status is distinct from old.status then
      raise exception 'Only an admin can change a profile status';
    end if;
  end if;
  return new;
end;
$$;

-- Support / reference codes ------------------------------------------------

create or replace function public.generate_reference_code()
returns text
language sql
as $$
  select 'GI-' || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 6));
$$;

-- Audit log helper ----------------------------------------------------------
-- Callable from other security-definer functions (e.g. reserve_listing) so
-- privileged state transitions always leave an audit trail. Not exposed to
-- authenticated/anon directly — only via SECURITY DEFINER callers.

create or replace function public.log_audit(
  p_actor uuid,
  p_action text,
  p_entity_type text,
  p_entity_id text,
  p_before jsonb default null,
  p_after jsonb default null,
  p_request_id text default null
)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  insert into public.audit_logs (actor, action, entity_type, entity_id, before, after, request_id)
  values (p_actor, p_action, p_entity_type, p_entity_id, p_before, p_after, p_request_id);
end;
$$;
