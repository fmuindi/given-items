-- Every table below needs BOTH a table-level GRANT (or the Data API can't
-- see it at all — Postgres rejects the query before RLS is even evaluated)
-- AND an RLS policy (or a granted role sees zero rows). Grants are
-- deliberately minimal per table; RLS narrows further to specific rows.
--
-- Start from a clean slate rather than layering on top of whatever ambient
-- default privileges happen to exist. Local Supabase (and pre-2026-05-30
-- hosted projects) ship a legacy `alter default privileges ... grant all
-- on tables to anon, authenticated` rule that would otherwise make every
-- grant below a silent no-op — this migration should produce the same
-- result regardless of which default-privilege regime it runs against.
revoke all on all tables in schema public from anon, authenticated;

-- Stop that legacy rule from silently re-granting access to any table a
-- future migration adds without its own explicit grant.
alter default privileges in schema public revoke all on tables from anon, authenticated;

-- profiles --------------------------------------------------------------------

alter table public.profiles enable row level security;
grant select, update on public.profiles to authenticated;
grant select, insert, update on public.profiles to service_role;

create policy "profiles_select" on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_staff());

create policy "profiles_update" on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- recipient_eligibility ---------------------------------------------------------

alter table public.recipient_eligibility enable row level security;
grant select, insert, update on public.recipient_eligibility to authenticated;
grant select, insert, update on public.recipient_eligibility to service_role;

create policy "recipient_eligibility_select" on public.recipient_eligibility for select
  to authenticated
  using (user_id = auth.uid() or public.is_staff());

create policy "recipient_eligibility_insert" on public.recipient_eligibility for insert
  to authenticated
  with check (public.is_staff());

create policy "recipient_eligibility_update" on public.recipient_eligibility for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- addresses -----------------------------------------------------------------------

alter table public.addresses enable row level security;
grant select, insert, update, delete on public.addresses to authenticated;
grant select, insert, update, delete on public.addresses to service_role;

create policy "addresses_select" on public.addresses for select
  to authenticated
  using (user_id = auth.uid() or public.is_staff());

create policy "addresses_insert" on public.addresses for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "addresses_update" on public.addresses for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "addresses_delete" on public.addresses for delete
  to authenticated
  using (user_id = auth.uid());

-- donor_submissions ----------------------------------------------------------------
-- Donors have no account, so `anon`/`authenticated` never insert here directly —
-- submissions are written server-side with the service-role client, which
-- keeps the write path centrally validated instead of relying on an RLS
-- INSERT check for an unauthenticated form.

alter table public.donor_submissions enable row level security;
grant select, update on public.donor_submissions to authenticated;
grant select, insert, update on public.donor_submissions to service_role;

create policy "donor_submissions_select_staff" on public.donor_submissions for select
  to authenticated
  using (public.is_staff());

create policy "donor_submissions_update_staff" on public.donor_submissions for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- donor_verifications ----------------------------------------------------------------

alter table public.donor_verifications enable row level security;
grant select, insert, update on public.donor_verifications to authenticated;
grant select, insert, update on public.donor_verifications to service_role;

create policy "donor_verifications_select_staff" on public.donor_verifications for select
  to authenticated
  using (public.is_staff());

create policy "donor_verifications_insert_staff" on public.donor_verifications for insert
  to authenticated
  with check (public.is_staff() and reviewer = auth.uid());

-- Lets a verifier redo a check (new evidence, corrected result) without
-- fighting the one-row-per-check_type unique constraint with a second insert.
create policy "donor_verifications_update_staff" on public.donor_verifications for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff() and reviewer = auth.uid());

-- items -------------------------------------------------------------------------------
-- No public SELECT policy is added directly here beyond the published-listing
-- check below — items never carry donor identity, only verified item facts,
-- so this is safe to expose row-wise for published items.

alter table public.items enable row level security;
grant select on public.items to anon;
grant select on public.items to authenticated;
grant select, insert, update on public.items to service_role;

create policy "items_select_public_or_staff" on public.items for select
  to anon, authenticated
  using (
    public.is_staff()
    or exists (
      select 1 from public.listings l
      where l.item_id = items.id
        and l.status in ('available', 'reserved')
    )
  );

