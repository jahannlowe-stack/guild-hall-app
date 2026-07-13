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
      className={`rounded-2xl border p-5 ${
        unlocked
          ? "border-amber-300/60 bg-amber-300/10"
          : "border-slate-800 bg-slate-950/70"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {requiredContributors}+ contributors
          </p>
          <h3 className="mt-2 text-xl font-bold text-white">{name}</h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            unlocked
              ? "bg-amber-300 text-slate-950"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>

      <p className="mt-4 font-semibold text-amber-100">{reward}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}