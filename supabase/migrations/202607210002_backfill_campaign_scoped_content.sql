-- Guild Hall backfill migration
-- Add campaign ownership to existing content tables.

alter table public.quests
add column if not exists campaign_id uuid references public.campaigns(id) on delete set null;

alter table public.reward_tiers
add column if not exists campaign_id uuid references public.campaigns(id) on delete set null;

alter table public.sessions
add column if not exists campaign_id uuid references public.campaigns(id) on delete set null;

with rockland_campaign as (
  select id
  from public.campaigns
  where name = 'Rockland Ember Table'
  order by created_at asc
  limit 1
)
update public.quests
set campaign_id = (select id from rockland_campaign)
where campaign_id is null
  and exists (select 1 from rockland_campaign);

with rockland_campaign as (
  select id
  from public.campaigns
  where name = 'Rockland Ember Table'
  order by created_at asc
  limit 1
)
update public.reward_tiers
set campaign_id = (select id from rockland_campaign)
where campaign_id is null
  and exists (select 1 from rockland_campaign);

with rockland_campaign as (
  select id
  from public.campaigns
  where name = 'Rockland Ember Table'
  order by created_at asc
  limit 1
)
update public.sessions
set campaign_id = (select id from rockland_campaign)
where campaign_id is null
  and exists (select 1 from rockland_campaign);

create index if not exists quests_campaign_id_idx
on public.quests(campaign_id);

create index if not exists reward_tiers_campaign_id_idx
on public.reward_tiers(campaign_id);

create index if not exists sessions_campaign_id_idx
on public.sessions(campaign_id);