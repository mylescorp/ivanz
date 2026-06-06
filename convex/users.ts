import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { role, userStatus } from "./lib/fields";
import { now, requireOwner, requireRole } from "./lib/rbac";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user || user.isDeleted) return null;

    return {
      _id: user._id,
      name: user.name ?? null,
      email: user.email ?? null,
      image: user.image ?? null,
      role: user.role ?? null,
      status: user.status ?? null,
    };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireOwner(ctx);

    const users = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("isDeleted"), true))
      .collect();

    return users.map((user) => ({
      _id: user._id,
      name: user.name ?? null,
      email: user.email ?? null,
      role: user.role ?? null,
      status: user.status ?? null,
      createdAt: user.createdAt ?? null,
      approvedAt: user.approvedAt ?? null,
    }));
  },
});

export const pendingCount = query({
  args: {},
  handler: async (ctx) => {
    await requireRole(ctx, ["owner", "manager"]);

    const pending = await ctx.db
      .query("users")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();

    return pending.filter((user) => !user.isDeleted).length;
  },
});

export const approve = mutation({
  args: {
    userId: v.id("users"),
    role: role,
  },
  handler: async (ctx, args) => {
    const owner = await requireOwner(ctx);
    const user = await ctx.db.get(args.userId);

    if (!user || user.isDeleted) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      status: "active",
      role: args.role,
      approvedAt: now(),
      approvedBy: owner._id,
      updatedAt: now(),
    });
  },
});

export const reject = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await requireOwner(ctx);
    const user = await ctx.db.get(args.userId);

    if (!user || user.isDeleted) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      status: "deactivated",
      updatedAt: now(),
    });
  },
});

export const deactivate = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await requireOwner(ctx);

    if (args.userId === (await getAuthUserId(ctx))) {
      throw new Error("Cannot deactivate your own account");
    }

    const user = await ctx.db.get(args.userId);
    if (!user || user.isDeleted) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      status: "deactivated",
      updatedAt: now(),
    });
  },
});

export const changeRole = mutation({
  args: {
    userId: v.id("users"),
    role: role,
  },
  handler: async (ctx, args) => {
    await requireOwner(ctx);
    const user = await ctx.db.get(args.userId);

    if (!user || user.isDeleted) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      role: args.role,
      updatedAt: now(),
    });
  },
});
