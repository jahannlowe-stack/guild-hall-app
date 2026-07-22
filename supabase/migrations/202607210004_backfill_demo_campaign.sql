-- Guild Hall backfill migration
-- Seed a second demo campaign so Admin campaign switching can be verified.

with level_two as (
  select id
  from public.program_levels
  where slug = 'level-2-practice'
  limit 1
),
inserted_campaign as (
  insert into public.campaigns (
    program_level_id,
    name,
    status,
    location,
    meeting_day,
    start_date
  )
  select
    level_two.id,
    'Camden Lantern Table',
    'demo',
    'Camden, Maine',
    'Wednesday evenings',
    current_date + interval '14 days'
  from level_two
  where not exists (
    select 1
    from public.campaigns
    where name = 'Camden Lantern Table'
  )
  returning id
),
target_campaign as (
  select id
  from inserted_campaign
  union all
  select id
  from public.campaigns
  where name = 'Camden Lantern Table'
  limit 1
)
insert into public.sessions (
  campaign_id,
  title,
  session_date,
  location,
  focus_skills,
  recap,
  is_current
)
select
  target_campaign.id,
  'Lantern Table Session 1 — Crossing the Quiet Bridge',
  current_date + interval '14 days',
  'Camden, Maine',
  'Distress tolerance, Perspective-taking with boundaries',
  null,
  true
from target_campaign
where not exists (
  select 1
  from public.sessions
  where campaign_id = target_campaign.id
    and title = 'Lantern Table Session 1 — Crossing the Quiet Bridge'
);

with target_campaign as (
  select id
  from public.campaigns
  where name = 'Camden Lantern Table'
  limit 1
)
insert into public.quests (
  campaign_id,
  title,
  category,
  skill,
  description,
  reward,
  team_contribution,
  quest_type,
  is_active,
  sort_order
)
select
  target_campaign.id,
  quest.title,
  quest.category,
  quest.skill,
  quest.description,
  quest.reward,
  quest.team_contribution,
  quest.quest_type,
  true,
  quest.sort_order
from target_campaign
cross join (
  values
    (
      'Take One Slow Lap',
      'Daily Solo Quest',
      'Distress tolerance',
      'Take a short walk or quiet lap before reacting to a stressful message, task, or memory. Notice what changes after moving your body.',
      '+1 Flame for practicing a pause before action.',
      '+1 Ember toward the party lantern.',
      'daily_solo',
      1
    ),
    (
      'Name the Boundary',
      'Daily Solo Quest',
      'Perspective-taking with boundaries',
      'Write one sentence that starts with “I can understand ___, and I still need ___.” Keep it private unless sharing feels useful.',
      '+1 Flame for naming compassion and a limit together.',
      '+1 Ember toward the party lantern.',
      'daily_solo',
      2
    ),
    (
      'Choose the Good-Enough Step',
      'Daily Solo Quest',
      'Uncertainty tolerance',
      'Pick one small task that does not need to be perfect. Do it to a good-enough standard and stop before overworking it.',
      '+1 Flame for completing an imperfect but useful step.',
      '+1 Ember toward the party lantern.',
      'daily_solo',
      3
    ),
    (
      'Keep the Lantern Lit',
      'Weekly Party Quest',
      'Leadership rotation',
      'The party earns flames this week by practicing calm handoffs, asking for help early, and choosing steady next steps instead of perfect answers.',
      null,
      null,
      'weekly_party',
      10
    )
) as quest (
  title,
  category,
  skill,
  description,
  reward,
  team_contribution,
  quest_type,
  sort_order
)
where not exists (
  select 1
  from public.quests
  where campaign_id = target_campaign.id
    and title = quest.title
);

with target_campaign as (
  select id
  from public.campaigns
  where name = 'Camden Lantern Table'
  limit 1
)
insert into public.reward_tiers (
  campaign_id,
  name,
  required_flames,
  reward,
  description,
  sort_order
)
select
  target_campaign.id,
  tier.name,
  tier.required_flames,
  tier.reward,
  tier.description,
  tier.sort_order
from target_campaign
cross join (
  values
    (
      'Lantern Spark',
      5,
      'Open with one shared comfort ritual.',
      'The table begins with a short grounding ritual chosen by the group.',
      1
    ),
    (
      'Steady Glow',
      12,
      'Add one useful rumor before the next session.',
      'The DM adds a helpful clue or rumor that rewards careful listening.',
      2
    ),
    (
      'Bridge Light',
      20,
      'Unlock a safer route option.',
      'The party discovers a lower-risk path through the next obstacle.',
      3
    ),
    (
      'Beacon Flame',
      30,
      'Earn a group celebration scene.',
      'The next session includes a warm community moment that reinforces belonging.',
      4
    )
) as tier (
  name,
  required_flames,
  reward,
  description,
  sort_order
)
where not exists (
  select 1
  from public.reward_tiers
  where campaign_id = target_campaign.id
    and name = tier.name
);

with target_campaign as (
  select id
  from public.campaigns
  where name = 'Camden Lantern Table'
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
  target_campaign.id,
  current_date,
  9,
  30,
  true
from target_campaign
where not exists (
  select 1
  from public.campaign_progress
  where campaign_id = target_campaign.id
    and is_current = true
);