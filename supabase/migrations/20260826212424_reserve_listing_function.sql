-- Atomic reservation. Deliberately takes only (listing_id, address_id) and
-- derives the acting user from auth.uid() internally, rather than accepting
-- a user_id parameter — a client can never reserve on another user's behalf
-- by passing a different id. Errors are raised as the typed codes from the
-- blueprint's API error contract (§9.1) so the calling server action can
-- map them to safe user-facing messages without parsing text.

create or replace function public.reserve_listing(
  p_listing_id uuid,
  p_address_id uuid
)
returns public.reservations
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_user_id uuid := auth.uid();
  v_listing public.listings;
  v_reservation public.reservations;
begin
  if v_user_id is null then
    raise exception 'UNAUTHENTICATED';
  end if;

  if not exists (
    select 1 from public.addresses
    where id = p_address_id and user_id = v_user_id
  ) then
    raise exception 'VALIDATION_ERROR';
  end if;

  -- Lock the listing row for the duration of this transaction so a
  -- concurrent reserve_listing() call on the same item blocks here instead
  -- of racing past the status check below.
  select * into v_listing
  from public.listings
  where id = p_listing_id
  for update;

  if not found then
    raise exception 'ITEM_UNAVAILABLE';
  end if;

  -- Release any reservation on this listing that expired without
  -- converting to a claim, so a stale hold never blocks a fresh one.
  update public.reservations
  set status = 'expired'
  where listing_id = p_listing_id
    and status = 'active'
    and expires_at <= now();

  if v_listing.status = 'reserved'
     and not exists (
       select 1 from public.reservations
       where listing_id = p_listing_id and status = 'active'
     ) then
    update public.listings set status = 'available' where id = p_listing_id;
    v_listing.status := 'available';
  end if;

  if v_listing.status <> 'available' then
    raise exception 'ITEM_UNAVAILABLE';
  end if;

  if not exists (
    select 1 from public.recipient_eligibility
    where user_id = v_user_id and program_key = 'default' and status = 'eligible'
  ) then
    raise exception 'NOT_ELIGIBLE';
  end if;

  if exists (
    select 1 from public.reservations
    where user_id = v_user_id and status = 'active'
  ) then
    raise exception 'NOT_ELIGIBLE';
  end if;

  if exists (
    select 1 from public.claims
    where user_id = v_user_id
      and program_key = 'default'
      and entitlement_consumed_at is not null
  ) then
    raise exception 'NOT_ELIGIBLE';
  end if;

  insert into public.reservations (listing_id, user_id, address_id, status, expires_at)
  values (p_listing_id, v_user_id, p_address_id, 'active', now() + interval '15 minutes')
  returning * into v_reservation;

  update public.listings set status = 'reserved' where id = p_listing_id;

  perform public.log_audit(
    v_user_id,
    'reservation.created',
    'listing',
    p_listing_id::text,
    jsonb_build_object('status', 'available'),
    jsonb_build_object('status', 'reserved', 'reservation_id', v_reservation.id)
  );

  return v_reservation;
exception
  when unique_violation then
    -- A concurrent request won the partial-unique-index race on this
    -- listing or this user between our check and our insert.
    raise exception 'ITEM_UNAVAILABLE';
end;
$$;

grant execute on function public.reserve_listing(uuid, uuid) to authenticated;
