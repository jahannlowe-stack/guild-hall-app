-- Guild Hall v0.4.14
-- First owner setup.
-- This intentionally promotes one known email address to project owner.
-- New users still default to player through the auth profile trigger.
-- No social login is enabled or required.

update public.profiles
set
  role = 'owner',
  updated_at = now()
where lower(email) = lower('jahann.lowe@maine.edu');

-- Optional verification query:
-- select id, email, display_name, role, created_at, updated_at
-- from public.profiles
-- where lower(email) = lower('jahann.lowe@maine.edu');