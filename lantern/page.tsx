import { AppShell } from "@/components/AppShell";
import { groupBoundaries, privacyPrinciples } from "@/lib/sample-data";

export default function LanternPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6 shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
          The Lantern
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white">
          Privacy, Boundaries, and Safety
        </h2>
        <p className="mt-3 max-w-3xl text-slate-200">
          The Lantern contains the plain-language safety and privacy promises
          for Guild Hall. This section should stay easy to find and easy to
          understand.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
          <h3 className="text-2xl font-bold text-white">Privacy Promise</h3>
          <ul className="mt-5 space-y-3">
            {privacyPrinciples.map((principle) => (
              <li key={principle} className="flex gap-3 text-slate-300">
                <span className="mt-1 text-amber-300">✦</span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
          <h3 className="text-2xl font-bold text-white">Group Boundaries</h3>
          <ul className="mt-5 space-y-3">
            {groupBoundaries.map((boundary) => (
              <li key={boundary} className="flex gap-3 text-slate-300">
                <span className="mt-1 text-blue-300">✦</span>
                <span>{boundary}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-red-300/30 bg-red-300/10 p-6 shadow-xl shadow-black/20">
        <h3 className="text-2xl font-bold text-white">Emergency Notice</h3>
        <p className="mt-3 max-w-3xl text-slate-200">
          Guild Hall is not monitored for emergencies. If you may hurt yourself
          or someone else, call or text <strong>988</strong> now, contact local
          emergency services, or go to the nearest emergency department.
        </p>
      </section>
    </AppShell>
  );
}