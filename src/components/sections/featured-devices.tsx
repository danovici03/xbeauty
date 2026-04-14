import Image from "next/image";
import { Award, ArrowRight, ChevronRight } from "lucide-react";
import { listProducts } from "@/lib/wc";
import { FALLBACK_DEVICES } from "@/lib/site-data";

type DeviceCard = {
  id: number | string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
};

async function getFeaturedDevices(): Promise<DeviceCard[]> {
  if (!process.env.WORDPRESS_URL || !process.env.WC_CONSUMER_KEY) {
    return FALLBACK_DEVICES;
  }
  try {
    const { items } = await listProducts({ featured: true, per_page: 3 });
    if (items.length === 0) return FALLBACK_DEVICES;
    return items.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.categories[0]?.name ?? "Echipament",
      description: stripTags(p.short_description) || stripTags(p.description),
      image: p.images[0]?.src ?? FALLBACK_DEVICES[0].image,
    }));
  } catch (error) {
    console.error("Failed to fetch featured products, using fallback:", error);
    return FALLBACK_DEVICES;
  }
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function FeaturedDevices() {
  const devices = await getFeaturedDevices();

  return (
    <section id="devices" className="py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
              <Award size={16} /> Cel Mai Bun Portofoliu
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Descoperă Echipamentele Noastre.
            </h3>
          </div>
          <a
            href="#devices"
            className="flex items-center gap-2 text-slate-900 font-bold hover:text-pink-600 transition-colors group"
          >
            Vezi Toate Echipamentele{" "}
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {devices.map((device) => (
            <a
              key={device.id}
              href={`/echipamente/${device.slug}`}
              className="group relative flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] bg-gradient-to-b from-white to-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-200 transition-all duration-500 overflow-hidden mb-6 hover:-translate-y-1.5">
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                  <span className="text-xs font-bold tracking-widest uppercase text-pink-600 bg-white/90 backdrop-blur-md border border-pink-100 px-4 py-2 rounded-full shadow-sm">
                    {device.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-pink-600 transition-all shadow-sm border border-slate-100 group-hover:border-pink-600">
                    <ArrowRight
                      size={18}
                      className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 p-12 pt-24 flex items-center justify-center">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={device.image}
                      alt={device.name}
                      fill
                      sizes="(min-width: 1024px) 28rem, (min-width: 768px) 50vw, 100vw"
                      className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    />
                  </div>
                </div>
              </div>

              <div className="px-2 text-center md:text-left flex flex-col md:items-start items-center">
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-pink-600 transition-colors">
                  {device.name}
                </h4>
                <p className="text-slate-500 text-lg leading-relaxed mb-4 line-clamp-2">
                  {device.description}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 border-b-2 border-transparent group-hover:border-pink-500 pb-0.5 transition-all">
                  Vezi Detalii{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
