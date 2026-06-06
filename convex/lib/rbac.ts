import { getAuthUserId } from "@convex-dev/auth/server";
import type { MutationCtx, QueryCtx } from "../_generated/server";
import type { Doc, Id } from "../_generated/dataModel";

export type AppRole = "owner" | "manager" | "editor" | "viewer";

type Ctx = QueryCtx | MutationCtx;

const roleRank: Record<AppRole, number> = {
  viewer: 1,
  editor: 2,
  manager: 3,
  owner: 4,
};

async function getActiveUser(ctx: Ctx): Promise<Doc<"users">> {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const user = await ctx.db.get(userId);
  if (!user || user.isDeleted || user.status !== "active") {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAuth(ctx: Ctx): Promise<Doc<"users">> {
  return getActiveUser(ctx);
}

export async function requireRole(
  ctx: Ctx,
  allowed: AppRole | AppRole[],
): Promise<Doc<"users">> {
  const user = await getActiveUser(ctx);
  const roles = Array.isArray(allowed) ? allowed : [allowed];

  if (!user.role || !roles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}

export async function requireOwner(ctx: Ctx): Promise<Doc<"users">> {
  return requireRole(ctx, "owner");
}

export async function requireMinRole(
  ctx: Ctx,
  minimum: AppRole,
): Promise<Doc<"users">> {
  const user = await getActiveUser(ctx);

  if (!user.role || roleRank[user.role] < roleRank[minimum]) {
    throw new Error("Forbidden");
  }

  return user;
}

export function now(): number {
  return Date.now();
}

export function softDeletePatch() {
  return {
    isDeleted: true,
    updatedAt: now(),
  } as const;
}

export type UserId = Id<"users">;
