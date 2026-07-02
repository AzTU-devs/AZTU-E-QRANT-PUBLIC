import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/api";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600; // rebuild sitemap hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/winners`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/leads`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/announcements`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((p) => ({
      url: `${base}/projects/${p.project_code}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // If the API is unreachable at build time, ship the static routes only.
  }

  return [...staticRoutes, ...projectRoutes];
}
