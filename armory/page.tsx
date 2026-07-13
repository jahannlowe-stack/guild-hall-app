import { AppShell } from "@/components/AppShell";
import { activeRewards } from "@/lib/sample-data";

export default function ArmoryPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
          The Armory
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white">
          Rewards, Boosts, and Boons
        </h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          The Armory holds available in-game rewards. These rewards recognize
          participation and teamwork. They do not measure anyone’s mental health
          or personal life.
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {activeRewards.map((reward) => (
          <div
            key={reward.name}
            className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-black/20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
              {reward.type}
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white">
              {reward.name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {reward.effect}
            </p>
            <p className="mt-5 inline-flex rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-sm font-bold text-emerald-200">
              {reward.status}
            </p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}