import {
  activeTeamQuest,
  currentSession,
  flameRewardTiers,
  getDailySoloQuest,
} from "@/lib/sample-data";
import { supabase } from "@/lib/supabase";

type SupabaseQuest = {
  id: string;
  campaign_id: string | null;
  title: string;
  category: string | null;
  skill: string | null;
  description: string | null;
  reward: string | null;
  team_contribution: string | null;
  quest_type: string;
  is_active: boolean;
  sort_order: number;
};

type SupabaseRewardTier = {
  id: string;
  campaign_id: string | null;
  name: string;
  required_flames: number;
  reward: string | null;
  description: string | null;
  sort_order: number;
};

type SupabaseSession = {
  id: string;
  campaign_id: string | null;
  title: string;
  session_date: string | null;
  location: string | null;
  focus_skills: string | null;
  recap: string | null;
  is_current: boolean;
};

type SupabaseCampaign = {
  id: string;
  name: string;
  status: string;
  location: string | null;
  meeting_day: string | null;
  start_date: string | null;
  program_levels:
    | {
        name: string;
        slug: string;
        description: string | null;
      }
    | {
        name: string;
        slug: string;
        description: string | null;
      }[]
    | null;
};

type SupabaseCampaignProgress = {
  id: string;
  campaign_id: string;
  week_start: string;
  total_flames: number;
  weekly_goal: number;
  is_current: boolean;
};

export type GuildCampaign = {
  id: string;
  name: string;
  status: string;
  location: string;
  meetingDay: string;
  startDate: string;
  programLevel: {
    name: string;
    slug: string;
    description: string;
  };
};

function getDailyQuestFromPool(quests: SupabaseQuest[]) {
  if (quests.length === 0) {
    return null;
  }

  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const difference = today.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(difference / oneDay);

  return quests[dayOfYear % quests.length];
}

