"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatusMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Enter an email address first.");
      setIsSubmitting(false);
      return;
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/admin`
        : undefined;

    const { error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    setStatusMessage(
      "Check your email for a secure Guild Hall login link. You can close this tab after opening the link."
    );
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="email"
          className="text-sm font-semibold text-orange-100"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full rounded-2xl border border-orange-400/20 bg-[#1c120c] px-4 py-3 text-orange-50 outline-none transition placeholder:text-orange-100/35 focus:border-yellow-300/60"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full border border-yellow-300/35 bg-orange-500/20 px-5 py-3 text-sm font-bold text-yellow-100 shadow-lg shadow-orange-950/30 transition hover:border-yellow-300/60 hover:bg-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Sending login link..." : "Send login link"}
      </button>

      {statusMessage ? (
        <div className="rounded-2xl border border-green-300/25 bg-green-950/30 p-4 text-sm leading-6 text-green-50/85">
          {statusMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-2xl border border-red-300/25 bg-red-950/30 p-4 text-sm leading-6 text-red-50/85">
          {errorMessage}
        </div>
      ) : null}
    </form>
  );
}