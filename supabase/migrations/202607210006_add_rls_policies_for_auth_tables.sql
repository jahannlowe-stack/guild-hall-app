-- Guild Hall v0.4.12
-- Add RLS foundation for auth tables.
-- Email-only auth direction. No social login required.

alter table public.profiles enable row level security;
alter table public.campaign_memberships enable row level security;

drop policy if exists "Profiles are readable by self" on public.profiles;
drop policy if exists "Profiles are updatable by self" on public.profiles;
drop policy if exists "Owners can read all profiles" on public.profiles;
drop policy if exists "Owners can update all profiles" on public.profiles;
drop policy if exists "Owners can insert profiles" on public.profiles;

drop policy if exists "Memberships are readable by self" on public.campaign_memberships;
drop policy if exists "Owners can read all memberships" on public.campaign_memberships;
drop policy if exists "Owners can manage all memberships" on public.campaign_memberships;
drop policy if exists "DMs can read assigned campaign memberships" on public.campaign_memberships;

create policy "Profiles are readable by self"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "Profiles are updatable by self"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Owners can read all profiles"
on public.profiles
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.role = 'owner'
  )
);

create policy "Owners can update all profiles"
on public.profiles
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.role = 'owner'
  )
)
with check (
  exists (
    select 1
    from public.profiles owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.role = 'owner'
  )
);

create policy "Owners can insert profiles"
on public.profiles
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.role = 'owner'
  )
);

create policy "Memberships are readable by self"
on public.campaign_memberships
for select
to authenticated
using (user_id = auth.uid());

create policy "Owners can read all memberships"
on public.campaign_memberships
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.role = 'owner'
  )
);

create policy "Owners can manage all memberships"
on public.campaign_memberships
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.role = 'owner'
  )
)
with check (
  exists (
    select 1
    from public.profiles owner_profile
    where owner_profile.id = auth.uid()
      and owner_profile.role = 'owner'
  )
);

create policy "DMs can read assigned campaign memberships"
on public.campaign_memberships
for select
to authenticated
using (
  exists (
    select 1
    from public.campaign_memberships dm_membership
    where dm_membership.campaign_id = campaign_memberships.campaign_id
      and dm_membership.user_id = auth.uid()
      and dm_membership.role in ('owner', 'dm')
      and dm_membership.status = 'active'
  )
);