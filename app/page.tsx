import { AppShell } from "@/components/AppShell";
import { NavCard } from "@/components/NavCard";
import { ProgressBar } from "@/components/ProgressBar";
import {
  activeTeamQuest,
  currentSession,
  flameRewardTiers,
  getDailySoloQuest,
} from "@/lib/sample-data";

export default function Home() {
  const dailySoloQuest = getDailySoloQuest();

  const unlockedFlameTiers = flameRewardTiers.filter(
    (tier) => activeTeamQuest.totalFlames >= tier.requiredFlames
  );

  const currentFlameReward =
    unlockedFlameTiers[unlockedFlameTiers.length - 1] ?? flameRewardTiers[0];

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
            {currentSession.title}
          </h2>
          <div className="mt-4 space-y-3 text-sm text-orange-100/75">
            <p>
              <span className="font-semibold text-orange-50">When:</span>{" "}
              {currentSession.date}
            </p>
            <p>
              <span className="font-semibold text-orange-50">Where:</span>{" "}
              {currentSession.location}
            </p>
            <p>
              <span className="font-semibold text-orange-50">Focus:</span>{" "}
              {currentSession.focusSkills.join(" + ")}
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
              {activeTeamQuest.title}
            </h2>
            <p className="mt-3 max-w-3xl text-orange-100/75">
              {activeTeamQuest.description}
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
              {activeTeamQuest.totalFlames} of {activeTeamQuest.weeklyGoal} flames
              gathered
            </span>
            <span>
              {Math.min(
                100,
                Math.round(
                  (activeTeamQuest.totalFlames / activeTeamQuest.weeklyGoal) *
                    100
                )
              )}
              %
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-[#1c120c]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-700 via-orange-400 to-yellow-300"
              style={{
                width: `${Math.min(
                  100,
                  Math.round(
                    (activeTeamQuest.totalFlames / activeTeamQuest.weeklyGoal) *
                      100
                  )
                )}%`,
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