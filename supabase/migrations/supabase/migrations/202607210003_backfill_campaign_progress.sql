-- Guild Hall backfill migration
-- Add campaign-specific weekly progress tracking.

create table if not exists public.campaign_progress (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  week_start date not null,
  total_flames integer not null default 0,
  weekly_goal integer not null default 30,
  is_current boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists campaign_progress_campaign_id_idx
on public.campaign_progress(campaign_id);

create index if not exists campaign_progress_current_idx
on public.campaign_progress(campaign_id, is_current);

create unique index if not exists campaign_progress_one_current_per_campaign_idx
on public.campaign_progress(campaign_id)
where is_current = true;

with rockland_campaign as (
  select id
  from public.campaigns
  where name = 'Rockland Ember Table'
  order by created_at asc
  limit 1
)
insert into public.campaign_progress (
  campaign_id,
  week_start,
  total_flames,
  weekly_goal,
  is_current
)
select
  rockland_campaign.id,
  current_date,
  18,
  30,
  true
from rockland_campaign
where not exists (
  select 1
  from public.campaign_progress cp
  where cp.campaign_id = rockland_campaign.id
    and cp.is_current = true
);