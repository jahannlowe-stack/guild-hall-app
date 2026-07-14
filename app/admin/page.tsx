import { AppShell } from "@/components/AppShell";
import {
  activeTeamQuest,
  currentSession,
  dailySoloQuestPool,
  flameRewardTiers,
  getDailySoloQuest,
} from "@/lib/sample-data";

export default function AdminPage() {
  const dailySoloQuest = getDailySoloQuest();

  const flamePercentage = Math.min(
    100,
    Math.round((activeTeamQuest.totalFlames / activeTeamQuest.weeklyGoal) * 100)
  );

  const unlockedFlameTiers = flameRewardTiers.filter(
    (tier) => activeTeamQuest.totalFlames >= tier.requiredFlames
  );

  const currentFlameReward =
    unlockedFlameTiers[unlockedFlameTiers.length - 1] ?? flameRewardTiers[0];

  return (
    <AppShell>
      <section className="rounded-3xl border border-yellow-300/35 bg-orange-500/15 p-6 shadow-xl shadow-orange-950/40">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-200">
          Admin Preview
        </p>
        <h2 className="mt-3 text-3xl font-bold text-orange-50">
          Guild Hall Control Room
        </h2>
        <p className="mt-3 max-w-3xl text-orange-100/80">
          This is a mock admin page for planning future facilitator tools. It is
          read-only right now. Buttons and forms below do not save changes yet.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Current Session
          </p>
          <h3 className="mt-3 text-2xl font-bold text-orange-50">
            {currentSession.title}
          </h3>

          <div className="mt-5 space-y-3 text-sm text-orange-100/75">
            <p>
              <span className="font-semibold text-orange-50">Date:</span>{" "}
              {currentSession.date}
            </p>
            <p>
              <span className="font-semibold text-orange-50">Location:</span>{" "}
              {currentSession.location}
            </p>
            <p>
              <span className="font-semibold text-orange-50">Focus skills:</span>{" "}
              {currentSession.focusSkills.join(" + ")}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-5">
            <p className="text-sm font-semibold text-orange-200/80">
              Session recap
            </p>
            <p className="mt-2 text-sm leading-6 text-orange-100/70">
              {currentSession.recap}
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
          <h3 className="mt-3 text-2xl font-bold text-orange-50">
            {dailySoloQuest.title}
          </h3>

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

      <section className="mt-8 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Weekly Party Quest
            </p>
            <h3 className="mt-3 text-2xl font-bold text-orange-50">
              {activeTeamQuest.title}
            </h3>
            <p className="mt-3 max-w-3xl text-orange-100/75">
              {activeTeamQuest.description}
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

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Quest Pool
              </p>
              <h3 className="mt-3 text-2xl font-bold text-orange-50">
                Daily Solo Quest Pool
              </h3>
            </div>

            <div className="rounded-full border border-yellow-300/30 bg-orange-500/10 px-4 py-2 text-sm font-bold text-yellow-100">
              {dailySoloQuestPool.length} quests
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {dailySoloQuestPool.map((quest) => (
              <div
                key={quest.id}
                className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-bold text-orange-50">{quest.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-orange-100/65">
                      {quest.description}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-orange-400/20 bg-[#120905]/80 px-3 py-1 text-xs font-semibold text-orange-100/80">
                    {quest.skill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Reward Tiers
          </p>
          <h3 className="mt-3 text-2xl font-bold text-orange-50">
            Weekly Flame Rewards
          </h3>

          <div className="mt-5 space-y-3">
            {flameRewardTiers.map((tier) => {
              const unlocked = activeTeamQuest.totalFlames >= tier.requiredFlames;

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
                      <h4 className="mt-1 font-bold text-orange-50">
                        {tier.name}
                      </h4>
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

      <section className="mt-8 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          Future Admin Controls
        </p>
        <h3 className="mt-3 text-2xl font-bold text-orange-50">
          What this page will eventually manage
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
            <h4 className="font-bold text-orange-50">Quest Builder</h4>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Create solo quests, party quests, skill tags, rewards, and
              rotation rules.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
            <h4 className="font-bold text-orange-50">Session Manager</h4>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Update session dates, focus skills, recaps, and next-session
              teasers.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
            <h4 className="font-bold text-orange-50">Reward Console</h4>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Grant, redeem, expire, or adjust party rewards and individual
              points.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-red-300/25 bg-red-950/30 p-5">
          <h4 className="font-bold text-red-100">Not included by design</h4>
          <p className="mt-2 text-sm leading-6 text-red-50/80">
            This admin area should not become a place for clinical notes,
            personal disclosures, court details, private messages, journals, or
            participant narrative tracking.
          </p>
        </div>
      </section>
    </AppShell>
  );
}