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
      className="group rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-yellow-300/60 hover:bg-[#1c120c] hover:shadow-orange-950/60"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold text-orange-50">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-orange-100/75">
        {description}
      </p>
      <p className="mt-5 text-sm font-semibold text-orange-300 group-hover:text-yellow-200">
        Enter →
      </p>
    </Link>
  );
}