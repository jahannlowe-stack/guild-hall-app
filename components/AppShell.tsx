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
    <main className="min-h-screen px-4 py-6 text-orange-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-3xl border border-orange-400/30 bg-[#120905]/85 p-6 shadow-2xl shadow-orange-950/50 backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                Guild Hall
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-orange-50 sm:text-5xl">
                Private effort. Shared strength.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-orange-100/80 sm:text-base">
                A between-session companion for the D&D peer support program.
                Track participation, unlock party rewards, and keep the fire lit
                without collecting personal disclosures.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-300/30 bg-[#1c120c]/90 px-4 py-3 text-sm text-orange-100/80 shadow-lg shadow-black/30">
              <p className="font-semibold text-yellow-300">Prototype v0.1</p>
              <p>No login • No database • Sample data only</p>
            </div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-orange-300/25 bg-[#1c120c] px-4 py-2 text-sm font-medium text-orange-100 transition hover:border-yellow-300/80 hover:bg-orange-500/15 hover:text-yellow-100 hover:shadow-md hover:shadow-orange-900/40"
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