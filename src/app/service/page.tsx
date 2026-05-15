import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Clock,
  Wrench,
  Phone,
  Mail,
  PackageCheck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/site-url";
import { COMPANY_INFO } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Service & suport tehnic",
  description:
    "Garanție de intervenție în 48h, mentenanță preventivă, piese pe stoc și echipă tehnică dedicată pentru echipamentele estetice XBeauty.",
  alternates: { canonical: `${SITE_URL}/service` },
};

const COVERAGE = [
  {
    icon: ShieldCheck,
    title: "Garanție în 48h",
    description:
      "În perioada de garanție, intervenim la clinică sau remote în maxim 48h lucrătoare de la sesizare.",
  },
  {
    icon: Wrench,
    title: "Mentenanță preventivă",
    description:
      "Revizii periodice, calibrare, verificare componente — programate ca să nu te oprești niciodată.",
  },
  {
    icon: PackageCheck,
    title: "Piese pe stoc",
    description:
      "Componentele critice (filtre, mânere, optici) sunt disponibile rapid din stocul nostru.",
  },
  {
    icon: Sparkles,
    title: "Upgrade & consumabile",
    description:
      "Filtre originale, soluții de răcire, capete de tratament — comanzi direct de la noi.",
  },
];

const STEPS = [
  "Ne contactezi prin telefon, email sau formular cu descrierea problemei.",
  "Un tehnician sună înapoi în 4h lucrătoare pentru diagnostic preliminar.",
  "Programăm intervenția: remote, la clinică sau în service-ul nostru.",
  "Repunem echipamentul în funcțiune și-ți trimitem raport tehnic.",
];

export default function ServicePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Service & suport tehnic"
          title="Echipamentul tău nu așteaptă. Nici noi."
          description="Echipă tehnică dedicată, piese pe stoc și garanție de intervenție în 48h ca să-ți menținem agenda plină."
          breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Service" }]}
        />

        <section className="py-16 md:py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="md:col-span-2 rounded-3xl bg-slate-900 text-white p-8 md:p-10 flex flex-col justify-between">
                <Clock size={36} className="text-pink-400 mb-6" />
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                    48h SLA garantat
                  </h3>
                  <p className="text-slate-300 leading-relaxed max-w-md">
                    Pentru echipamentele aflate în garanție sau cu contract de
                    mentenanță, ne angajăm să intervenim în maxim 48h
                    lucrătoare. Remote sau la clinică.
                  </p>
                </div>
              </div>
              <div className="rounded-3xl bg-pink-600 text-white p-8 flex flex-col justify-between">
                <Shield size={36} className="mb-6" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Echipă dedicată</h3>
                  <p className="text-pink-100 text-sm leading-relaxed">
                    Tehnicieni instruiți de producători, cu acces direct la
                    documentația tehnică și piesele originale.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COVERAGE.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-slate-100 bg-white p-7 md:p-8 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    {title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4">
                Cum solicit suport
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Patru pași simpli.
              </h3>
            </div>
            <ol className="space-y-4">
              {STEPS.map((step, idx) => (
                <li
                  key={step}
                  className="flex gap-5 rounded-3xl bg-white border border-slate-100 p-6 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-20 bg-slate-950 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ai nevoie de suport tehnic?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 bg-pink-600 hover:bg-pink-500 text-white px-7 py-4 rounded-full font-semibold transition-all"
              >
                <Phone size={18} /> {COMPANY_INFO.phone}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Solicitare%20suport%20tehnic`}
                className="inline-flex items-center gap-3 border border-white/30 hover:bg-white/10 text-white px-7 py-4 rounded-full font-semibold transition-all"
              >
                <Mail size={18} /> {COMPANY_INFO.email}
              </a>
              <Link
                href="/contact?subiect=Solicitare+suport+tehnic"
                className="inline-flex items-center gap-3 border border-white/30 hover:bg-white/10 text-white px-7 py-4 rounded-full font-semibold transition-all"
              >
                Formular
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
