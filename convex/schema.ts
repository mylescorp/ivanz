import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const role = v.union(
  v.literal("owner"),
  v.literal("manager"),
  v.literal("editor"),
  v.literal("viewer"),
);

const userStatus = v.union(
  v.literal("pending"),
  v.literal("active"),
  v.literal("deactivated"),
);

const inquiryStatus = v.union(
  v.literal("new"),
  v.literal("read"),
  v.literal("archived"),
);

const publishStatus = v.union(
  v.literal("draft"),
  v.literal("published"),
);

/**
 * Schema shell — Phase 0.
 * Full field definitions and Convex functions ship in Phases 1–3.
 */
export default defineSchema({
  users: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    email: v.string(),
    name: v.optional(v.string()),
    role,
    status: userStatus,
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  inquiries: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    name: v.string(),
    phone: v.string(),
    country: v.string(),
    service: v.string(),
    status: inquiryStatus,
    email: v.optional(v.string()),
    company: v.optional(v.string()),
    location: v.optional(v.string()),
    scale: v.optional(v.string()),
    budget: v.optional(v.string()),
    urgency: v.optional(v.string()),
    notes: v.optional(v.string()),
    source: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  projects: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    title: v.string(),
    slug: v.string(),
    status: publishStatus,
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  services: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    title: v.string(),
    slug: v.string(),
    sortOrder: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_createdAt", ["createdAt"]),

  team_members: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    name: v.string(),
    role: v.string(),
    sortOrder: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  testimonials: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    author: v.string(),
    quote: v.string(),
    isApproved: v.boolean(),
  })
    .index("by_isApproved", ["isApproved"])
    .index("by_createdAt", ["createdAt"]),

  blog_posts: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    title: v.string(),
    slug: v.string(),
    status: publishStatus,
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  gallery_items: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    storageId: v.id("_storage"),
    caption: v.optional(v.string()),
  }).index("by_createdAt", ["createdAt"]),

  site_settings: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
});
