-- Extensions
create extension if not exists pgcrypto with schema extensions;

-- Enums
create type public.user_role as enum ('recipient', 'operator', 'verifier', 'admin');

create type public.profile_status as enum ('active', 'restricted', 'banned');

create type public.eligibility_status as enum ('pending', 'eligible', 'ineligible', 'manual_review');

create type public.address_validation_status as enum (
  'unvalidated',
  'validated',
  'needs_confirmation',
  'invalid'
);

create type public.submission_status as enum (
  'draft',
  'submitted',
  'needs_information',
  'under_review',
  'approved',
  'rejected',
  'withdrawn'
);

create type public.condition_grade as enum (
  'like_new',
  'good',
  'fair',
  'working',
  'needs_repair'
);

create type public.delivery_type as enum (
  'parcel',
  'local_delivery',
  'pickup',
  'manual_freight'
);

create type public.verification_check_type as enum (
  'identity',
  'ownership',
  'existence',
  'condition',
  'safety_recall',
  'logistics'
);

create type public.verification_result as enum (
  'pass',
  'needs_information',
  'escalate',
  'fail'
);

create type public.listing_status as enum (
  'draft',
  'scheduled',
  'available',
  'reserved',
  'claimed',
  'fulfillment',
  'delivered',
  'cancelled',
  'archived'
);

create type public.reservation_status as enum (
  'active',
  'checkout_started',
  'expired',
  'converted',
  'cancelled'
);

create type public.claim_status as enum (
  'pending',
  'paid',
  'fulfilled',
  'cancelled',
  'refunded'
);

create type public.payment_status as enum (
  'created',
  'pending',
  'paid',
  'failed',
  'refunded',
  'partially_refunded',
  'disputed'
);

create type public.fulfillment_status as enum (
  'awaiting_donor',
  'ready',
  'label_created',
  'picked_up',
  'in_transit',
  'exception',
  'delivered',
  'returned'
);

create type public.support_priority as enum ('low', 'normal', 'high', 'urgent');

create type public.support_status as enum ('open', 'in_progress', 'resolved', 'closed');
