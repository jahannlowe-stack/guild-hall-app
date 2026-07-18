import {
  activeTeamQuest,
  currentSession,
  flameRewardTiers,
  getDailySoloQuest,
} from "@/lib/sample-data";
import { supabase } from "@/lib/supabase";

type SupabaseQuest = {
  id: string;
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
  name: string;
  required_flames: number;
  reward: string | null;
  description: string | null;
  sort_order: number;
};

type SupabaseSession = {
  id: string;
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

export async function getGuildContent() {
  const fallbackDailySoloQuest = getDailySoloQuest();

  const [questsResult, rewardTiersResult, sessionsResult, campaignsResult] =
    await Promise.all([
      supabase
        .from("quests")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("reward_tiers")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("sessions")
        .select("*")
        .eq("is_current", true)
        .limit(1),
      supabase
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
        .order("created_at", { ascending: true })
        .limit(1),
    ]);

  const supabaseQuests = (questsResult.data ?? []) as SupabaseQuest[];
  const supabaseRewardTiers =
    (rewardTiersResult.data ?? []) as SupabaseRewardTier[];
  const supabaseCurrentSession = (sessionsResult.data?.[0] ??
    null) as SupabaseSession | null;
  const supabaseCampaign = (campaignsResult.data?.[0] ??
    null) as SupabaseCampaign | null;

  const programLevel = getProgramLevel(supabaseCampaign);

  const campaign = supabaseCampaign
    ? {
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
      }
    : {
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
        totalFlames: activeTeamQuest.totalFlames,
        weeklyGoal: activeTeamQuest.weeklyGoal,
      }
    : activeTeamQuest;

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