import type { Metadata } from "next";
import { CheckCircle, Shield, Sparkles, Sun, ArrowRight } from "lucide-react";
import { listProducts } from "@/lib/wc";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ProductGrid } from "@/components/product-grid";
import { Cta } from "@/components/sections/cta";

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Solarii Profesionale ULTRASUN",
  description:
    "Solarii Ultrasun pentru bronzare profesională. Tehnologie certificată european, bronz uniform în câteva minute, confort maxim pentru clienți.",
  alternates: { canonical: `${SITE_URL}/bronzare` },
};

const ULTRASUN_CATEGORY_ID = 79;

const BENEFITS = [
  {
    icon: Sun,
    title: "Bronz rapid și uniform",
    text: "Tuburi UV de înaltă performanță pentru un bronz impecabil în doar câteva minute.",
  },
  {
    icon: Shield,
    title: "Siguranță și control UV",
    text: "Tehnologie cu expunere controlată care respectă standardele europene.",
  },
  {
    icon: Sparkles,
    title: "Confort premium",
    text: "Opțiuni de aromaterapie, muzică și răcire pentru experiența perfectă.",
  },
];

const FEATURES = [
  "Tehnologie avansată pentru bronz natural de lungă durată",
  "Sesiuni rapide, rezultate vizibile după prima utilizare",
  "Echipamente certificate la standarde europene",
  "Confort maxim cu opțiuni premium de relaxare",
];

export default async function BronzarePage() {
  const { items: products } = await listProducts({
    category: String(ULTRASUN_CATEGORY_ID),
    per_page: 12,
    orderby: "popularity",
    order: "desc",
  }).catch(() => ({ items: [] }));

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Solarii Profesionale ULTRASUN"
          title="Bronz perfect. Îngrijire premium."
          description="Cu solariile Ultrasun aducem tehnologia de top în bronzare artificială direct în salonul tău. Performanță, siguranță și eficiență pentru un bronz uniform și sănătos, indiferent de sezon."
          breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Bronzare" }]}
        >
          <ul className="space-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-slate-700">
                <CheckCircle
                  size={18}
                  className="text-pink-600 mt-0.5 flex-shrink-0"
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </PageHero>

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {products.length > 0 && (
          <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    Gama ULTRASUN
                  </h2>
                  <p className="text-slate-600 mt-2">
                    {products.length}{" "}
                    {products.length === 1 ? "model disponibil" : "modele disponibile"}{" "}
                    — orizontale, verticale și duo
                  </p>
                </div>
                <a
                  href={`/echipamente?category=${ULTRASUN_CATEGORY_ID}`}
                  className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-pink-600 transition-colors group"
                >
                  Vezi toate solariile
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>

              <ProductGrid products={products} />
            </div>
          </section>
        )}

        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
