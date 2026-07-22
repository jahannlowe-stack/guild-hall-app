"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AuthState = {
  email: string | null;
  isLoading: boolean;
};

export function AuthControl() {
  const [authState, setAuthState] = useState<AuthState>({
    email: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      setAuthState({
        email: user?.email ?? null,
        isLoading: false,
      });
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({
        email: session?.user?.email ?? null,
        isLoading: false,
      });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    setAuthState({
      email: null,
      isLoading: false,
    });

    window.location.href = "/login";
  }

  if (authState.isLoading) {
    return (
      <div className="rounded-full border border-orange-400/20 bg-[#1c120c]/70 px-4 py-2 text-sm font-semibold text-orange-100/55">
        Checking access...
      </div>
    );
  }

  if (!authState.email) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-yellow-300/35 bg-orange-500/20 px-4 py-2 text-sm font-bold text-yellow-100 transition hover:border-yellow-300/60 hover:bg-orange-500/30"
      >
        Email login
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-yellow-300/25 bg-[#120905]/60 p-3 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/70">
          Signed in
        </p>
        <p className="max-w-[220px] truncate text-sm font-bold text-orange-50">
          {authState.email}
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border border-orange-400/25 bg-[#1c120c]/80 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:border-yellow-300/45 hover:text-yellow-100"
      >
        Log out
      </button>
    </div>
  );
}