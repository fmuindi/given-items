import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Bypasses Row Level Security. Only for trusted server paths that need it
 * (staff/admin actions, webhooks, seed/migration scripts) — never import
 * this from a Client Component, and never use it for a request you can
 * satisfy with the RLS-scoped server client instead.
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Set it in Vercel → Project → Environment Variables (server-only, never NEXT_PUBLIC_)."
    );
  }

  return createSupabaseClient<Database>(env.supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
