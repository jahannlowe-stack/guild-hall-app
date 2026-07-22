import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { AuthControl } from "@/components/AuthControl";
import { getGuildAuthContext } from "@/lib/auth";
import { getCampaigns, getGuildContent } from "@/lib/guild-content";

type AdminPageProps = {
  searchParams?: Promise<{
    campaignId?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCampaignId = resolvedSearchParams?.campaignId;

const [
  {
    campaign,
    campaignHealth,
    dailySoloQuest,
    weeklyPartyQuest,
    rewardTiers,
    session,
    currentFlameReward,
    flameProgressPercent,
  },
  campaigns,
  authContext,
] = await Promise.all([
  getGuildContent(selectedCampaignId),
  getCampaigns(),
  getGuildAuthContext(),
]);

  return (
    <AppShell>
      <section className="rounded-3xl border border-yellow-300/35 bg-orange-500/15 p-6 shadow-xl shadow-orange-950/40">
        
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
  <div>
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-200">
      Admin Preview
    </p>
    <h1 className="mt-3 text-4xl font-bold text-orange-50">
      Guild Hall Control Room
    </h1>
  </div>

  <AuthControl />
</div>
        <p className="mt-4 max-w-4xl text-orange-100/80">
          This is a read-only preview for future facilitator tools. It now shows
          the selected campaign context, but it does not save changes, manage
          participants, or store private participant details.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
  <div className="rounded-2xl border border-yellow-300/25 bg-[#120905]/50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
      Version
    </p>
    <p className="mt-2 text-lg font-bold text-orange-50">v0.4.8</p>
  </div>

  <div className="rounded-2xl border border-yellow-300/25 bg-[#120905]/50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
      Mode
    </p>
    <p className="mt-2 text-lg font-bold text-orange-50">Read-only</p>
  </div>

  <div className="rounded-2xl border border-yellow-300/25 bg-[#120905]/50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
      Foundation
    </p>
    <p className="mt-2 text-lg font-bold text-orange-50">
      Multi-campaign
    </p>
  </div>

  <div className="rounded-2xl border border-yellow-300/25 bg-[#120905]/50 p-4">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
      Data safety
    </p>
    <p className="mt-2 text-lg font-bold text-orange-50">
      Public content only
    </p>
  </div>
</div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Selected Campaign
          </p>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-orange-50">
                {campaign.name}
              </h2>
              <p className="mt-3 max-w-3xl text-orange-100/75">
                {campaign.programLevel.description}
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-300/35 bg-orange-500/15 px-5 py-4 shadow-lg shadow-orange-950/40">
              <p className="text-sm font-semibold text-yellow-200">
                Program level
              </p>
              <p className="mt-1 text-xl font-bold text-orange-50">
                {campaign.programLevel.name}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-4">
              <p className="text-sm text-orange-200/70">Status</p>
              <p className="mt-2 text-lg font-bold capitalize text-orange-50">
                {campaign.status}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-4">
              <p className="text-sm text-orange-200/70">Location</p>
              <p className="mt-2 text-lg font-bold text-orange-50">
                {campaign.location}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-4">
              <p className="text-sm text-orange-200/70">Meeting day</p>
              <p className="mt-2 text-lg font-bold text-orange-50">
                {campaign.meetingDay}
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-4">
              <p className="text-sm text-orange-200/70">Start date</p>
              <p className="mt-2 text-lg font-bold text-orange-50">
                {campaign.startDate}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-5">
            <p className="text-sm font-semibold text-orange-200/80">
              Why this matters
            </p>
            <p className="mt-2 text-sm leading-6 text-orange-100/70">
              Guild Hall is being prepared for multiple campaigns, multiple DMs,
              and multiple program levels. Admin now loads content through the
              selected campaign context so sessions, quests, rewards, and weekly
              progress can remain campaign-specific.
            </p>
          </div>
        </div>
<section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
        Auth Status
      </p>
      <h2 className="mt-3 text-2xl font-bold text-orange-50">
        Current Access Context
      </h2>
    </div>

    <div
      className={`rounded-full border px-4 py-2 text-sm font-bold ${
        authContext.canAccessAdmin
          ? "border-yellow-300/30 bg-orange-500/10 text-yellow-100"
          : "border-orange-400/20 bg-[#1c120c]/70 text-orange-100/55"
      }`}
    >
      {authContext.canAccessAdmin ? "Admin-ready" : "No Admin access"}
    </div>
  </div>

  <p className="mt-4 text-sm leading-6 text-orange-100/70">
    This read-only panel confirms what the app currently knows about the
    signed-in user. Route protection and login screens will be added
    separately.
  </p>

  <div className="mt-5 grid gap-4 md:grid-cols-5">
    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
      <p className="text-sm text-orange-200/70">Signed in</p>
      <p className="mt-2 text-lg font-bold text-orange-50">
        {authContext.isSignedIn ? "Yes" : "No"}
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4 md:col-span-2">
      <p className="text-sm text-orange-200/70">Email</p>
      <p className="mt-2 break-words text-lg font-bold text-orange-50">
        {authContext.email ?? "Not signed in"}
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
      <p className="text-sm text-orange-200/70">Profile role</p>
      <p className="mt-2 text-lg font-bold capitalize text-orange-50">
        {authContext.profile?.role ?? "None"}
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
      <p className="text-sm text-orange-200/70">Memberships</p>
      <p className="mt-2 text-lg font-bold text-orange-50">
        {authContext.memberships.length}
      </p>
    </div>
  </div>
</section>
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Campaign Selector
              </p>
              <h2 className="mt-3 text-2xl font-bold text-orange-50">
                Available Campaigns
              </h2>
            </div>

            <div className="rounded-full border border-yellow-300/30 bg-orange-500/10 px-4 py-2 text-sm font-bold text-yellow-100">
              Link preview
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-orange-100/70">
            Select a campaign to preview its sessions, quests, rewards, and
            weekly flame progress. Editing and campaign creation will come
            later.
          </p>

          <div className="mt-5 space-y-3">
            {campaigns.length > 0 ? (
              campaigns.map((availableCampaign) => {
                const isCurrent = availableCampaign.id === campaign.id;

                return (
                  <Link
                    key={availableCampaign.id}
                    href={`/admin?campaignId=${availableCampaign.id}`}
                    className={`block rounded-2xl border p-4 transition hover:border-yellow-300/45 hover:bg-orange-500/10 ${
                      isCurrent
                        ? "border-yellow-300/45 bg-orange-500/15"
                        : "border-orange-400/15 bg-[#1c120c]/70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-orange-50">
                          {availableCampaign.name}
                        </h3>
                        <p className="mt-1 text-sm text-orange-100/65">
                          {availableCampaign.programLevel.name}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isCurrent
                            ? "bg-yellow-300 text-[#120905]"
                            : "bg-[#120905] text-orange-100/55"
                        }`}
                      >
                        {isCurrent ? "Selected" : availableCampaign.status}
                      </span>
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-orange-100/65 sm:grid-cols-2">
                      <p>
                        <span className="font-semibold text-orange-100/85">
                          Location:
                        </span>{" "}
                        {availableCampaign.location}
                      </p>
                      <p>
                        <span className="font-semibold text-orange-100/85">
                          Meeting:
                        </span>{" "}
                        {availableCampaign.meetingDay}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
                <p className="text-sm text-orange-100/65">
                  No campaigns found. The app will continue using fallback
                  content.
                </p>
              </div>
            )}
          </div>

          {selectedCampaignId ? (
            <Link
              href="/admin"
              className="mt-5 inline-flex rounded-full border border-orange-400/25 bg-[#1c120c]/80 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:border-yellow-300/45 hover:text-yellow-100"
            >
              Return to default campaign
            </Link>
          ) : null}
        </div>
      </section>
<section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
        Campaign Data Health
      </p>
      <h2 className="mt-3 text-2xl font-bold text-orange-50">
        Selected Campaign Setup
      </h2>
    </div>

    <div className="rounded-full border border-yellow-300/30 bg-orange-500/10 px-4 py-2 text-sm font-bold text-yellow-100">
      Read-only
    </div>
  </div>

  <p className="mt-4 text-sm leading-6 text-orange-100/70">
    This check confirms whether the selected campaign has the minimum
    content needed for the current player-facing app experience.
  </p>

  <div className="mt-5 grid gap-4 md:grid-cols-5">
    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
      <p className="text-sm text-orange-200/70">Current session</p>
      <p className="mt-2 text-lg font-bold text-orange-50">
        {campaignHealth.hasCurrentSession ? "Ready" : "Missing"}
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
      <p className="text-sm text-orange-200/70">Daily solo quests</p>
      <p className="mt-2 text-lg font-bold text-orange-50">
        {campaignHealth.dailySoloQuestCount}
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
      <p className="text-sm text-orange-200/70">Weekly party quest</p>
      <p className="mt-2 text-lg font-bold text-orange-50">
        {campaignHealth.hasWeeklyPartyQuest ? "Ready" : "Missing"}
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
      <p className="text-sm text-orange-200/70">Reward tiers</p>
      <p className="mt-2 text-lg font-bold text-orange-50">
        {campaignHealth.rewardTierCount}
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-4">
      <p className="text-sm text-orange-200/70">Weekly progress</p>
      <p className="mt-2 text-lg font-bold text-orange-50">
        {campaignHealth.hasCurrentProgress ? "Ready" : "Missing"}
      </p>
    </div>
  </div>
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
                Campaign-Aware Admin
              </p>
              <h2 className="mt-3 text-2xl font-bold text-orange-50">
                Future Campaign Manager
              </h2>
            </div>
            <div className="rounded-full border border-yellow-300/30 bg-orange-500/10 px-4 py-2 text-sm font-bold text-yellow-100">
              Read-only
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
              <h3 className="font-bold text-orange-50">Multiple campaigns</h3>
              <p className="mt-2 text-sm leading-6 text-orange-100/65">
                Admin can now select a campaign before previewing sessions,
                quests, rewards, or weekly progress.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
              <h3 className="font-bold text-orange-50">Multiple DMs</h3>
              <p className="mt-2 text-sm leading-6 text-orange-100/65">
                Future role rules should let DMs manage assigned campaigns while
                program admins can oversee the full structure.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
              <h3 className="font-bold text-orange-50">
                Three program levels
              </h3>
              <p className="mt-2 text-sm leading-6 text-orange-100/65">
                Campaigns can belong to Level 1, Level 2, or Level 3 so quests
                and supports can match the group’s skill stage.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
              <h3 className="font-bold text-orange-50">Safe content only</h3>
              <p className="mt-2 text-sm leading-6 text-orange-100/65">
                Admin tools should manage program content and progress, not
                personal disclosures, journals, court details, or clinical
                notes.
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
            <h3 className="font-bold text-orange-50">Campaign Manager</h3>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Create campaigns, assign program levels, set locations, and manage
              campaign status.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
            <h3 className="font-bold text-orange-50">DM Assignments</h3>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Assign DMs and facilitators to campaigns after authentication and
              role permissions are designed.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/70 p-5">
            <h3 className="font-bold text-orange-50">Content Editor</h3>
            <p className="mt-2 text-sm leading-6 text-orange-100/65">
              Manage sessions, quests, reward tiers, active weekly quests, and
              flame goals for selected campaigns.
            </p>
          </div>
        </div>
<div className="mt-6 rounded-2xl border border-yellow-300/25 bg-orange-500/10 p-5">
  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-200">
    Suggested next build order
  </p>
  <ol className="mt-4 space-y-3 text-sm leading-6 text-orange-100/75">
    <li>
      <span className="font-bold text-orange-50">1. Campaign setup helpers:</span>{" "}
      add safe read-only checks and seed scripts before building any write tools.
    </li>
    <li>
      <span className="font-bold text-orange-50">2. Session editor:</span>{" "}
      allow admins to update dates, locations, and focus skills for the selected campaign.
    </li>
    <li>
      <span className="font-bold text-orange-50">3. Weekly flame controls:</span>{" "}
      add simple buttons for adjusting current weekly progress without touching participant data.
    </li>
    <li>
      <span className="font-bold text-orange-50">4. Quest/reward editor:</span>{" "}
      manage public program content only: quests, reward tiers, and weekly party quest text.
    </li>
    <li>
      <span className="font-bold text-orange-50">5. Roles and permissions:</span>{" "}
      add authentication-aware rules before allowing multiple facilitators or DMs to make changes.
    </li>
  </ol>
</div>
<div className="mt-6 rounded-2xl border border-orange-400/20 bg-[#1c120c]/70 p-5">
<div className="mt-6 rounded-2xl border border-yellow-300/25 bg-[#1c120c]/70 p-5">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-200">
        Authentication plan
      </p>
      <h3 className="mt-2 text-xl font-bold text-orange-50">
        Email-only access for the pilot
      </h3>
    </div>

    <div className="rounded-full border border-yellow-300/30 bg-orange-500/10 px-4 py-2 text-sm font-bold text-yellow-100">
      No social login
    </div>
  </div>

  <p className="mt-4 text-sm leading-6 text-orange-100/70">
    Guild Hall should use email-only authentication for the September
    pilot. Participants may use a separate email created just for Guild
    Hall, but they should not be required to connect Google, Facebook,
    Discord, Apple, Microsoft, or other social identity accounts.
  </p>

  <div className="mt-5 grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl border border-orange-400/15 bg-[#120905]/70 p-4">
      <p className="text-sm font-semibold text-orange-50">
        Project manager
      </p>
      <p className="mt-2 text-sm leading-6 text-orange-100/65">
        Can access Admin, prepare campaigns, support the DM, and manage
        public program content.
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#120905]/70 p-4">
      <p className="text-sm font-semibold text-orange-50">DM</p>
      <p className="mt-2 text-sm leading-6 text-orange-100/65">
        Can access assigned campaign tools, update sessions, manage
        weekly flames, and adjust public campaign content.
      </p>
    </div>

    <div className="rounded-2xl border border-orange-400/15 bg-[#120905]/70 p-4">
      <p className="text-sm font-semibold text-orange-50">Player</p>
      <p className="mt-2 text-sm leading-6 text-orange-100/65">
        Can access player-facing pages for their campaign without Admin
        controls or access to private participant data.
      </p>
    </div>
  </div>

  <div className="mt-5 rounded-2xl border border-orange-400/15 bg-[#120905]/70 p-4">
    <p className="text-sm font-semibold text-orange-50">
      Pilot login copy
    </p>
    <p className="mt-2 text-sm leading-6 text-orange-100/65">
      Guild Hall uses email-only login. You may use a separate email
      made just for this program if that feels better for privacy. Use
      one you can reliably access, because login links or codes will be
      sent there. No social accounts are required.
    </p>
  </div>
</div>
  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-200">
    Admin safety boundaries
  </p>
  <div className="mt-4 grid gap-4 md:grid-cols-2">
    <div>
      <h3 className="font-bold text-orange-50">Okay to manage here</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-orange-100/70">
        <li>• Campaign names, locations, levels, and status</li>
        <li>• Public session titles, dates, locations, and focus skills</li>
        <li>• Quest text, reward tiers, and weekly flame goals</li>
        <li>• Aggregate campaign readiness and progress checks</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-orange-50">Keep out of Admin</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-orange-100/70">
        <li>• Journals, disclosures, or private participant stories</li>
        <li>• Court, custody, legal, or clinical details</li>
        <li>• Mental health symptom tracking</li>
        <li>• Private messages or facilitator notes about individuals</li>
      </ul>
    </div>
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