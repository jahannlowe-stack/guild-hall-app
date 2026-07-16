import { AppShell } from "@/components/AppShell";
import { activeRewards, currentCharacter } from "@/lib/sample-data";
import { getGuildContent } from "@/lib/guild-content";

export default async function CampfirePage() {
  const {
    dailySoloQuest,
    weeklyPartyQuest,
    currentFlameReward,
    flameProgressPercent,
  } = await getGuildContent();

  return (
    <AppShell>
      <section className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          The Campfire
        </p>

        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-orange-50">
              {currentCharacter.characterName}
            </h1>
            <p className="mt-3 max-w-3xl text-orange-100/75">
              This is your character-side view of Guild Hall: quest practice,
              earned badges, unlocked rewards, and shared party progress.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-300/35 bg-orange-500/15 px-5 py-4 shadow-lg shadow-orange-950/40">
            <p className="text-sm font-semibold text-yellow-200">
              Display name
            </p>
            <p className="mt-1 text-xl font-bold text-orange-50">
              Character name only
            </p>
          </div>
        </div>

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
          <h2 className="text-xl font-bold text-orange-50">Badges</h2>
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

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Today’s Practice
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
          <p className="mt-4 text-orange-100/75">
            {dailySoloQuest.description}
          </p>
          <div className="mt-5 rounded-2xl border border-yellow-300/35 bg-orange-500/15 p-4">
            <p className="text-sm font-semibold text-yellow-200">
              Completion reward
            </p>
            <p className="mt-1 text-lg font-bold text-orange-50">
              {dailySoloQuest.reward}
            </p>
            <p className="mt-2 text-sm text-orange-100/75">
              {dailySoloQuest.teamContribution}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Party Fire
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
            {weeklyPartyQuest.title}
          </h2>
          <p className="mt-3 text-orange-100/75">
            {weeklyPartyQuest.description}
          </p>

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
                style={{
                  width: `${flameProgressPercent}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-yellow-300/35 bg-orange-500/15 p-4">
            <p className="text-sm font-semibold text-yellow-200">
              Current party reward
            </p>
            <p className="mt-1 text-lg font-bold text-orange-50">
              {currentFlameReward.name}: {currentFlameReward.reward}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <h2 className="text-2xl font-bold text-orange-50">
          Personal Rewards
        </h2>
        <p className="mt-3 max-w-3xl text-orange-100/75">
          These prototype rewards show how a player’s Campfire can display
          earned boosts and boons later. They are not connected to real
          participant accounts yet.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {activeRewards.map((reward) => (
            <div
              key={reward.name}
              className="rounded-2xl border border-orange-400/15 bg-[#1c120c]/80 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
                {reward.type}
              </p>
              <h3 className="mt-3 text-xl font-bold text-orange-50">
                {reward.name}
              </h3>
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

      <section className="mt-8 rounded-3xl border border-yellow-300/25 bg-orange-500/10 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          Privacy Promise
        </p>
        <h2 className="mt-3 text-2xl font-bold text-orange-50">
          Character names, not real names
        </h2>
        <p className="mt-4 max-w-4xl text-orange-100/75">
          Guild Hall is designed to use a campaign character name as the display
          name. When participant accounts are added later, email will be used
          for login, while the app will avoid showing real names.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">
              What Campfire can show
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-orange-100/75">
              <li>• character name and role</li>
              <li>• badges and earned rewards</li>
              <li>• quest participation</li>
              <li>• shared party progress</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">
              What Campfire does not store
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-orange-100/75">
              <li>• journals or private posts</li>
              <li>• comments or direct messages</li>
              <li>• trauma disclosures</li>
              <li>• court, custody, or clinical notes</li>
            </ul>
          </div>
        </div>
      </section>
    </AppShell>
  );
}