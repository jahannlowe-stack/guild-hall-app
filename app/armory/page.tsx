import { AppShell } from "@/components/AppShell";
import { getGuildContent } from "@/lib/guild-content";

export default async function ArmoryPage() {
  const { rewardTiers, currentFlameReward } = await getGuildContent();

  return (
    <AppShell>
      <section className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          The Armory
        </p>
        <h1 className="mt-3 text-4xl font-bold text-orange-50">
          Rewards, boons, and boosts
        </h1>
        <p className="mt-4 max-w-3xl text-orange-100/75">
          The Armory shows what the party can unlock by keeping the weekly fire
          lit. Rewards are earned through participation and practice — not
          competition, confession, or personal disclosure.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
              Current Unlock
            </p>
            <h2 className="mt-3 text-3xl font-bold text-orange-50">
              {currentFlameReward.name}
            </h2>
            <p className="mt-3 max-w-3xl text-orange-100/75">
              {currentFlameReward.description}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-300/35 bg-orange-500/15 px-5 py-4 shadow-lg shadow-orange-950/40">
            <p className="text-sm font-semibold text-yellow-200">
              Active reward
            </p>
            <p className="mt-1 text-xl font-bold text-orange-50">
              {currentFlameReward.reward}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {rewardTiers.map((tier) => (
          <article
            key={tier.name}
            className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                  {tier.requiredFlames} Flames
                </p>
                <h2 className="mt-3 text-2xl font-bold text-orange-50">
                  {tier.name}
                </h2>
              </div>

              <div className="rounded-full border border-yellow-300/35 bg-orange-500/15 px-3 py-1 text-sm font-semibold text-yellow-200">
                Reward Tier
              </div>
            </div>

            <p className="mt-4 text-orange-100/75">{tier.description}</p>

            <div className="mt-5 rounded-2xl border border-yellow-300/35 bg-orange-500/15 p-4">
              <p className="text-sm font-semibold text-yellow-200">
                Unlock reward
              </p>
              <p className="mt-1 text-lg font-bold text-orange-50">
                {tier.reward}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          Armory Rules
        </p>
        <div className="mt-4 grid gap-4 text-sm text-orange-100/75 md:grid-cols-2">
          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">Rewards are shared</h3>
            <p className="mt-2">
              Party rewards are designed to support the whole table, not create
              leaderboards or competition between players.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">Practice counts</h3>
            <p className="mt-2">
              Guild Hall rewards participation, follow-through, and small acts
              of practice. It does not score feelings, vulnerability, or mental
              health success.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">
              No punishment for missing
            </h3>
            <p className="mt-2">
              Missing a quest does not remove a player from the party or create
              a penalty. The next quest is another chance to add flame.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">Privacy stays light</h3>
            <p className="mt-2">
              The Armory tracks reward content and shared progress, not private
              disclosures, journals, messages, clinical notes, or personal
              stories.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}