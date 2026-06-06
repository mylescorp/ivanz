import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { projects } from "@/lib/data/projects";

const routes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/estimator",
  "/contact",
  "/faq",
  "/downloads",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
