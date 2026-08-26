begin;
select plan(22);

-- Test-only impersonation helpers ---------------------------------------------
-- Not part of any migration — defined here, inside the rolled-back test
-- transaction, so nothing from this section ever reaches the real schema.

create schema if not exists tests;

create or replace function tests.create_auth_user(p_id uuid, p_email text)
returns void
language sql
security definer
set search_path = pg_catalog, public, auth
as $$
  insert into auth.users (id, email, aud, role, encrypted_password, email_confirmed_at)
  values (p_id, p_email, 'authenticated', 'authenticated', 'test', now())
  on conflict (id) do nothing;
$$;

-- Switches the session to act as `p_user_id` the way a real PostgREST
-- request does: Postgres role = authenticated, auth.uid() resolves from
-- request.jwt.claims. To switch identity again later, just call this (or
-- tests.authenticate_as_anon()) again — no explicit "clear" step is needed,
-- and none is attempted while already impersonating a restricted role,
-- which would fail for lack of USAGE on this schema.
create or replace function tests.authenticate_as(p_user_id uuid)
returns void
language plpgsql
as $$
begin
  execute format('set local request.jwt.claims = %L', json_build_object('sub', p_user_id, 'role', 'authenticated')::text);
  set local role authenticated;
end;
$$;

create or replace function tests.authenticate_as_anon()
returns void
language plpgsql
as $$
begin
  execute 'set local request.jwt.claims = ''{"role":"anon"}''';
  set local role anon;
end;
$$;

-- Fixtures, created as the superuser (bypasses RLS entirely) -----------------

select tests.create_auth_user('00000000-0000-0000-0000-000000000001', 'recipient1@test.local');
select tests.create_auth_user('00000000-0000-0000-0000-000000000002', 'recipient2@test.local');
select tests.create_auth_user('00000000-0000-0000-0000-000000000003', 'operator@test.local');
select tests.create_auth_user('00000000-0000-0000-0000-000000000004', 'verifier@test.local');
select tests.create_auth_user('00000000-0000-0000-0000-000000000005', 'admin@test.local');

update public.profiles set role = 'operator' where id = '00000000-0000-0000-0000-000000000003';
update public.profiles set role = 'verifier' where id = '00000000-0000-0000-0000-000000000004';
update public.profiles set role = 'admin' where id = '00000000-0000-0000-0000-000000000005';

insert into public.recipient_eligibility (user_id, program_key, status)
values ('00000000-0000-0000-0000-000000000001', 'default', 'eligible');
-- recipient2 is intentionally left with no eligibility row (pending/ineligible).

insert into public.addresses (id, user_id, line1, city, state, postal_code)
values ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '1 Main St', 'Columbus', 'OH', '43215');

insert into public.donor_submissions (
  id, full_name, email, phone, address_line1, city, state, postal_code,
  category_slug, title, description, condition, delivery_type, status
) values (
  '20000000-0000-0000-0000-000000000001', 'Donor One', 'donor1@test.local', '6145550100',
  '9 Donor Ave', 'Columbus', 'OH', '43215', 'appliances', 'Chest freezer',
  'A test chest freezer donation.', 'good', 'local_delivery', 'approved'
);

insert into public.items (id, submission_id, category_slug, condition, known_defects, delivery_type)
values (
  '30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001',
  'appliances', 'good', 'None noted', 'local_delivery'
);

insert into public.listings (id, item_id, slug, title, description, city, state, category_slug, condition, status, published_at)
values (
  '40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001',
  'test-chest-freezer', 'Chest freezer', 'A verified test listing.', 'Columbus', 'OH',
  'appliances', 'good', 'available', now()
);

insert into public.item_media (item_id, bucket, path, is_public)
values ('30000000-0000-0000-0000-000000000001', 'listing-media', 'test/freezer-1.jpg', true);

