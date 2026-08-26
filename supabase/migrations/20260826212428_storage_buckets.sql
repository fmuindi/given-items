-- donor-evidence: private originals (donor photos, ID/ownership evidence).
-- Only staff can read, and only via short-lived signed URLs generated from
-- an authenticated staff session. Uploads go through the service-role
-- client from the donor-intake server action (donors have no account).
insert into storage.buckets (id, name, public)
values ('donor-evidence', 'donor-evidence', false)
on conflict (id) do nothing;

-- listing-media: approved, redacted derivatives shown on published listings.
insert into storage.buckets (id, name, public)
values ('listing-media', 'listing-media', true)
on conflict (id) do nothing;

create policy "donor_evidence_select_staff"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'donor-evidence' and public.is_staff());

create policy "listing_media_select_public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'listing-media');

create policy "listing_media_write_staff"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'listing-media' and public.is_staff());

create policy "listing_media_update_staff"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'listing-media' and public.is_staff())
  with check (bucket_id = 'listing-media' and public.is_staff());

create policy "listing_media_delete_staff"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'listing-media' and public.is_staff());