-- listings --------------------------------------------------------------------------

alter table public.listings enable row level security;
grant select on public.listings to anon;
grant select on public.listings to authenticated;
grant select, insert, update on public.listings to service_role;

create policy "listings_select_public_or_staff" on public.listings for select
  to anon, authenticated
  using (status in ('available', 'reserved') or public.is_staff());

-- item_media ------------------------------------------------------------------------

alter table public.item_media enable row level security;
grant select on public.item_media to anon;
grant select on public.item_media to authenticated;
grant select, insert, update on public.item_media to service_role;

create policy "item_media_select_public_or_staff" on public.item_media for select
  to anon, authenticated
  using (
    public.is_staff()
    or (
      is_public
      and exists (
        select 1 from public.listings l
        where l.item_id = item_media.item_id
          and l.status in ('available', 'reserved')
      )
    )
  );

-- reservations ----------------------------------------------------------------------
-- No INSERT policy for anon/authenticated: rows are created only by the
-- reserve_listing() security-definer function (see its own migration),
-- which runs as the function owner and so isn't gated by these grants.

alter table public.reservations enable row level security;
grant select on public.reservations to authenticated;
grant select, insert, update on public.reservations to service_role;

create policy "reservations_select" on public.reservations for select
  to authenticated
  using (user_id = auth.uid() or public.is_staff());

create policy "reservations_update_staff" on public.reservations for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- claims ------------------------------------------------------------------------------
-- Same pattern: created only by the reservation→claim conversion function
-- (added alongside checkout/webhook handling in a later milestone).

alter table public.claims enable row level security;
grant select on public.claims to authenticated;
grant select, insert, update on public.claims to service_role;

create policy "claims_select" on public.claims for select
  to authenticated
  using (user_id = auth.uid() or public.is_staff());

create policy "claims_update_staff" on public.claims for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- payments --------------------------------------------------------------------------
-- Written only by trusted server code (checkout creation, verified webhooks)
-- using the service-role client — no INSERT/UPDATE policy for authenticated.

alter table public.payments enable row level security;
grant select on public.payments to authenticated;
grant select, insert, update on public.payments to service_role;

create policy "payments_select" on public.payments for select
  to authenticated
  using (
    public.is_staff()
    or exists (
      select 1 from public.reservations r
      where r.id = payments.reservation_id and r.user_id = auth.uid()
    )
    or exists (
      select 1 from public.claims c
      where c.id = payments.claim_id and c.user_id = auth.uid()
    )
  );

-- fulfillments ----------------------------------------------------------------------

alter table public.fulfillments enable row level security;
grant select on public.fulfillments to authenticated;
grant select, insert, update on public.fulfillments to service_role;

create policy "fulfillments_select" on public.fulfillments for select
  to authenticated
  using (
    public.is_staff()
    or exists (
      select 1 from public.claims c
      where c.id = fulfillments.claim_id and c.user_id = auth.uid()
    )
  );

-- webhook_events ----------------------------------------------------------------------
-- Read-only audit trail for admins; written only by webhook route handlers
-- via the service-role client.

alter table public.webhook_events enable row level security;
grant select on public.webhook_events to authenticated;
grant select, insert, update on public.webhook_events to service_role;

create policy "webhook_events_select_admin" on public.webhook_events for select
  to authenticated
  using (public.is_admin());

-- support_cases ----------------------------------------------------------------------

alter table public.support_cases enable row level security;
grant select, insert on public.support_cases to authenticated;
grant select, insert, update on public.support_cases to service_role;

create policy "support_cases_select" on public.support_cases for select
  to authenticated
  using (user_id = auth.uid() or assigned_to = auth.uid() or public.is_staff());

create policy "support_cases_insert" on public.support_cases for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "support_cases_update_staff" on public.support_cases for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- audit_logs ------------------------------------------------------------------------
-- Append-only: no UPDATE/DELETE policy exists for any role, ever. Writes
-- happen only through log_audit(), a security-definer function.

alter table public.audit_logs enable row level security;
grant select on public.audit_logs to authenticated;
grant select, insert on public.audit_logs to service_role;

create policy "audit_logs_select_admin" on public.audit_logs for select
  to authenticated
  using (public.is_admin());