-- A second, independent listing — used below to prove the one-active-
-- reservation-per-user rule against a *different* item, as opposed to a
-- duplicate click on the same listing (which correctly fails a different
-- way: ITEM_UNAVAILABLE, because that listing's own status already moved).
insert into public.donor_submissions (
  id, full_name, email, phone, address_line1, city, state, postal_code,
  category_slug, title, description, condition, delivery_type, status
) values (
  '20000000-0000-0000-0000-000000000002', 'Donor Two', 'donor2@test.local', '6145550101',
  '11 Donor Ave', 'Columbus', 'OH', '43215', 'furniture', 'Office desk',
  'A test office desk donation.', 'good', 'local_delivery', 'approved'
);

insert into public.items (id, submission_id, category_slug, condition, known_defects, delivery_type)
values (
  '30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002',
  'furniture', 'good', 'None noted', 'local_delivery'
);

insert into public.listings (id, item_id, slug, title, description, city, state, category_slug, condition, status, published_at)
values (
  '40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002',
  'test-office-desk', 'Office desk', 'A second verified test listing.', 'Columbus', 'OH',
  'furniture', 'good', 'available', now()
);

-- Anonymous: public catalogue is readable, private tables are not ----------

select tests.authenticate_as_anon();

select is(
  (select count(*)::int from public.public_listings),
  2,
  'anon can read both published listings via public_listings'
);

select is(
  (select count(*)::int from public.listings where status = 'available'),
  2,
  'anon can read available rows directly from listings (no PII there)'
);

select throws_ok(
  $$ select 1 from public.donor_submissions $$,
  '42501',
  null,
  'anon has no grant at all on donor_submissions (blocked before RLS runs)'
);

select throws_ok(
  $$ select 1 from public.profiles $$,
  '42501',
  null,
  'anon has no grant at all on profiles'
);

reset role;

-- Recipient: sees only their own private data -------------------------------

select tests.authenticate_as('00000000-0000-0000-0000-000000000001');

select is(
  (select count(*)::int from public.profiles),
  1,
  'recipient sees exactly one profile row (their own)'
);

select is(
  (select id from public.profiles limit 1),
  '00000000-0000-0000-0000-000000000001'::uuid,
  'the one profile row a recipient sees is their own'
);

select is(
  (select count(*)::int from public.addresses),
  1,
  'recipient sees only their own address'
);

select is(
  (select count(*)::int from public.donor_submissions),
  0,
  'recipient (non-staff, authenticated) is granted SELECT but RLS returns zero donor_submissions rows'
);

select throws_ok(
  format(
    $$ update public.profiles set role = 'admin' where id = %L $$,
    '00000000-0000-0000-0000-000000000001'
  ),
  'P0001',
  'Only an admin can change a profile role',
  'a recipient cannot promote their own role'
);

-- reserve_listing(): the atomic reservation path ---------------------------

select isnt(
  (select id from public.reserve_listing(
    '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001'
  )),
  null,
  'an eligible recipient can reserve an available listing'
);

select is(
  (select status from public.listings where id = '40000000-0000-0000-0000-000000000001'),
  'reserved'::public.listing_status,
  'the listing flips to reserved after a successful reservation'
);

select throws_ok(
  $$ select public.reserve_listing(
       '40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001'
     ) $$,
  'P0001',
  'NOT_ELIGIBLE',
  'the same recipient cannot hold a second active reservation on a different listing'
);

select is(
  (select count(*)::int from public.reservations),
  1,
  'recipient sees exactly their own reservation'
);

reset role;

-- A second, ineligible recipient is rejected --------------------------------

select tests.authenticate_as('00000000-0000-0000-0000-000000000002');

select throws_ok(
  $$ select public.reserve_listing(
       '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001'
     ) $$,
  'P0001',
  'VALIDATION_ERROR',
  'a recipient cannot reserve using an address that is not their own'
);

reset role;

insert into public.recipient_eligibility (user_id, program_key, status)
values ('00000000-0000-0000-0000-000000000002', 'default', 'eligible');

insert into public.addresses (id, user_id, line1, city, state, postal_code)
values ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '2 Second St', 'Columbus', 'OH', '43215');

select tests.authenticate_as('00000000-0000-0000-0000-000000000002');

select throws_ok(
  $$ select public.reserve_listing(
       '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002'
     ) $$,
  'P0001',
  'ITEM_UNAVAILABLE',
  'a different recipient cannot reserve a listing that is already reserved'
);

select is(
  (select count(*)::int from public.reservations),
  0,
  'a recipient with no reservation of their own sees zero rows (not the other recipient''s)'
);

reset role;

-- Staff: operators/verifiers see donor data, but only admins see audit logs -

select tests.authenticate_as('00000000-0000-0000-0000-000000000003');

select is(
  (select count(*)::int from public.donor_submissions),
  2,
  'an operator (staff) can see both donor submissions'
);

select is(
  (select count(*)::int from public.profiles),
  5,
  'staff can see every profile, not just their own'
);

select is(
  (select count(*)::int from public.audit_logs),
  0,
  'an operator is not an admin, so audit_logs is empty for them even though SELECT is granted'
);

reset role;

select tests.authenticate_as('00000000-0000-0000-0000-000000000004');

insert into public.donor_verifications (submission_id, check_type, result, reviewer)
values ('20000000-0000-0000-0000-000000000001', 'condition', 'pass', '00000000-0000-0000-0000-000000000004');

select is(
  (select count(*)::int from public.donor_verifications),
  1,
  'a verifier can record a verification check under their own reviewer id'
);

select throws_ok(
  $$ insert into public.donor_verifications (submission_id, check_type, result, reviewer)
     values ('20000000-0000-0000-0000-000000000001', 'safety_recall', 'pass', '00000000-0000-0000-0000-000000000003') $$,
  '42501',
  null,
  'a verifier cannot record a check under a different reviewer''s id'
);

reset role;

-- Admin: full audit visibility ----------------------------------------------

select tests.authenticate_as('00000000-0000-0000-0000-000000000005');

select cmp_ok(
  (select count(*)::int from public.audit_logs),
  '>=',
  1,
  'an admin sees the audit log entry reserve_listing() wrote'
);

reset role;

select * from finish();
rollback;
