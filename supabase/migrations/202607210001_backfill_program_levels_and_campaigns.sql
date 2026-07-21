-- Guild Hall backfill migration
-- Program levels and first campaign foundation.
-- This records the schema/data work already applied in Supabase.

create table if not exists public.program_levels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  program_level_id uuid references public.program_levels(id) on delete set null,
  name text not null,
  status text not null default 'planning',
  location text,
  meeting_day text,
  start_date date,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists campaigns_program_level_id_idx
on public.campaigns(program_level_id);

insert into public.program_levels (
  name,
  slug,
  description,
  sort_order
)
values
  (
    'Level 1 — Foundation',
    'level-1-foundation',
    'Introductory campaign level focused on stability, safety, basic communication, and participation.',
    1
  ),
  (
    'Level 2 — Practice',
    'level-2-practice',
    'Practice campaign level focused on applying core skills under more complex but still supported conditions.',
    2
  ),
  (
    'Level 3 — Leadership',
    'level-3-leadership',
    'Advanced campaign level focused on leadership, repair, values-based action, and supporting others.',
    3
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  updated_at = now();

with level_one as (
  select id
  from public.program_levels
  where slug = 'level-1-foundation'
  limit 1
)
insert into public.campaigns (
  program_level_id,
  name,
  status,
  location,
  meeting_day,
  start_date
)
select
  level_one.id,
  'Rockland Ember Table',
  'planning',
  'Rockland, Maine',
  'To be announced',
  null
from level_one
where not exists (
  select 1
  from public.campaigns
  where name = 'Rockland Ember Table'
);