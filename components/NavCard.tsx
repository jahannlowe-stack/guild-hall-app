import Link from "next/link";

type NavCardProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function NavCard({ href, eyebrow, title, description }: NavCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-amber-300/60 hover:bg-slate-900"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      <p className="mt-5 text-sm font-semibold text-amber-200 group-hover:text-amber-100">
        Enter →
      </p>
    </Link>
  );
}