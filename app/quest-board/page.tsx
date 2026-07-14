import { AppShell } from "@/components/AppShell";
import { RewardTier } from "@/components/RewardTier";
import {
  activeTeamQuest,
  flameRewardTiers,
  getDailySoloQuest,
} from "@/lib/sample-data";

export default function QuestBoardPage() {
  const dailySoloQuest = getDailySoloQuest();

  const flamePercentage = Math.min(
    100,
    Math.round((activeTeamQuest.totalFlames / activeTeamQuest.weeklyGoal) * 100)
  );

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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
            <p className="mt-2 text-xl font-bold text-orange-50">
              {dailySoloQuest.reward}
            </p>
            <p className="mt-2 text-sm text-orange-100/75">
              {dailySoloQuest.teamContribution}
            </p>
          </div>

          <button className="mt-6 rounded-full bg-yellow-300 px-6 py-3 font-bold text-[#120905] shadow-lg shadow-orange-950/40 transition hover:bg-yellow-200 hover:shadow-orange-900/60">
            {activeTeamQuest.callToAction}
          </button>

          <p className="mt-3 text-sm text-orange-100/55">
            Prototype note: this button does not save yet. Later, it will record
            completion and add flame to the weekly party quest.
          </p>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Weekly Party Quest
          </p>
          <h2 className="mt-3 text-3xl font-bold text-orange-50">
            {activeTeamQuest.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-orange-400/20 bg-[#1c120c]/80 px-3 py-1 text-sm text-orange-100">
              {activeTeamQuest.category}
            </span>
            <span className="rounded-full border border-orange-400/20 bg-[#1c120c]/80 px-3 py-1 text-sm text-orange-100">
              Skill: {activeTeamQuest.skill}
            </span>
          </div>

          <p className="mt-5 text-orange-100/75">
            {activeTeamQuest.description}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-orange-100/75">
              <span>
                {activeTeamQuest.totalFlames} of {activeTeamQuest.weeklyGoal}{" "}
                flames gathered
              </span>
              <span>{flamePercentage}%</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-[#1c120c]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-700 via-orange-400 to-yellow-300"
                style={{ width: `${flamePercentage}%` }}
              />
            </div>
          </div>

          <p className="mt-4 text-sm text-orange-100/60">
            Each completed daily solo quest adds flame to this weekly party
            quest. More flame unlocks stronger shared rewards.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-2xl font-bold text-orange-50">
          Weekly Flame Reward Tiers
        </h3>
        <p className="mt-2 text-orange-100/75">
          The party earns stronger rewards as more total solo quest completions
          add flame to the shared meter.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {flameRewardTiers.map((tier) => (
            <RewardTier
              key={tier.name}
              name={tier.name}
              requiredContributors={tier.requiredFlames}
              reward={tier.reward}
              description={tier.description}
              currentContributors={activeTeamQuest.totalFlames}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}