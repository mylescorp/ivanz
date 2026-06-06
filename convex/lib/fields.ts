import { v } from "convex/values";

export const timestamps = {
  createdAt: v.number(),
  updatedAt: v.number(),
  isDeleted: v.boolean(),
};

export const role = v.union(
  v.literal("owner"),
  v.literal("manager"),
  v.literal("editor"),
  v.literal("viewer"),
);

export const userStatus = v.union(
  v.literal("pending"),
  v.literal("active"),
  v.literal("deactivated"),
);

export const inquiryStatus = v.union(
  v.literal("new"),
  v.literal("read"),
  v.literal("archived"),
);

export const publishStatus = v.union(
  v.literal("draft"),
  v.literal("published"),
);

export const portfolioCategory = v.union(
  v.literal("road-construction"),
  v.literal("building-design"),
  v.literal("land-survey"),
  v.literal("drainage"),
  v.literal("soil-testing"),
  v.literal("structural"),
  v.literal("project-management"),
);

export const projectImage = v.object({
  src: v.string(),
  alt: v.string(),
});
