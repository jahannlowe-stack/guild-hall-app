type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span>
          {current} of {total} party members contributed
        </span>
        <span>{percentage}%</span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}