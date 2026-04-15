import { Award, ChevronRight } from "lucide-react";
import { listProducts } from "@/lib/wc";
import { FALLBACK_DEVICES } from "@/lib/site-data";
import {
  DevicesCarousel,
  type DeviceCard,
  type CategoryPill,
} from "@/components/devices-carousel";

async function getData(): Promise<{
  devices: DeviceCard[];
  categories: CategoryPill[];
}> {
  if (!process.env.WORDPRESS_URL || !process.env.WC_CONSUMER_KEY) {
    return {
      devices: FALLBACK_DEVICES.map((d) => ({ ...d, categoryId: null })),
      categories: [],
    };
  }
  try {
    const { items } = await listProducts({
      per_page: 50,
      orderby: "popularity",
      order: "desc",
    });

    const devices: DeviceCard[] = items.map((p) => {
      const primary = p.categories[p.categories.length - 1];
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: primary?.name ?? "Echipament",
        categoryId: primary?.id ?? null,
        description: stripTags(p.short_description) || stripTags(p.description),
        image: p.images[0]?.src ?? FALLBACK_DEVICES[0].image,
      };
    });

    const seen = new Map<number, CategoryPill>();
    for (const d of devices) {
      if (d.categoryId === null || seen.has(d.categoryId)) continue;
      seen.set(d.categoryId, { id: d.categoryId, name: d.category, count: 0 });
    }
    for (const d of devices) {
      if (d.categoryId === null) continue;
      const pill = seen.get(d.categoryId);
      if (pill) pill.count += 1;
    }
    const categories = Array.from(seen.values()).sort(
      (a, b) => b.count - a.count,
    );

    if (devices.length === 0) {
      return {
        devices: FALLBACK_DEVICES.map((d) => ({ ...d, categoryId: null })),
        categories: [],
      };
    }

    return { devices, categories };
  } catch (error) {
    console.error("Failed to fetch products, using fallback:", error);
    return {
      devices: FALLBACK_DEVICES.map((d) => ({ ...d, categoryId: null })),
      categories: [],
    };
  }
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function FeaturedDevices() {
  const { devices, categories } = await getData();

  return (
    <section
      id="devices"
      className="py-24 bg-slate-50 relative border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
              <Award size={16} /> Cel Mai Bun Portofoliu
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Descoperă Echipamentele Noastre.
            </h3>
          </div>
          <a
            href="/echipamente"
            className="flex items-center gap-2 text-slate-900 font-bold hover:text-pink-600 transition-colors group"
          >
            Vezi Toate Echipamentele{" "}
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <DevicesCarousel devices={devices} categories={categories} />
      </div>
    </section>
  );
}
