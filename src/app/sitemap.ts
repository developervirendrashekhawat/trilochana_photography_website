import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(process.env.VERCEL_GIT_COMMIT_DATE || "2026-11-24");
  return [
    { url: new URL("/", site.url).toString(), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: new URL("/services", site.url).toString(), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: new URL(`/services/${s.slug}`, site.url).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
