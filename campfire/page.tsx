import { AppShell } from "@/components/AppShell";
import { activeRewards, currentCharacter } from "@/lib/sample-data";

export default function CampfirePage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          The Campfire
        </p>
        <h2 className="mt-3 text-3xl font-bold text-orange-50">
          {currentCharacter.characterName}
        </h2>
        <p className="mt-2 text-orange-100/75">
          Played by {currentCharacter.playerName}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-5">
            <p className="text-sm text-orange-200/70">Class / Role</p>
            <p className="mt-2 text-2xl font-bold text-orange-50">
              {currentCharacter.className}
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-5">
            <p className="text-sm text-orange-200/70">Level</p>
            <p className="mt-2 text-2xl font-bold text-orange-50">
              {currentCharacter.level}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-300/40 bg-orange-500/15 p-5 shadow-lg shadow-orange-950/40">
            <p className="text-sm text-yellow-200">Guild Points</p>
            <p className="mt-2 text-2xl font-bold text-orange-50">
              {currentCharacter.points}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-5">
          <p className="text-sm text-orange-200/70">Current Title</p>
          <p className="mt-2 text-xl font-bold text-orange-50">
            {currentCharacter.title}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-orange-50">Badges</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {currentCharacter.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-yellow-300/40 bg-orange-500/15 px-4 py-2 text-sm font-semibold text-yellow-100"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <h3 className="text-2xl font-bold text-orange-50">Personal Rewards</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {activeRewards.map((reward) => (
            <div
              key={reward.name}
              className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
                {reward.type}
              </p>
              <h4 className="mt-3 text-xl font-bold text-orange-50">
                {reward.name}
              </h4>
              <p className="mt-2 text-sm leading-6 text-orange-100/75">
                {reward.effect}
              </p>
              <p className="mt-4 text-sm font-bold text-emerald-300">
                {reward.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}