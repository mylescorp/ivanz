import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import {
  inquiryStatus,
  portfolioCategory,
  projectImage,
  publishStatus,
  role,
  userStatus,
} from "./lib/fields";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(role),
    status: v.optional(userStatus),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    isDeleted: v.optional(v.boolean()),
    approvedAt: v.optional(v.number()),
    approvedBy: v.optional(v.id("users")),
  })
    .index("email", ["email"])
    .index("phone", ["phone"])
    .index("by_role", ["role"])
    .index("by_status", ["status"]),

  inquiries: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    name: v.string(),
    dialCode: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    company: v.optional(v.string()),
    country: v.string(),
    service: v.string(),
    location: v.optional(v.string()),
    scale: v.optional(v.string()),
    budget: v.optional(v.string()),
    urgency: v.optional(v.string()),
    notes: v.optional(v.string()),
    source: v.optional(v.string()),
    status: inquiryStatus,
    readAt: v.optional(v.number()),
    archivedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"])
    .index("by_status_createdAt", ["status", "createdAt"]),

  projects: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    title: v.string(),
    slug: v.string(),
    category: portfolioCategory,
    location: v.string(),
    completedDate: v.string(),
    scope: v.string(),
    summary: v.string(),
    description: v.string(),
    highlights: v.array(v.string()),
    images: v.array(projectImage),
    status: publishStatus,
    publishedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_createdAt", ["createdAt"]),

  services: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    slug: v.string(),
    title: v.string(),
    shortTitle: v.string(),
    icon: v.string(),
    description: v.string(),
    metaDescription: v.string(),
    features: v.array(v.string()),
    overview: v.array(v.string()),
    sortOrder: v.number(),
    status: publishStatus,
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_sortOrder", ["sortOrder"])
    .index("by_createdAt", ["createdAt"]),

  team_members: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    name: v.string(),
    title: v.string(),
    bio: v.optional(v.string()),
    photoStorageId: v.optional(v.id("_storage")),
    sortOrder: v.number(),
    status: publishStatus,
  })
    .index("by_status", ["status"])
    .index("by_sortOrder", ["sortOrder"])
    .index("by_createdAt", ["createdAt"]),

  testimonials: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    author: v.string(),
    role: v.optional(v.string()),
    quote: v.string(),
    isApproved: v.boolean(),
    approvedAt: v.optional(v.number()),
  })
    .index("by_isApproved", ["isApproved"])
    .index("by_createdAt", ["createdAt"]),

  blog_posts: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    body: v.string(),
    authorName: v.optional(v.string()),
    coverStorageId: v.optional(v.id("_storage")),
    status: publishStatus,
    publishedAt: v.optional(v.number()),
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
    category: v.optional(portfolioCategory),
    sortOrder: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_sortOrder", ["sortOrder"])
    .index("by_createdAt", ["createdAt"]),

  site_settings: defineTable({
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
    key: v.string(),
    value: v.string(),
    updatedBy: v.optional(v.id("users")),
  }).index("by_key", ["key"]),
});
