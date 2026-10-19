import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { universes } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    ...universes.map((u) => page(`/${u.slug}`, 0.9)),
    page("/body-360", 0.9),
    page("/reserver", 0.8),
    page("/actualites", 0.6, "weekly"),
    page("/expertise", 0.6),
    page("/contact", 0.6),
    ...["/mentions-legales", "/confidentialite", "/conditions", "/cookies"].map((p) => page(p, 0.2, "yearly")),
  ];
}
