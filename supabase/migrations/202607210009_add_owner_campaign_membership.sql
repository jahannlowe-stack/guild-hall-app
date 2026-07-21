-- Guild Hall v0.4.15
-- Add first owner campaign membership.
-- This connects the project owner to the Rockland Ember Table campaign.
-- New users are not automatically given owner access.

with owner_profile as (
  select id
  from public.profiles
  where lower(email) = lower('jahann.lowe@maine.edu')
  limit 1
),
rockland_campaign as (
  select id
  from public.campaigns
  where name = 'Rockland Ember Table'
  order by created_at asc
  limit 1
)
insert into public.campaign_memberships (
  campaign_id,
  user_id,
  role,
  status
)
select
  rockland_campaign.id,
  owner_profile.id,
  'owner',
  'active'
from owner_profile
cross join rockland_campaign
where not exists (
  select 1
  from public.campaign_memberships existing_membership
  where existing_membership.campaign_id = rockland_campaign.id
    and existing_membership.user_id = owner_profile.id
);