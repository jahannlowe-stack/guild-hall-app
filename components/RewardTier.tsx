type RewardTierProps = {
  name: string;
  requiredContributors: number;
  reward: string;
  description: string;
  currentContributors: number;
};

export function RewardTier({
  name,
  requiredContributors,
  reward,
  description,
  currentContributors,
}: RewardTierProps) {
  const unlocked = currentContributors >= requiredContributors;

  return (
    <div
      className={`rounded-2xl border p-5 shadow-lg transition ${
        unlocked
          ? "border-yellow-300/60 bg-orange-500/15 shadow-orange-950/50"
          : "border-orange-400/15 bg-[#120905]/80 shadow-black/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-200/70">
            {requiredContributors}+ contributors
          </p>
          <h3 className="mt-2 text-xl font-bold text-orange-50">{name}</h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            unlocked
              ? "bg-yellow-300 text-[#120905]"
              : "bg-[#1c120c] text-orange-100/70"
          }`}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>

      <p className="mt-4 font-semibold text-yellow-100">{reward}</p>
      <p className="mt-2 text-sm leading-6 text-orange-100/75">
        {description}
      </p>
    </div>
  );
}