import type { Metadata } from "next";
import { CheckCircle, Shield, Zap, Award, ArrowRight } from "lucide-react";
import { listProducts } from "@/lib/wc";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ProductGrid } from "@/components/product-grid";
import { Cta } from "@/components/sections/cta";

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Aparate Profesionale pentru Epilare cu Laser Diodă",
  description:
    "Gamă completă de aparate de epilare cu laser diodă. Potrivite pentru toate tipurile de piele (Fitzpatrick I-VI), sistem avansat de răcire, tehnologie multi-lungime de undă.",
  alternates: { canonical: `${SITE_URL}/epilare` },
};

const EPILARE_CATEGORY_ID = 52;

const BENEFITS = [
  {
    icon: Shield,
    title: "Siguranță și precizie",
    text: "Tehnologia laser acționează direct asupra foliculilor de păr fără a afecta pielea înconjurătoare.",
  },
  {
    icon: Zap,
    title: "Eficiență dovedită clinic",
    text: "Elimină părul de la rădăcină, reducând creșterea acestuia sesiune după sesiune.",
  },
  {
    icon: Award,
    title: "Durabilitate extinsă",
    text: "Peste 100 de milioane de impulsuri — investiție care aduce profit ani de zile.",
  },
];

const FEATURES = [
  "Potrivite pentru toate tipurile de piele (Fitzpatrick I-VI)",
  "Sistem avansat de răcire pentru confort maxim",
  "Tehnologie multi-lungime de undă pentru eficiență sporită",
  "Durată de viață extinsă — peste 100 de milioane de impulsuri",
];

export default async function EpilarePage() {
  const { items: products } = await listProducts({
    category: String(EPILARE_CATEGORY_ID),
    per_page: 12,
    orderby: "popularity",
    order: "desc",
  }).catch(() => ({ items: [] }));

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Epilare Laser Diodă"
          title="Tehnologie de epilare care aduce rezultate definitive."
          description="Oferă clienților tăi servicii sigure, rapide și confortabile. Gama XBeauty de aparate cu laser diodă folosește cele mai noi tehnologii pentru eficiență maximă."
          breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Epilare" }]}
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
                    Aparate de epilare disponibile
                  </h2>
                  <p className="text-slate-600 mt-2">
                    {products.length}{" "}
                    {products.length === 1 ? "model" : "modele"} pentru saloane
                    și clinici profesionale
                  </p>
                </div>
                <a
                  href={`/echipamente?category=${EPILARE_CATEGORY_ID}`}
                  className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-pink-600 transition-colors group"
                >
                  Vezi toate aparatele
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

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              De ce laser diodă?
            </h2>
            <div className="prose prose-slate max-w-none prose-lg">
              <p>
                Laserul diodă e considerat standardul de aur al epilării
                profesionale. Lungimea de undă (de obicei 755, 808 și 1064 nm)
                penetrează pielea la adâncimea exactă unde se află foliculul și
                melanina din bulbul pilos, distrugând capacitatea de regenerare
                a firului de păr fără a afecta țesutul înconjurător.
              </p>
              <p>
                Față de IPL sau alexandrit clasic, laserul diodă tratează în
                siguranță toate fototipurile (inclusiv pielea bronzată sau
                închisă la culoare) și este semnificativ mai rapid — un spate
                complet se tratează în 15-20 de minute, cu un nivel de disconfort
                redus datorită sistemului de răcire integrat.
              </p>
              <p>
                Toate aparatele XBeauty vin cu instructaj complet, suport
                tehnic cu intervenție în 48h și kituri de marketing pentru
                lansarea serviciului în clinica ta.
              </p>
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