function formatSessionDate(dateValue: string | null) {
  if (!dateValue) {
    return "To be announced";
  }

  return new Date(dateValue).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getProgramLevel(campaign: SupabaseCampaign | null) {
  if (!campaign?.program_levels) {
    return null;
  }

  if (Array.isArray(campaign.program_levels)) {
    return campaign.program_levels[0] ?? null;
  }

  return campaign.program_levels;
}

function getDefaultCampaign(): GuildCampaign {
  return {
    id: "default-campaign",
    name: "Rockland Ember Table",
    status: "planning",
    location: "Rockland, Maine",
    meetingDay: "To be announced",
    startDate: "To be announced",
    programLevel: {
      name: "Level 1 — Foundation",
      slug: "level-1-foundation",
      description:
        "Introductory campaign level focused on stability, safety, basic communication, and participation.",
    },
  };
}

function formatCampaign(supabaseCampaign: SupabaseCampaign | null): GuildCampaign {
  if (!supabaseCampaign) {
    return getDefaultCampaign();
  }

  const programLevel = getProgramLevel(supabaseCampaign);

  return {
    id: supabaseCampaign.id,
    name: supabaseCampaign.name,
    status: supabaseCampaign.status,
    location: supabaseCampaign.location ?? "To be announced",
    meetingDay: supabaseCampaign.meeting_day ?? "To be announced",
    startDate: formatSessionDate(supabaseCampaign.start_date),
    programLevel: programLevel
      ? {
          name: programLevel.name,
          slug: programLevel.slug,
          description: programLevel.description ?? "",
        }
      : {
          name: "Level 1 — Foundation",
          slug: "level-1-foundation",
          description:
            "Introductory campaign level focused on stability, safety, basic communication, and participation.",
        },
  };
}

async function getCurrentCampaign(campaignId?: string) {
  let query = supabase.from("campaigns").select(
    `
    id,
    name,
    status,
    location,
    meeting_day,
    start_date,
    program_levels (
      name,
      slug,
      description
    )
  `
  );

  if (campaignId) {
    query = query.eq("id", campaignId);
  }

  const campaignsResult = await query
    .order("created_at", { ascending: true })
    .limit(1);

  return (campaignsResult.data?.[0] ?? null) as SupabaseCampaign | null;
}

export async function getCampaigns() {
  const campaignsResult = await supabase
    .from("campaigns")
    .select(
      `
      id,
      name,
      status,
      location,
      meeting_day,
      start_date,
      program_levels (
        name,
        slug,
        description
      )
    `
    )
    .order("created_at", { ascending: true });

  const campaigns = (campaignsResult.data ?? []) as SupabaseCampaign[];

  return campaigns.map(formatCampaign);
}

async function getCurrentCampaignProgress(campaignId: string | null) {
  if (!campaignId) {
    return null;
  }

  const progressResult = await supabase
    .from("campaign_progress")
    .select("*")
    .eq("campaign_id", campaignId)
    .eq("is_current", true)
    .limit(1);

  return (progressResult.data?.[0] ?? null) as SupabaseCampaignProgress | null;
}

export async function getGuildContent(campaignIdOverride?: string) {
  const fallbackDailySoloQuest = getDailySoloQuest();
  const supabaseCampaign = await getCurrentCampaign(campaignIdOverride);
  const campaign = formatCampaign(supabaseCampaign);
  const campaignId = campaign.id === "default-campaign" ? null : campaign.id;

  const [questsResult, rewardTiersResult, sessionsResult, progress] =
    await Promise.all([
      supabase
        .from("quests")
        .select("*")
        .eq("is_active", true)
        .eq("campaign_id", campaignId)
        .order("sort_order", { ascending: true }),
      supabase
        .from("reward_tiers")
        .select("*")
        .eq("campaign_id", campaignId)
        .order("sort_order", { ascending: true }),
      supabase
        .from("sessions")
        .select("*")
        .eq("is_current", true)
        .eq("campaign_id", campaignId)
        .limit(1),
      getCurrentCampaignProgress(campaignId),
    ]);

  const supabaseQuests = (questsResult.data ?? []) as SupabaseQuest[];
  const supabaseRewardTiers =
    (rewardTiersResult.data ?? []) as SupabaseRewardTier[];
  const supabaseCurrentSession = (sessionsResult.data?.[0] ??
    null) as SupabaseSession | null;

  const dailySoloQuestFromSupabase = getDailyQuestFromPool(
    supabaseQuests.filter((quest) => quest.quest_type === "daily_solo")
  );

  const weeklyPartyQuestFromSupabase =
    supabaseQuests.find((quest) => quest.quest_type === "weekly_party") ?? null;

  const dailySoloQuest = dailySoloQuestFromSupabase
    ? {
        title: dailySoloQuestFromSupabase.title,
        category: dailySoloQuestFromSupabase.category ?? "Daily Solo Quest",
        skill: dailySoloQuestFromSupabase.skill ?? "Practice",
        description:
          dailySoloQuestFromSupabase.description ??
          fallbackDailySoloQuest.description,
        reward: dailySoloQuestFromSupabase.reward ?? fallbackDailySoloQuest.reward,
        teamContribution:
          dailySoloQuestFromSupabase.team_contribution ??
          fallbackDailySoloQuest.teamContribution,
      }
    : fallbackDailySoloQuest;

  const weeklyPartyQuest = weeklyPartyQuestFromSupabase
    ? {
        title: weeklyPartyQuestFromSupabase.title,
        description:
          weeklyPartyQuestFromSupabase.description ??
          activeTeamQuest.description,
        totalFlames: progress?.total_flames ?? activeTeamQuest.totalFlames,
        weeklyGoal: progress?.weekly_goal ?? activeTeamQuest.weeklyGoal,
      }
    : {
        ...activeTeamQuest,
        totalFlames: progress?.total_flames ?? activeTeamQuest.totalFlames,
        weeklyGoal: progress?.weekly_goal ?? activeTeamQuest.weeklyGoal,
      };

  const rewardTiers =
    supabaseRewardTiers.length > 0
      ? supabaseRewardTiers.map((tier) => ({
          name: tier.name,
          requiredFlames: tier.required_flames,
          reward: tier.reward ?? "",
          description: tier.description ?? "",
        }))
      : flameRewardTiers;

  const session = supabaseCurrentSession
    ? {
        title: supabaseCurrentSession.title,
        date: formatSessionDate(supabaseCurrentSession.session_date),
        location: supabaseCurrentSession.location ?? "To be announced",
        focusSkills: supabaseCurrentSession.focus_skills
          ? supabaseCurrentSession.focus_skills
              .split(",")
              .map((skill) => skill.trim())
          : currentSession.focusSkills,
      }
    : currentSession;

  const unlockedFlameTiers = rewardTiers.filter(
    (tier) => weeklyPartyQuest.totalFlames >= tier.requiredFlames
  );

  const currentFlameReward =
    unlockedFlameTiers[unlockedFlameTiers.length - 1] ?? rewardTiers[0];

  const flameProgressPercent = Math.min(
    100,
    Math.round((weeklyPartyQuest.totalFlames / weeklyPartyQuest.weeklyGoal) * 100)
  );

  return {
    campaign,
    dailySoloQuest,
    weeklyPartyQuest,
    rewardTiers,
    session,
    currentFlameReward,
    flameProgressPercent,
  };
}