import { AppShell } from "@/components/AppShell";
import { groupBoundaries, privacyPrinciples } from "@/lib/sample-data";

export default function LanternPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-yellow-300/35 bg-orange-500/15 p-6 shadow-xl shadow-orange-950/40">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-200">
          The Lantern
        </p>
        <h2 className="mt-3 text-3xl font-bold text-orange-50">
          Privacy, Boundaries, and Safety
        </h2>
        <p className="mt-3 max-w-3xl text-orange-100/80">
          The Lantern contains the plain-language safety and privacy promises
          for Guild Hall. This section should stay easy to find and easy to
          understand.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <h3 className="text-2xl font-bold text-orange-50">Privacy Promise</h3>
          <ul className="mt-5 space-y-3">
            {privacyPrinciples.map((principle) => (
              <li key={principle} className="flex gap-3 text-orange-100/75">
                <span className="mt-1 text-yellow-300">✦</span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <h3 className="text-2xl font-bold text-orange-50">Group Boundaries</h3>
          <ul className="mt-5 space-y-3">
            {groupBoundaries.map((boundary) => (
              <li key={boundary} className="flex gap-3 text-orange-100/75">
                <span className="mt-1 text-orange-300">✦</span>
                <span>{boundary}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-red-300/30 bg-red-950/40 p-6 shadow-xl shadow-black/30">
        <h3 className="text-2xl font-bold text-red-100">Emergency Notice</h3>
        <p className="mt-3 max-w-3xl text-red-50/85">
          Guild Hall is not monitored for emergencies. If you may hurt yourself
          or someone else, call or text <strong>988</strong> now, contact local
          emergency services, or go to the nearest emergency department.
        </p>
      </section>
    </AppShell>
  );
}