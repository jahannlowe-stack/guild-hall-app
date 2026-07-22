import { supabase } from "@/lib/supabase";

export type GuildRole = "owner" | "dm" | "player";
export type MembershipStatus = "active" | "invited" | "inactive";

export type GuildProfile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: GuildRole;
  created_at: string;
  updated_at: string;
};

export type GuildCampaignMembership = {
  id: string;
  campaign_id: string;
  user_id: string;
  role: GuildRole;
  status: MembershipStatus;
  created_at: string;
  updated_at: string;
};

export type GuildAuthContext = {
  userId: string | null;
  email: string | null;
  profile: GuildProfile | null;
  memberships: GuildCampaignMembership[];
  isSignedIn: boolean;
  isOwner: boolean;
  isDm: boolean;
  isPlayer: boolean;
  canAccessAdmin: boolean;
};

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile(userId: string | null) {
  if (!userId) {
    return null;
  }

  const profileResult = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .limit(1);

  return (profileResult.data?.[0] ?? null) as GuildProfile | null;
}

export async function getCurrentMemberships(userId: string | null) {
  if (!userId) {
    return [];
  }

  const membershipsResult = await supabase
    .from("campaign_memberships")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: true });

  return (membershipsResult.data ?? []) as GuildCampaignMembership[];
}

export function canRoleAccessAdmin(role: GuildRole | null | undefined) {
  return role === "owner" || role === "dm";
}

export function hasAdminMembership(memberships: GuildCampaignMembership[]) {
  return memberships.some(
    (membership) =>
      membership.status === "active" &&
      (membership.role === "owner" || membership.role === "dm")
  );
}

export async function getGuildAuthContext(): Promise<GuildAuthContext> {
  const user = await getCurrentUser();
  const userId = user?.id ?? null;
  const email = user?.email ?? null;

  const [profile, memberships] = await Promise.all([
    getCurrentProfile(userId),
    getCurrentMemberships(userId),
  ]);

  const isOwner = profile?.role === "owner";
  const isDm =
    profile?.role === "dm" ||
    memberships.some(
      (membership) =>
        membership.status === "active" && membership.role === "dm"
    );
  const isPlayer = profile?.role === "player";

  const canAccessAdmin =
    canRoleAccessAdmin(profile?.role) || hasAdminMembership(memberships);

  return {
    userId,
    email,
    profile,
    memberships,
    isSignedIn: Boolean(userId),
    isOwner,
    isDm,
    isPlayer,
    canAccessAdmin,
  };
}