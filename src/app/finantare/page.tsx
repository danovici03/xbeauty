import type { Metadata } from "next";
import Link from "next/link";
import {
  Wallet,
  Briefcase,
  Calendar,
  CheckCircle2,
  FileText,
  Banknote,
  TrendingUp,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Finanțare echipamente estetice",
  description:
    "Leasing operațional, leasing financiar sau rate până la 60 luni. Documentația o gestionăm noi, aprobarea vine rapid.",
  alternates: { canonical: `${SITE_URL}/finantare` },
};

const OPTIONS = [
  {
    icon: Briefcase,
    title: "Achiziție directă",
    description:
      "Plată integrală cu factură. Recomandat când vrei ownership imediat și amortizare clasică.",
    bullets: ["Garanție extinsă", "TVA deductibil", "Discount cash"],
  },
  {
    icon: Wallet,
    title: "Leasing operațional",
    description:
      "Folosești echipamentul cu rate lunare deductibile fiscal. La final alegi: cumperi, returnezi sau upgradezi.",
    bullets: ["Rată complet deductibilă", "Upgrade la 36-48 luni", "Fără impact bilanț"],
  },
  {
    icon: Banknote,
    title: "Leasing financiar",
    description:
      "Cumperi echipamentul în rate, devii proprietar din ziua întâi, dobândă deductibilă fiscal.",
    bullets: ["Avans flexibil", "Rate până la 60 luni", "Devine proprietate"],
  },
];

const STEPS = [
  {
    icon: CheckCircle2,
    title: "Alegem echipamentul potrivit",
    description:
      "Pornim de la tipul de clinică, programări estimate și obiective. Recomandăm 1-2 variante.",
  },
  {
    icon: TrendingUp,
    title: "Analiză cash-flow & ROI",
    description:
      "Folosim calculatorul nostru de profitabilitate ca să simulăm recuperarea investiției pe baza prețurilor și volumului tău.",
  },
  {
    icon: FileText,
    title: "Aprobare & contract",
    description:
      "Documentația o pregătim împreună cu partenerul de finanțare. Aprobarea în 48-72h pentru dosare standard.",
  },
  {
    icon: Calendar,
    title: "Livrare, instalare, training",
    description:
      "În 7-14 zile lucrătoare instalăm la clinică și facem training-ul echipei. Începi să livrezi proceduri.",
  },
];

export default function FinantarePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Finanțare echipamente"
          title="Investește acum, plătește din profit."
          description="Leasing operațional, leasing financiar sau achiziție directă — alegi varianta care se potrivește cash-flow-ului tău. Documentația o gestionăm noi."
          breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Finanțare" }]}
        />

        <section className="py-16 md:py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                <Wallet size={16} /> Trei variante
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Alege modelul care se potrivește.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OPTIONS.map(({ icon: Icon, title, description, bullets }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-slate-100 bg-white p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    {description}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700 mt-auto">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                <Calendar size={16} /> Cum funcționează
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                De la primul mesaj la prima procedură: 2-3 săptămâni.
              </h3>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STEPS.map(({ icon: Icon, title, description }, idx) => (
                <li
                  key={title}
                  className="rounded-3xl bg-white border border-slate-100 p-7 shadow-sm flex gap-5"
                >
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <Icon size={18} className="text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                      {title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 bg-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Vrei o simulare pe cifrele tale?
            </h2>
            <p className="text-pink-100 mb-8 text-lg leading-relaxed">
              30 de minute la telefon. Îți facem o estimare de rată lunară și
              ROI pentru echipamentul ales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?subiect=Solicit+simulare+finan%C8%9Bare"
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:-translate-y-0.5"
              >
                Solicită simulare
              </Link>
              <Link
                href="/calculator"
                className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all"
              >
                Calculator ROI
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
