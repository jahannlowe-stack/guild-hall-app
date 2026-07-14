import { AppShell } from "@/components/AppShell";
import { NavCard } from "@/components/NavCard";
import { ProgressBar } from "@/components/ProgressBar";
import { activeTeamQuest, currentSession, rewardTiers } from "@/lib/sample-data";

export default function Home() {
  const unlockedTiers = rewardTiers.filter(
    (tier) => activeTeamQuest.contributors >= tier.requiredContributors
  );

  const currentReward = unlockedTiers[unlockedTiers.length - 1];

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Current Party Quest
          </p>
          <h2 className="mt-3 text-3xl font-bold text-orange-50">
            {activeTeamQuest.title}
          </h2>
          <p className="mt-3 text-orange-100/75">
            {activeTeamQuest.description}
          </p>

          <div className="mt-6">
            <ProgressBar
              current={activeTeamQuest.contributors}
              total={activeTeamQuest.partySize}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-300/40 bg-orange-500/15 p-5 shadow-lg shadow-orange-950/40">
            <p className="text-sm font-semibold text-yellow-200">
              Current unlocked reward
            </p>
            <h3 className="mt-2 text-2xl font-bold text-orange-50">
              {currentReward.name}: {currentReward.reward}
            </h3>
            <p className="mt-2 text-sm text-orange-100/75">
              {currentReward.description}
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
          description="See active team quests, participation progress, and boosted rewards."
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