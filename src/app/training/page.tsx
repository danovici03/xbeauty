import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Stethoscope,
  Sparkles,
  ScrollText,
  RefreshCw,
  MapPin,
  Laptop,
  Award,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Academie XBeauty — Training pentru echipa ta",
  description:
    "Training clinic și operațional certificat la fiecare achiziție. Instalare la clinică, protocoale, refresh anual și certificate pentru echipa ta.",
  alternates: { canonical: `${SITE_URL}/training` },
};

const INCLUDED = [
  {
    icon: MapPin,
    title: "Instalare la clinică",
    description:
      "Tehnicianul nostru montează echipamentul, configurează parametrii și verifică totul înainte de prima procedură.",
  },
  {
    icon: Stethoscope,
    title: "Training clinic",
    description:
      "Sesiuni teoretice și hands-on cu pacient model: indicații, contraindicații, parametri per fototip și tip de piele.",
  },
  {
    icon: ScrollText,
    title: "Protocoale standardizate",
    description:
      "Manuale per procedură, fișe de consimțământ informat și check-list-uri pentru echipa ta.",
  },
  {
    icon: RefreshCw,
    title: "Refresh la 12 luni",
    description:
      "O sesiune anuală de update — protocoale noi, ce funcționează mai bine, întrebări din practică.",
  },
];

const FORMATS = [
  {
    icon: MapPin,
    title: "La clinica ta",
    description:
      "Trainerul vine la sediu, lucrează cu pacienții tăi reali. Recomandat la instalare.",
  },
  {
    icon: Sparkles,
    title: "La sediul XBeauty",
    description:
      "Pentru sesiuni cu mai multe clinici, în Bistrița. Echipament configurat, pacient model.",
  },
  {
    icon: Laptop,
    title: "Online (refresh)",
    description:
      "Sesiuni live pe Zoom pentru actualizări de protocol și Q&A — fără să întrerupi programul.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Academie XBeauty"
          title="Echipa ta, gata să livreze din prima zi."
          description="Training clinic și operațional certificat la fiecare achiziție. Trainerii noștri lucrează cu echipa ta până când totul rulează fluid."
          breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Training" }]}
        />

        <section className="py-16 md:py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                <GraduationCap size={16} /> Ce include training-ul
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Tot ce-i trebuie echipei ca să devină autonomă.
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INCLUDED.map(({ icon: Icon, title, description }) => (
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
              <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4">
                Formate disponibile
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Adaptăm formatul după programul tău.
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FORMATS.map(({ icon: Icon, title, description }) => (
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

        <section className="py-16 md:py-20 bg-slate-950 text-white border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Award size={48} className="text-pink-400 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Certificat la finalul cursului
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Fiecare participant primește un certificat de absolvire — util
              pentru autorizație, pentru CV-uri și pentru a demonstra pacienților
              că echipa e instruită oficial.
            </p>
          </div>
        </section>

        <section className="py-20 bg-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Vrei detalii despre un training anume?
            </h2>
            <p className="text-pink-100 mb-8 text-lg leading-relaxed">
              Spune-ne ce echipament te interesează și-ți trimitem programa
              completă + datele disponibile.
            </p>
            <Link
              href="/contact?subiect=Solicit+detalii+training"
              className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:-translate-y-0.5"
            >
              Solicită programa training
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
