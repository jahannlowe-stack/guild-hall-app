import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/campfire", label: "The Campfire" },
  { href: "/quest-board", label: "The Quest Board" },
  { href: "/armory", label: "The Armory" },
  { href: "/lantern", label: "The Lantern" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-3xl border border-amber-300/20 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Guild Hall
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Private effort. Shared strength.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                A between-session companion for the D&D peer support program.
                Track participation, unlock party rewards, and keep the fire lit
                without collecting personal disclosures.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
              <p className="font-semibold text-amber-200">Prototype v0.1</p>
              <p>No login • No database • Sample data only</p>
            </div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-300/70 hover:bg-amber-300/10 hover:text-amber-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}