import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ProfitabilityCalculator } from "@/components/profitability-calculator";
import { Cta } from "@/components/sections/cta";

import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Calculator Profitabilitate",
  description:
    "Estimează profitul lunar și perioada de recuperare a investiției pentru echipamentele XBeauty. Calcul bazat pe experiența reală din saloane.",
  alternates: { canonical: `${SITE_URL}/calculator` },
};

export default function CalculatorPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Calculator ROI"
          title="Cât profit îți aduce echipamentul tău?"
          description="Calcul orientativ de profitabilitate bazat pe experiența salonului English Beauty House. Modifică parametrii și vezi instant cât câștigi și în cât timp îți recuperezi investiția."
          breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Calculator" }]}
        />

        <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProfitabilityCalculator />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Cum funcționează calculul?
            </h2>
            <div className="prose prose-slate max-w-none prose-lg">
              <p>
                Formula pornește de la volumul de ședințe realizabile într-o lună
                (zile × ședințe/zi × ~4,33 săptămâni) și deduce cheltuielile
                variabile cu consumabile. Restul reprezintă profit brut — din
                care trebuie să acoperi chirie, salarii, marketing și taxe.
              </p>
              <p>
                Perioada de recuperare a investiției este raportul dintre
                prețul echipamentului și profitul lunar. În practică, cele mai
                bune saloane ating recuperarea în 3-6 luni prin marketing bine
                direcționat și pachete de tratamente.
              </p>
              <p>
                Vrei un calcul personalizat pentru locația ta?{" "}
                <a
                  href="mailto:marketing@xbeauty.ro"
                  className="text-pink-600 font-semibold hover:text-pink-500"
                >
                  Scrie-ne
                </a>{" "}
                și îți pregătim un business plan adaptat.
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
