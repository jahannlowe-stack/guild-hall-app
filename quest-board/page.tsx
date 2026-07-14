import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import { RewardTier } from "@/components/RewardTier";
import { activeTeamQuest, rewardTiers } from "@/lib/sample-data";

export default function QuestBoardPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          The Quest Board
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

        <p className="mt-5 max-w-3xl text-orange-100/75">
          {activeTeamQuest.description}
        </p>

        <div className="mt-6">
          <ProgressBar
            current={activeTeamQuest.contributors}
            total={activeTeamQuest.partySize}
          />
        </div>

        <button className="mt-6 rounded-full bg-yellow-300 px-6 py-3 font-bold text-[#120905] shadow-lg shadow-orange-950/40 transition hover:bg-yellow-200 hover:shadow-orange-900/60">
          {activeTeamQuest.callToAction}
        </button>

        <p className="mt-3 text-sm text-orange-100/55">
          Prototype note: this button does not save anything yet. In the next
          version, it will record a contribution.
        </p>
      </section>

      <section className="mt-8">
        <h3 className="text-2xl font-bold text-orange-50">Reward Boost Tiers</h3>
        <p className="mt-2 text-orange-100/75">
          More party participation unlocks stronger shared rewards. No one is
          punished for missing a quest.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {rewardTiers.map((tier) => (
            <RewardTier
              key={tier.name}
              name={tier.name}
              requiredContributors={tier.requiredContributors}
              reward={tier.reward}
              description={tier.description}
              currentContributors={activeTeamQuest.contributors}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}