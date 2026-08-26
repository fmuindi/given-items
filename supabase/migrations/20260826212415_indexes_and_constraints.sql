-- Money / currency checks ----------------------------------------------------

alter table public.payments
  add constraint payments_item_amount_zero check (item_amount = 0),
  add constraint payments_delivery_amount_nonneg check (delivery_amount >= 0),
  add constraint payments_service_fee_nonneg check (service_fee_amount >= 0),
  add constraint payments_tax_amount_nonneg check (tax_amount >= 0),
  add constraint payments_total_amount_nonneg check (total_amount >= 0),
  add constraint payments_currency_usd check (currency = 'usd'),
  add constraint payments_total_matches_lines check (
    total_amount = item_amount + delivery_amount + service_fee_amount + tax_amount
  );

-- Reservation must expire in the future at creation time.
alter table public.reservations
  add constraint reservations_expires_in_future check (expires_at > created_at);

-- One current (non-superseded) listing per item — items are re-listed by
-- creating a new item row from a fresh submission, not by reusing one.
-- (Enforced already via `item_id` UNIQUE on listings in core_tables.)

-- One active reservation per listing.
create unique index reservations_one_active_per_listing
  on public.reservations (listing_id)
  where status = 'active';

-- One active reservation per user.
create unique index reservations_one_active_per_user
  on public.reservations (user_id)
  where status = 'active';

-- One completed entitlement per user per program.
create unique index claims_one_entitlement_per_user_program
  on public.claims (user_id, program_key)
  where entitlement_consumed_at is not null;

-- Lookup / foreign-key indexes -------------------------------------------------

create index addresses_user_id_idx on public.addresses (user_id);
create index recipient_eligibility_user_id_idx on public.recipient_eligibility (user_id);

create index donor_submissions_status_idx on public.donor_submissions (status);
create index donor_submissions_assigned_to_idx on public.donor_submissions (assigned_to);
create index donor_verifications_submission_id_idx on public.donor_verifications (submission_id);

create index items_submission_id_idx on public.items (submission_id);
create index item_media_item_id_idx on public.item_media (item_id);

create index listings_status_idx on public.listings (status);
create index listings_category_slug_idx on public.listings (category_slug);
create index listings_item_id_idx on public.listings (item_id);

create index reservations_listing_id_idx on public.reservations (listing_id);
create index reservations_user_id_idx on public.reservations (user_id);
create index reservations_status_expires_at_idx on public.reservations (status, expires_at);

create index claims_listing_id_idx on public.claims (listing_id);
create index claims_user_id_idx on public.claims (user_id);

create index payments_claim_id_idx on public.payments (claim_id);
create index payments_reservation_id_idx on public.payments (reservation_id);

create index fulfillments_claim_id_idx on public.fulfillments (claim_id);

create index support_cases_user_id_idx on public.support_cases (user_id);
create index support_cases_claim_id_idx on public.support_cases (claim_id);
create index support_cases_status_idx on public.support_cases (status);

create index audit_logs_entity_idx on public.audit_logs (entity_type, entity_id);
create index audit_logs_created_at_idx on public.audit_logs (created_at desc);
