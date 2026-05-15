import type { Metadata } from "next";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";

import { SITE_URL } from "@/lib/site-url";
import { COMPANY_INFO } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează echipa XBeauty pentru oferte, consultanță sau demonstrații la clinica ta.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Hai să discutăm."
          description="Echipa XBeauty îți răspunde în 24h lucrătoare. Pentru programări urgente sau demonstrații la clinica ta, sună direct."
          breadcrumbs={[{ label: "Acasă", href: "/" }, { label: "Contact" }]}
        />

        <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2">
                  Trimite-ne un mesaj
                </h2>
                <p className="text-slate-600 mb-8">
                  Completează formularul și îți răspundem cât de curând posibil.
                </p>
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-pink-600 mb-6">
                  Coordonate directe
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-slate-900 font-semibold hover:text-pink-600 transition-colors break-all"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Telefon
                      </p>
                      <a
                        href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                        className="text-slate-900 font-semibold hover:text-pink-600 transition-colors"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Adresă
                      </p>
                      <p className="text-slate-900 font-medium">
                        {COMPANY_INFO.addressLines.join(", ")}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Building2 size={18} />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-pink-400">
                    Date companie
                  </h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  XBeauty este marcă a{" "}
                  <span className="text-white font-semibold">
                    {COMPANY_INFO.legalName}
                  </span>
                  , distribuitor de echipamente profesionale destinate saloanelor
                  de înfrumusețare.
                </p>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">C.U.I.</dt>
                    <dd className="text-white font-medium">{COMPANY_INFO.cui}</dd>
                  </div>
                  {COMPANY_INFO.regCom ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-400">Reg. Com.</dt>
                      <dd className="text-white font-medium">{COMPANY_INFO.regCom}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
