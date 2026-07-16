import { AppShell } from "@/components/AppShell";

export default function LanternPage() {
  return (
    <AppShell>
      <section className="rounded-3xl border border-yellow-300/25 bg-orange-500/10 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          The Lantern
        </p>
        <h1 className="mt-3 text-4xl font-bold text-orange-50">
          Safety, privacy, and clear boundaries
        </h1>
        <p className="mt-4 max-w-4xl text-orange-100/75">
          The Lantern explains what Guild Hall is for, what it is not for, and
          how the app protects the program’s privacy-light design.
        </p>
      </section>

      <section className="mt-6 rounded-3xl border border-red-400/30 bg-red-950/30 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-200">
          Emergency Notice
        </p>
        <h2 className="mt-3 text-3xl font-bold text-red-50">
          Guild Hall is not monitored for emergencies
        </h2>
        <p className="mt-4 max-w-4xl text-red-100/85">
          If you may hurt yourself or someone else, call or text{" "}
          <span className="font-bold text-red-50">988</span> now, contact local
          emergency services, or go to the nearest emergency department.
        </p>
        <p className="mt-4 max-w-4xl text-sm text-red-100/75">
          Do not use Guild Hall to send crisis messages, emergency requests,
          threats, disclosures of immediate danger, or requests for urgent help.
          This app is not watched in real time.
        </p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            What Guild Hall Tracks
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
            Practice and participation
          </h2>
          <p className="mt-4 text-orange-100/75">
            Guild Hall is designed to support between-session engagement by
            tracking safe, lightweight app activity.
          </p>

          <ul className="mt-5 space-y-3 text-orange-100/75">
            <li>• quests</li>
            <li>• quest completion</li>
            <li>• points and flames</li>
            <li>• badges and rewards</li>
            <li>• party progress</li>
            <li>• session and app content</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            What Guild Hall Does Not Track
          </p>
          <h2 className="mt-3 text-2xl font-bold text-orange-50">
            No private disclosure system
          </h2>
          <p className="mt-4 text-orange-100/75">
            Guild Hall is not a journal, social feed, therapy record, crisis
            inbox, or case-management system.
          </p>

          <ul className="mt-5 space-y-3 text-orange-100/75">
            <li>• journals or private posts</li>
            <li>• comments or direct messages</li>
            <li>• trauma disclosures</li>
            <li>• mental health symptom tracking</li>
            <li>• clinical notes</li>
            <li>• court, custody, or legal details</li>
          </ul>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
          Privacy-Light Design
        </p>
        <h2 className="mt-3 text-3xl font-bold text-orange-50">
          Character names, not real names
        </h2>
        <p className="mt-4 max-w-4xl text-orange-100/75">
          Guild Hall is designed around campaign identity. When participant
          accounts are added later, the app should use an email address for
          login and a campaign character name as the display name. Real names
          should not be required or shown inside the app.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">Email for login</h3>
            <p className="mt-2 text-sm text-orange-100/75">
              Email can be used to access an account, reset login, and keep the
              right person connected to the right character.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">
              Character name for display
            </h3>
            <p className="mt-2 text-sm text-orange-100/75">
              Inside Guild Hall, players should appear by campaign character
              name rather than legal or everyday name.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-[#1c120c]/80 p-4">
            <h3 className="font-bold text-orange-50">
              No public personal profile
            </h3>
            <p className="mt-2 text-sm text-orange-100/75">
              The app should avoid profile fields that invite private stories,
              diagnoses, legal details, or personal histories.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
          Program Boundary
        </p>
        <h2 className="mt-3 text-3xl font-bold text-orange-50">
          The app supports practice; the table holds the story
        </h2>
        <p className="mt-4 max-w-4xl text-orange-100/75">
          Guild Hall is meant to support the D&D-based peer support program
          between sessions. The app can encourage follow-through, reinforce
          skills, and make shared progress visible. It should not become the
          place where participants are asked to write out private emotions,
          trauma, relationship conflict, court issues, or crisis details.
        </p>

        <div className="mt-5 rounded-2xl border border-yellow-300/35 bg-orange-500/15 p-5">
          <p className="text-lg font-bold text-orange-50">
            Private effort. Shared strength.
          </p>
          <p className="mt-2 text-sm text-orange-100/75">
            Guild Hall rewards practice and participation, not vulnerability,
            disclosure, or mental health success.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <h2 className="text-2xl font-bold text-orange-50">
            If something feels urgent
          </h2>
          <p className="mt-4 text-orange-100/75">
            Use real-time support. Call or text 988, contact emergency services,
            go to the nearest emergency department, or reach out to a trusted
            local support person directly.
          </p>
        </div>

        <div className="rounded-3xl border border-orange-400/20 bg-[#120905]/80 p-6 shadow-xl shadow-black/30">
          <h2 className="text-2xl font-bold text-orange-50">
            If something belongs in session
          </h2>
          <p className="mt-4 text-orange-100/75">
            Bring it to the table, the facilitator, a trusted support, or the
            appropriate real-world service. Guild Hall itself should stay focused
            on quests, rewards, and shared progress.
          </p>
        </div>
      </section>
    </AppShell>
  );
}