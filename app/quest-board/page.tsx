import { AppShell } from "@/components/AppShell";
import { NavCard } from "@/components/NavCard";
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

export default async function QuestBoardPage() {
  const fallbackDailySoloQuest = getDailySoloQuest();

  const [questsResult, rewardTiersResult, sessionsResult] = await Promise.all([
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
          ? supabaseCurrentSession.focus_skills.split(",").map((skill) => skill.trim())
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

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Today’s Solo Quest
          </p>
          <h2 className="mt-3 text-3xl font-bold text-orange-50">
            {dailySoloQuest.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-orange-400/20 bg-[#1c120c]/80 px-3 py-1 text-sm text-orange-100">
              {dailySoloQuest.category}
            </span>
            <span className="rounded-full border border-orange-400/20 bg-[#1c120c]/80 px-3 py-1 text-sm text-orange-100">
              Skill: {dailySoloQuest.skill}
            </span>
          </div>
          <p className="mt-5 text-orange-100/75">
            {dailySoloQuest.description}
          </p>
          <div className="mt-6 rounded-2xl border border-yellow-300/35 bg-orange-500/15 p-5 shadow-lg shadow-orange-950/40">
            <p className="text-sm font-semibold text-yellow-200">
              Completion reward
            </p>
            <h3 className="mt-2 text-xl font-bold text-orange-50">
              {dailySoloQuest.reward}
            </h3>
            <p className="mt-2 text-sm text-orange-100/75">
              {dailySoloQuest.teamContribution}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Next Session
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
            {session.title}
          </h2>
          <div className="mt-4 space-y-3 text-sm text-orange-100/75">
            <p>
              <span className="font-semibold text-orange-50">When:</span>{" "}
              {session.date}
            </p>
            <p>
              <span className="font-semibold text-orange-50">Where:</span>{" "}
              {session.location}
            </p>
            <p>
              <span className="font-semibold text-orange-50">Focus:</span>{" "}
              {session.focusSkills.join(" + ")}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Weekly Party Quest
            </p>
            <h2 className="mt-3 text-3xl font-bold text-orange-50">
              {weeklyPartyQuest.title}
            </h2>
            <p className="mt-3 max-w-3xl text-orange-100/75">
              {weeklyPartyQuest.description}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-300/35 bg-orange-500/15 px-5 py-4 shadow-lg shadow-orange-950/40">
            <p className="text-sm font-semibold text-yellow-200">
              Current team reward
            </p>
            <p className="mt-1 text-xl font-bold text-orange-50">
              {currentFlameReward.name}: {currentFlameReward.reward}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm text-orange-100/75">
            <span>
              {weeklyPartyQuest.totalFlames} of {weeklyPartyQuest.weeklyGoal}{" "}
              flames gathered
            </span>
            <span>{flameProgressPercent}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-[#1c120c]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-700 via-orange-400 to-yellow-300"
              style={{
                width: `${flameProgressPercent}%`,
              }}
            />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <NavCard
          href="/campfire"
          eyebrow="Character"
          title="The Campfire"
          description="View your character, points, badges, and personal progress."
        />
        <NavCard
          href="/quest-board"
          eyebrow="Quests"
          title="The Quest Board"
          description="See daily solo quests, weekly team progress, and boosted rewards."
        />
        <NavCard
          href="/armory"
          eyebrow="Rewards"
          title="The Armory"
          description="Review available boosts, party rewards, and redeemed boons."
        />
        <NavCard
          href="/lantern"
          eyebrow="Safety"
          title="The Lantern"
          description="Read the privacy promise, group boundaries, and emergency resource language."
        />
      </section>
    </AppShell>
  );
}