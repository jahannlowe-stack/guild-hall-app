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

export const activeTeamQuest = {
  title: "Keep the Fire Lit",
  category: "Party Quest",
  skill: "Collaboration",
  description:
    "Before the next session, each player can complete one small stabilizing action and contribute to the party quest. No details are collected.",
  callToAction: "I contributed",
  contributors: 3,
  partySize: 5,
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