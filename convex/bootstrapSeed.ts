import { createAccount } from "@convex-dev/auth/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import {
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { now } from "./lib/rbac";

export const countActiveOwners = internalQuery({
  args: {},
  handler: async (ctx) => {
    const owners = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "owner"))
      .collect();

    return owners.filter(
      (user) => user.status === "active" && !user.isDeleted,
    ).length;
  },
});

export const findUserByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const setUserAsOwner = internalMutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      role: "owner",
      status: "active",
      approvedAt: now(),
      updatedAt: now(),
      isDeleted: false,
      name: "IvanZ Admin",
    });
  },
});

type SeedOwnerResult = { userId: Id<"users">; created: boolean };

/** One-time: create the first Owner account with email + password. */
export const seedOwner = internalAction({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<SeedOwnerResult> => {
    const ownerCount = await ctx.runQuery(
      internal.bootstrapSeed.countActiveOwners,
      {},
    );
    if (ownerCount > 0) {
      throw new Error("An active Owner already exists");
    }

    const existing = await ctx.runQuery(
      internal.bootstrapSeed.findUserByEmail,
      { email: args.email },
    );

    if (existing) {
      await ctx.runMutation(internal.bootstrapSeed.setUserAsOwner, {
        userId: existing._id,
      });
      return { userId: existing._id, created: false };
    }

    const { user } = await createAccount(ctx, {
      provider: "password",
      account: { id: args.email, secret: args.password },
      profile: { email: args.email, name: "IvanZ Admin" },
      shouldLinkViaEmail: false,
      shouldLinkViaPhone: false,
    });

    await ctx.runMutation(internal.bootstrapSeed.setUserAsOwner, {
      userId: user._id,
    });

    return { userId: user._id, created: true };
  },
});
