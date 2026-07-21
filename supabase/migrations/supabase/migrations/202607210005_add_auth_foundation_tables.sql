-- Guild Hall v0.4.11
-- Add email-only auth foundation tables.
-- This does not enable social login and does not store private participant data.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'player',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  constraint profiles_role_check
    check (role in ('owner', 'dm', 'player'))
);

create table if not exists public.campaign_memberships (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'player',
  status text not null default 'active',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  constraint campaign_memberships_role_check
    check (role in ('owner', 'dm', 'player')),

  constraint campaign_memberships_status_check
    check (status in ('active', 'invited', 'inactive')),

  constraint campaign_memberships_unique_user_campaign
    unique (campaign_id, user_id)
);

create index if not exists profiles_role_idx
on public.profiles(role);

create index if not exists campaign_memberships_campaign_id_idx
on public.campaign_memberships(campaign_id);

create index if not exists campaign_memberships_user_id_idx
on public.campaign_memberships(user_id);

create index if not exists campaign_memberships_role_idx
on public.campaign_memberships(role);

create index if not exists campaign_memberships_status_idx
on public.campaign_memberships(status);