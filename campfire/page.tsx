import { AppShell } from "@/components/AppShell";
import { activeRewards, currentCharacter } from "@/lib/sample-data";

export default function CampfirePage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
          The Campfire
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white">
          {currentCharacter.characterName}
        </h2>
        <p className="mt-2 text-slate-300">
          Played by {currentCharacter.playerName}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Class / Role</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {currentCharacter.className}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Level</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {currentCharacter.level}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 p-5">
            <p className="text-sm text-amber-200">Guild Points</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {currentCharacter.points}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Current Title</p>
          <p className="mt-2 text-xl font-bold text-white">
            {currentCharacter.title}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-white">Badges</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {currentCharacter.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
        <h3 className="text-2xl font-bold text-white">Personal Rewards</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {activeRewards.map((reward) => (
            <div
              key={reward.name}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                {reward.type}
              </p>
              <h4 className="mt-3 text-xl font-bold text-white">
                {reward.name}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">
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