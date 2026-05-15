import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Users,
  Building2,
  Stethoscope,
  Sparkles,
  Wallet,
  GraduationCap,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/site-url";
import { COMPANY_INFO } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Despre XBeauty",
  description:
    "Distribuitor român de echipamente estetice profesionale: epilare laser, solarii, microneedling, remodelare. Training și suport tehnic incluse.",
  alternates: { canonical: `${SITE_URL}/despre` },
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Portofoliu certificat CE",
    description:
      "Lucrăm doar cu producători verificați, cu marcaj CE și documentație tehnică completă. Fiecare aparat ajunge cu garanție extinsă.",
  },
  {
    icon: GraduationCap,
    title: "Training certificat inclus",
    description:
      "Trainerii noștri instalează aparatul la clinică și pregătesc echipa pentru protocoale clinice și operaționale — încă din prima zi.",
  },
  {
    icon: Wallet,
    title: "Finanțare adaptată cash-flow",
    description:
      "Leasing operațional sau financiar, rate până la 60 luni. Documentația o gestionăm noi, aprobarea vine rapid.",
  },
  {
    icon: Sparkles,
    title: "Suport tehnic în 48h",
    description:
      "Echipă tehnică dedicată, piese pe stoc și intervenție garantată în 48h ca să nu pierzi programări.",
  },
];

const AUDIENCES = [
  {
    icon: Stethoscope,
    title: "Clinici medicale și dermatologie",
    description:
      "Echipamente cu validare clinică și protocoale pentru proceduri minim-invazive.",
  },
  {
    icon: Building2,
    title: "Clinici estetice & medspa",
    description:
      "Portofoliu complet pentru rejuvenare, remodelare corporală și tratamente combinate.",
  },
  {
    icon: Users,
    title: "Saloane de înfrumusețare",
    description:
      "Soluții accesibile pentru epilare definitivă, bronzare profesională și manichiură.",
  },
];

export default function DesprePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Despre XBeauty"
          title="Echipăm clinici care vor să crească."
          description={
            <>
              {COMPANY_INFO.legalName} este distribuitor român de echipamente
              estetice profesionale. Lucrăm direct cu clinici medicale, estetice
              și saloane de înfrumusețare — de la consultanță și finanțare până
              la training și service.
            </>
          }
          breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Despre" }]}
        />

        <section className="py-16 md:py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                <Award size={16} /> De ce XBeauty
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Patru piloni care fac diferența.
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PILLARS.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-slate-100 bg-white p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow"
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                <Users size={16} /> Pentru cine lucrăm
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Selecții potrivite pentru fiecare tip de business.
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AUDIENCES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-3xl bg-white border border-slate-100 p-7 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                    {title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Hai să discutăm despre clinica ta.
            </h2>
            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
              30 de minute, fără obligații. Identificăm echipamentul potrivit
              pentru bugetul și obiectivele tale.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-pink-600/25"
            >
              Solicită ofertă
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
