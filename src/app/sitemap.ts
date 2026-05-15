import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { listProducts } from "@/lib/wc";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/echipamente", priority: 0.9, changeFrequency: "daily" },
  { path: "/epilare", priority: 0.8, changeFrequency: "weekly" },
  { path: "/bronzare", priority: 0.8, changeFrequency: "weekly" },
  { path: "/calculator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/finantare", priority: 0.7, changeFrequency: "monthly" },
  { path: "/training", priority: 0.7, changeFrequency: "monthly" },
  { path: "/service", priority: 0.6, changeFrequency: "monthly" },
  { path: "/despre", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/termeni", priority: 0.3, changeFrequency: "yearly" },
  { path: "/confidentialitate", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const all: MetadataRoute.Sitemap = [];
    let page = 1;
    while (true) {
      const { items, totalPages } = await listProducts({
        per_page: 100,
        page,
        orderby: "date",
        order: "desc",
      });
      for (const p of items) {
        all.push({
          url: `${SITE_URL}/echipamente/${p.slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
      if (page >= totalPages || items.length === 0) break;
      page += 1;
      if (page > 20) break;
    }
    productEntries = all;
  } catch (error) {
    console.error("Sitemap: failed to fetch products", error);
  }

  return [...staticEntries, ...productEntries];
}
