import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { now } from "./lib/rbac";

/** One-time: promote engineer to Owner after first Google/email sign-up. */
export const promoteOwnerByEmail = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const owners = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "owner"))
      .collect();

    const activeOwners = owners.filter(
      (user) => user.status === "active" && !user.isDeleted,
    );
    if (activeOwners.length > 0) {
      throw new Error("An active Owner already exists");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("User not found. Sign in once before running bootstrap.");
    }

    await ctx.db.patch(user._id, {
      role: "owner",
      status: "active",
      approvedAt: now(),
      updatedAt: now(),
      isDeleted: false,
    });

    return { userId: user._id, email: args.email };
  },
});
