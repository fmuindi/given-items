-- profiles ------------------------------------------------------------------
-- One row per authenticated user (recipients and staff). Donors never get a
-- profile row in the MVP — they interact only through donor_submissions.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'recipient',
  legal_name text,
  phone text,
  phone_verified_at timestamptz,
  status public.profile_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger guard_self_role_change before update on public.profiles
  for each row execute function public.prevent_self_role_change();

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- recipient_eligibility -------------------------------------------------------

create table public.recipient_eligibility (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  program_key text not null default 'default',
  status public.eligibility_status not null default 'pending',
  reason_code text,
  reviewed_by uuid references public.profiles (id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, program_key)
);

create trigger set_updated_at before update on public.recipient_eligibility
  for each row execute function public.set_updated_at();

-- addresses -------------------------------------------------------------------

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  label text,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'US',
  place_id text,
  lat double precision,
  lng double precision,
  validation_status public.address_validation_status not null default 'unvalidated',
  address_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.addresses
  for each row execute function public.set_updated_at();

-- donor_submissions -------------------------------------------------------------
-- Fully private. Never selected from public/anon code paths.

create table public.donor_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  address_line1 text not null,
  city text not null,
  state text not null,
  postal_code text not null,
  category_slug text not null,
  title text not null,
  description text not null,
  condition public.condition_grade not null,
  known_defects text,
  included_parts text,
  delivery_type public.delivery_type not null,
  dimensions text,
  weight text,
  consent_version text not null default 'v1',
  status public.submission_status not null default 'submitted',
  assigned_to uuid references public.profiles (id),
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.donor_submissions
  for each row execute function public.set_updated_at();

-- donor_verifications -------------------------------------------------------------

create table public.donor_verifications (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.donor_submissions (id) on delete cascade,
  check_type public.verification_check_type not null,
  result public.verification_result not null,
  evidence_ref text,
  note text,
  reviewer uuid not null references public.profiles (id),
  reviewed_at timestamptz not null default now(),
  unique (submission_id, check_type)
);

-- items -----------------------------------------------------------------------
-- Internal, approved item record created from a verified submission snapshot.

create table public.items (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references public.donor_submissions (id),
  category_slug text not null,
  condition public.condition_grade not null,
  known_defects text not null,
  included_parts text,
  delivery_type public.delivery_type not null,
  dimensions text,
  weight text,
  verification_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.items
  for each row execute function public.set_updated_at();

-- listings ----------------------------------------------------------------------
-- Public-facing. Only approved fields belong here — never donor identity.

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null unique references public.items (id),
  slug text not null unique,
  title text not null,
  description text not null,
  city text not null,
  state text not null,
  category_slug text not null,
  condition public.condition_grade not null,
  status public.listing_status not null default 'draft',
  published_at timestamptz,
  approved_by uuid references public.profiles (id),
  published_by uuid references public.profiles (id),
  policy_version text not null default 'v1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.listings
  for each row execute function public.set_updated_at();

-- item_media ----------------------------------------------------------------------

create table public.item_media (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items (id) on delete cascade,
  bucket text not null,
  path text not null,
  is_public boolean not null default false,
  sort_order integer not null default 0,
  alt_text text,
  created_at timestamptz not null default now()
);

-- reservations ----------------------------------------------------------------------
-- Rows are only ever created by the reserve_listing() security-definer
-- function — see the reserve_listing_function migration. No direct INSERT
-- policy is granted to recipients.

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings (id),
  user_id uuid not null references public.profiles (id),
  address_id uuid references public.addresses (id),
  status public.reservation_status not null default 'active',
  quote_snapshot jsonb,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.reservations
  for each row execute function public.set_updated_at();

-- claims ----------------------------------------------------------------------

create table public.claims (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null unique references public.reservations (id),
  listing_id uuid not null references public.listings (id),
  user_id uuid not null references public.profiles (id),
  program_key text not null default 'default',
  status public.claim_status not null default 'pending',
  entitlement_consumed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.claims
  for each row execute function public.set_updated_at();

-- payments ----------------------------------------------------------------------
-- Written only by trusted server code (checkout creation, verified webhooks).

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references public.claims (id),
  reservation_id uuid references public.reservations (id),
  provider text not null default 'stripe',
  external_id text,
  item_amount integer not null default 0,
  delivery_amount integer not null default 0,
  service_fee_amount integer not null default 0,
  tax_amount integer not null default 0,
  total_amount integer not null,
  currency text not null default 'usd',
  status public.payment_status not null default 'created',
  idempotency_key text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.payments
  for each row execute function public.set_updated_at();

-- fulfillments ----------------------------------------------------------------------

create table public.fulfillments (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid not null unique references public.claims (id),
  method public.delivery_type not null,
  provider text,
  provider_shipment_id text,
  tracking_number text,
  tracking_url text,
  status public.fulfillment_status not null default 'awaiting_donor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.fulfillments
  for each row execute function public.set_updated_at();

-- webhook_events ----------------------------------------------------------------------
-- Idempotency ledger. Written only by trusted webhook route handlers.

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  external_event_id text not null,
  event_type text,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  result text,
  payload jsonb,
  unique (provider, external_event_id)
);

-- support_cases ----------------------------------------------------------------------

create table public.support_cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id),
  claim_id uuid references public.claims (id),
  category text not null,
  priority public.support_priority not null default 'normal',
  status public.support_status not null default 'open',
  assigned_to uuid references public.profiles (id),
  reference_code text not null unique default public.generate_reference_code(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.support_cases
  for each row execute function public.set_updated_at();

-- audit_logs ----------------------------------------------------------------------
-- Append-only. No update/delete policy is ever granted (see rls_policies).

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor uuid references public.profiles (id),
  action text not null,
  entity_type text not null,
  entity_id text,
  before jsonb,
  after jsonb,
  request_id text,
  created_at timestamptz not null default now()
);
