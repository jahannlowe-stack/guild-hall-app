export const currentCharacter = {
  playerName: "Sample Player",
  characterName: "Edrin Vale",
  className: "Wayfinder",
  level: 1,
  points: 18,
  title: "Keeper of the Small Flame",
  badges: ["First Session", "Asked Early", "Held the Line"],
};

export const currentSession = {
  title: "Introduction: Saw the Intro",
  date: "Next Thursday, 6:00 PM",
  location: "Rockland — private room",
  focusSkills: ["Communication", "Collaboration"],
  recap:
    "The party woke in a locked stone room with limited movement, strange mechanisms, and no clear way out alone. Progress came through short requests, role clarity, and staying steady under pressure.",
};

export const dailySoloQuestPool = [
  {
    id: "name-next-step",
    title: "Name the Next Small Step",
    category: "Daily Solo Quest",
    skill: "Emotional Regulation",
    description:
      "At least once today, pause and identify the next small useful action. No details need to be recorded.",
    reward: "+1 Guild Point",
    teamContribution: "+1 Flame toward the party quest",
  },
  {
    id: "ask-early",
    title: "Ask Early",
    category: "Daily Solo Quest",
    skill: "Asking for Help",
    description:
      "Ask for help with something small before it becomes overwhelming. The app only tracks completion, not what happened.",
    reward: "+1 Guild Point",
    teamContribution: "+1 Flame toward the party quest",
  },
  {
    id: "short-rest",
    title: "Take a Short Rest",
    category: "Daily Solo Quest",
    skill: "Recovery",
    description:
      "Take one intentional pause today: water, food, breath, walk, quiet, or another safe reset.",
    reward: "+1 Guild Point",
    teamContribution: "+1 Flame toward the party quest",
  },
  {
    id: "clear-request",
    title: "Make a Clear Request",
    category: "Daily Solo Quest",
    skill: "Communication",
    description:
      "Practice one clear, direct request today. Keep it simple, respectful, and specific.",
    reward: "+1 Guild Point",
    teamContribution: "+1 Flame toward the party quest",
  },
  {
    id: "share-the-load",
    title: "Share the Load",
    category: "Daily Solo Quest",
    skill: "Collaboration",
    description:
      "Let someone take one small piece of the load, or offer to take one small piece for someone else.",
    reward: "+1 Guild Point",
    teamContribution: "+1 Flame toward the party quest",
  },
  {
    id: "hold-the-line",
    title: "Hold the Line",
    category: "Daily Solo Quest",
    skill: "Boundaries",
    description:
      "Use one small boundary today: pause, say no, ask for time, leave space, or choose not to escalate.",
    reward: "+1 Guild Point",
    teamContribution: "+1 Flame toward the party quest",
  },
  {
    id: "repair-small-rupture",
    title: "Repair a Small Rupture",
    category: "Daily Solo Quest",
    skill: "Repair",
    description:
      "If a small moment goes sideways, practice one repair move: clarify, apologize, reset, or recommit.",
    reward: "+1 Guild Point",
    teamContribution: "+1 Flame toward the party quest",
  },
];

export function getDailySoloQuest(date = new Date()) {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const difference = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(difference / oneDay);

  const questIndex = dayOfYear % dailySoloQuestPool.length;

  return dailySoloQuestPool[questIndex];
}

export const activeTeamQuest = {
  title: "Keep the Fire Lit",
  category: "Weekly Party Quest",
  skill: "Collaboration",
  description:
    "Complete daily solo quests to add flame to the party meter. More total contributions unlock stronger shared rewards for the next session.",
  callToAction: "I completed today’s quest",
  contributors: 3,
  partySize: 5,
  totalFlames: 11,
  weeklyGoal: 15,
};

export const rewardTiers = [
  {
    name: "Spark",
    requiredContributors: 1,
    reward: "+1 Guild Point",
    description: "A small sign that the fire is still burning.",
  },
  {
    name: "Flame",
    requiredContributors: 2,
    reward: "Shared d4",
    description: "The party may add 1d4 to one group check.",
  },
  {
    name: "Bonfire",
    requiredContributors: 3,
    reward: "Shared d6",
    description: "The party may add 1d6 to one collaboration or problem-solving check.",
  },
  {
    name: "Beacon",
    requiredContributors: 4,
    reward: "Shared d8 + story clue",
    description: "The party gains a stronger boost and receives one useful clue.",
  },
];

export const flameRewardTiers = [
  {
    name: "Ember",
    requiredFlames: 3,
    reward: "+1 Guild Point for the party",
    description: "The party kept the fire alive.",
  },
  {
    name: "Hearth",
    requiredFlames: 6,
    reward: "Shared d4",
    description: "The party may add 1d4 to one group check.",
  },
  {
    name: "Bonfire",
    requiredFlames: 10,
    reward: "Shared d6",
    description:
      "The party may add 1d6 to one collaboration or non-violent problem-solving check.",
  },
  {
    name: "Beacon",
    requiredFlames: 15,
    reward: "Shared d8 + story clue",
    description:
      "The party earns a stronger boost and receives one useful clue next session.",
  },
];

export const activeRewards = [
  {
    name: "Campfire Die",
    type: "Party Reward",
    effect: "Add 1d6 to one collaboration or problem-solving check.",
    status: "Unlocked",
  },
  {
    name: "Moment of Clarity",
    type: "Personal Reward",
    effect: "Ask the DM one clarifying question about the environment.",
    status: "Available",
  },
  {
    name: "Signal Flare",
    type: "Support Reward",
    effect: "Give another player +1d4 when assisting or being assisted.",
    status: "Available",
  },
];

export const privacyPrinciples = [
  "Guild Hall tracks participation, progress, and rewards — not personal disclosures.",
  "There are no journals, posts, comments, direct messages, or open text reflections in this version.",
  "Players can contribute to team quests without explaining what they did.",
  "Rewards recognize practice and participation, not mental health status.",
  "Guild Hall is not monitored for emergencies.",
];

export const groupBoundaries = [
  "Peer support, not therapy.",
  "No court strategy or legal processing.",
  "No harassment, threats, intimidation, or hate speech.",
  "Participation is encouraged but not forced.",
  "No one is punished for missing a quest.",
];