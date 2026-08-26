import type { MetadataRoute } from "next";
import { listings } from "@/lib/data/items";
import { categories } from "@/lib/data/categories";

const staticRoutes = [
  "",
  "/items",
  "/how-it-works",
  "/give-an-item",
  "/safety",
  "/fees-refunds",
  "/help",
  "/privacy",
  "/terms",
  "/sign-in",
  "/sign-up",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://givenitems.org";

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...categories.map((c) => ({
      url: `${base}/categories/${c.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
    ...listings
      .filter((l) => l.status === "available" || l.status === "reserved")
      .map((l) => ({
        url: `${base}/items/${l.slug}`,
        changeFrequency: "daily" as const,
        priority: 0.5,
      })),
  ];
}
