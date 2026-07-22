import { AppShell } from "@/components/AppShell";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-yellow-300/35 bg-orange-500/15 p-6 shadow-xl shadow-orange-950/40">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-200">
          Guild Hall Access
        </p>
        <h1 className="mt-3 text-4xl font-bold text-orange-50">
          Email-only login
        </h1>
        <p className="mt-4 max-w-4xl text-orange-100/80">
          Sign in with an email address to access your campaign. Guild Hall does
          not require social media accounts, legal names, journals, court
          details, clinical notes, or private disclosures.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-yellow-300/25 bg-[#120905]/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
              Login type
            </p>
            <p className="mt-2 text-lg font-bold text-orange-50">
              Email magic link
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-300/25 bg-[#120905]/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
              Social login
            </p>
            <p className="mt-2 text-lg font-bold text-orange-50">Not used</p>
          </div>

          <div className="rounded-2xl border border-yellow-300/25 bg-[#120905]/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
              Identity
            </p>
            <p className="mt-2 text-lg font-bold text-orange-50">
              Minimal by design
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Sign in
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
            Check your email for a login link
          </h2>
          <p className="mt-4 text-sm leading-6 text-orange-100/70">
            Enter an email you can reliably access. Supabase will send a secure
            login link to that address.
          </p>

          <LoginForm />
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Privacy note
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
            Use a separate email if that feels safer
          </h2>
          <p className="mt-4 text-sm leading-6 text-orange-100/70">
            You may use a separate email made just for Guild Hall if that feels
            better for privacy. Use one you can reliably access, because login
            links or codes will be sent there.
          </p>

          <div className="mt-5 rounded-2xl border border-yellow-300/25 bg-orange-500/10 p-5">
            <p className="text-sm font-semibold text-yellow-200">
              No social accounts required
            </p>
            <p className="mt-2 text-sm leading-6 text-orange-100/70">
              Guild Hall does not use Google, Facebook, Discord, Apple,
              Microsoft, or other social login providers for the pilot.
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-red-300/25 bg-red-950/30 p-5">
            <p className="text-sm font-semibold text-red-100">
              What Guild Hall does not ask for
            </p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-red-50/80">
              <li>• Legal names</li>
              <li>• Journals or private reflections</li>
              <li>• Court, custody, or legal details</li>
              <li>• Clinical notes or mental health symptom tracking</li>
              <li>• Social media account connections</li>
            </ul>
          </div>
        </div>
      </section>
    </AppShell>
  );
}