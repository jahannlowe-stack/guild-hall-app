import { AppShell } from "@/components/AppShell";
import { getGuildContent } from "@/lib/guild-content";

export default async function AdminPage() {
  const {
    dailySoloQuest,
    weeklyPartyQuest,
    rewardTiers,
    session,
    currentFlameReward,
    flameProgressPercent,
  } = await getGuildContent();

  return (
    <AppShell>
      <section className="rounded-3xl border border-yellow-300/35 bg-orange-500/15 p-6 shadow-xl shadow-orange-950/40">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-200">
          Admin Preview
        </p>
        <h1 className="mt-3 text-4xl font-bold text-orange-50">
          Guild Hall Control Room
        </h1>
        <p className="mt-4 max-w-4xl text-orange-100/80">
          This is a read-only preview for future facilitator tools. It shows the
          current app content and planned admin workflows, but it does not save
          changes, manage participants, or store private participant details.
        </p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Current Session
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
            {session.title}
          </h2>

          <div className="mt-5 space-y-3 text-sm text-orange-100/75">
            <p>
              <span className="font-semibold text-orange-50">Date:</span>{" "}
              {session.date}
            </p>
            <p>
              <span className="font-semibold text-orange-50">Location:</span>{" "}
              {session.location}
            </p>
            <p>
              <span className="font-semibold text-orange-50">
                Focus skills:
              </span>{" "}
              {session.focusSkills.join(" + ")}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-5">
            <p className="text-sm font-semibold text-orange-200/80">
              Future session controls
            </p>
            <p className="mt-2 text-sm leading-6 text-orange-100/70">
              Later, facilitators may update session dates, locations, focus
              skills, and simple recap text here. For now, this page is
              read-only.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              disabled
              className="rounded-full border border-orange-400/20 bg-[#1c120c]/70 px-4 py-2 text-sm font-semibold text-orange-100/45"
            >
              Edit Session — later
            </button>
            <button
              disabled
              className="rounded-full border border-orange-400/20 bg-[#1c120c]/70 px-4 py-2 text-sm font-semibold text-orange-100/45"
            >
              Publish Recap — later
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Today’s Solo Quest
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
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

          <p className="mt-5 text-sm leading-6 text-orange-100/75">
            {dailySoloQuest.description}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-yellow-300/30 bg-orange-500/10 p-4">
              <p className="text-sm font-semibold text-yellow-200">
                Player reward
              </p>
              <p className="mt-2 text-orange-50">{dailySoloQuest.reward}</p>
            </div>

            <div className="rounded-2xl border border-yellow-300/30 bg-orange-500/10 p-4">
              <p className="text-sm font-semibold text-yellow-200">
                Team contribution
              </p>
              <p className="mt-2 text-orange-50">
                {dailySoloQuest.teamContribution}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              disabled
              className="rounded-full border border-orange-400/20 bg-[#1c120c]/70 px-4 py-2 text-sm font-semibold text-orange-100/45"
            >
              Override Daily Quest — later
            </button>
            <button
              disabled
              className="rounded-full border border-orange-400/20 bg-[#1c120c]/70 px-4 py-2 text-sm font-semibold text-orange-100/45"
            >
              Add Quest to Pool — later
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Weekly Party Quest
            </p>
            <h2 className="mt-3 text-2xl font-bold text-orange-50">
              {weeklyPartyQuest.title}
            </h2>
            <p className="mt-3 max-w-3xl text-orange-100/75">
              {weeklyPartyQuest.description}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-300/35 bg-orange-500/15 px-5 py-4 shadow-lg shadow-orange-950/40">
            <p className="text-sm font-semibold text-yellow-200">
              Current reward
            </p>
            <p className="mt-1 text-xl font-bold text-orange-50">
              {currentFlameReward.name}: {currentFlameReward.reward}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm text-orange-100/75">
            <span>
              {weeklyPartyQuest.totalFlames} of {weeklyPartyQuest.weeklyGoal}{" "}
              flames gathered
            </span>
            <span>{flameProgressPercent}%</span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-[#1c120c]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-700 via-orange-400 to-yellow-300"
              style={{ width: `${flameProgressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            disabled
            className="rounded-full border border-orange-400/20 bg-[#1c120c]/70 px-4 py-2 text-sm font-semibold text-orange-100/45"
          >
            Edit Weekly Quest — later
          </button>
          <button
            disabled
            className="rounded-full border border-orange-400/20 bg-[#1c120c]/70 px-4 py-2 text-sm font-semibold text-orange-100/45"
          >
            Reset Weekly Flame Meter — later
          </button>
          <button
            disabled
            className="rounded-full border border-orange-400/20 bg-[#1c120c]/70 px-4 py-2 text-sm font-semibold text-orange-100/45"
          >
            Redeem Team Reward — later
          </button>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Quest Content
              </p>
              <h2 className="mt-3 text-2xl font-bold text-orange-50">
                Future Quest Manager
              </h2>
            </div>

            <div className="rounded-full border border-yellow-300/30 bg-orange-500/10 px-4 py-2 text-sm font-bold text-yellow-100">
              Read-only
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
              <h3 className="font-bold text-orange-50">Daily solo quests</h3>
              <p className="mt-2 text-sm leading-6 text-orange-100/65">
                Later, this area can manage the daily solo quest pool,
                categories, skills, rotation rules, and completion rewards.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
              <h3 className="font-bold text-orange-50">Weekly party quests</h3>
              <p className="mt-2 text-sm leading-6 text-orange-100/65">
                Later, facilitators can choose the active weekly party quest and
                set shared progress goals.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
              <h3 className="font-bold text-orange-50">Skill tags</h3>
              <p className="mt-2 text-sm leading-6 text-orange-100/65">
                Quest skills can stay practical: regulation, communication,
                repair, planning, boundaries, and teamwork.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
              <h3 className="font-bold text-orange-50">Safe content only</h3>
              <p className="mt-2 text-sm leading-6 text-orange-100/65">
                Quest content should not ask participants to write disclosures,
                trauma details, court information, or clinical notes.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Reward Tiers
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
            Weekly Flame Rewards
          </h2>

          <div className="mt-5 space-y-3">
            {rewardTiers.map((tier) => {
              const unlocked =
                weeklyPartyQuest.totalFlames >= tier.requiredFlames;

              return (
                <div
                  key={tier.name}
                  className={`rounded-2xl border p-4 ${
                    unlocked
                      ? "border-yellow-300/45 bg-orange-500/15"
                      : "border-orange-400/15 bg-[#1c120c]/70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200/65">
                        {tier.requiredFlames}+ flames
                      </p>
                      <h3 className="mt-1 font-bold text-orange-50">
                        {tier.name}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        unlocked
                          ? "bg-yellow-300 text-[#120905]"
                          : "bg-[#120905] text-orange-100/55"
                      }`}
                    >
                      {unlocked ? "Unlocked" : "Locked"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-yellow-100">
                    {tier.reward}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-orange-100/65">
                    {tier.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          Future Admin Controls
        </p>
        <h2 className="mt-3 text-2xl font-bold text-orange-50">
          What this page will eventually manage
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
            <h3 className="font-bold text-orange-50">Quest Builder</h3>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Create solo quests, party quests, skill tags, rewards, and
              rotation rules.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
            <h3 className="font-bold text-orange-50">Session Manager</h3>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Update session dates, focus skills, recaps, and next-session
              information.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
            <h3 className="font-bold text-orange-50">Reward Console</h3>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Manage party rewards, flame tiers, reward availability, and
              future redemption workflows.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-red-300/25 bg-red-950/30 p-5">
          <h3 className="font-bold text-red-100">Not included by design</h3>
          <p className="mt-2 text-sm leading-6 text-red-50/80">
            This admin area should not become a place for clinical notes,
            personal disclosures, court details, custody details, private
            messages, journals, participant narrative tracking, or mental health
            symptom tracking.
          </p>
        </div>
      </section>
    </AppShell>
  );
}