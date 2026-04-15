import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate și Cookies",
  description:
    "Politica de confidențialitate, protecția datelor și utilizarea cookies pe xbeauty.ro.",
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Confidențialitate și cookies"
          description="Cum colectăm, folosim și protejăm datele tale personale pe xbeauty.ro."
          breadcrumbs={[
            { label: "Acasă", href: "/" },
            { label: "Confidențialitate" },
          ]}
        />

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
            <h2>1. Operatorul datelor</h2>
            <p>
              S.C. English Beauty House S.R.L., cu sediul în Bistrița, str.
              Petre Ispirescu nr. 21, jud. Bistrița-Năsăud, C.U.I. 49960236,
              distribuitor al echipamentelor XBeauty, este operator de date
              personale conform Regulamentului UE 2016/679 (GDPR).
            </p>

            <h2>2. Ce date colectăm</h2>
            <ul>
              <li>
                <strong>Date de contact</strong> (nume, email, telefon) — când
                completezi un formular sau ne scrii
              </li>
              <li>
                <strong>Date de navigare</strong> (pagini vizitate, timp petrecut)
                — prin cookies analitice, doar cu acordul tău
              </li>
              <li>
                <strong>Date tehnice</strong> (adresă IP, browser) — pentru
                securitate și statistici agregate
              </li>
            </ul>

            <h2>3. Cookies</h2>
            <p>
              Folosim două categorii de cookies:
            </p>
            <ul>
              <li>
                <strong>Esențiale</strong> — necesare pentru funcționarea
                site-ului (sesiune, preferințe). Nu pot fi dezactivate.
              </li>
              <li>
                <strong>Analitice și marketing</strong> — ne ajută să înțelegem
                cum e folosit site-ul. Le activezi/dezactivezi din banner.
              </li>
            </ul>
            <p>
              Alegerea ta este stocată local (localStorage) și respectată la
              fiecare vizită.
            </p>

            <h2>4. Cum folosim datele</h2>
            <ul>
              <li>Pentru a răspunde la solicitările tale de ofertă sau contact</li>
              <li>Pentru a-ți trimite informații despre produse (doar cu consimțământ)</li>
              <li>Pentru a îmbunătăți site-ul pe baza datelor agregate de navigare</li>
            </ul>

            <h2>5. Cine primește datele</h2>
            <p>
              Datele personale nu sunt vândute. Pot fi procesate de furnizori de
              servicii (găzduire, email, analytics) care au semnat acorduri de
              prelucrare și respectă GDPR.
            </p>

            <h2>6. Drepturile tale</h2>
            <p>Ai dreptul să:</p>
            <ul>
              <li>Soliciți accesul la datele tale</li>
              <li>Corectezi date inexacte</li>
              <li>Ștergi datele (dreptul de a fi uitat)</li>
              <li>Limitezi prelucrarea</li>
              <li>Te opui prelucrării</li>
              <li>Portezi datele către alt operator</li>
            </ul>
            <p>
              Contactează-ne la{" "}
              <a href="mailto:marketing@xbeauty.ro">marketing@xbeauty.ro</a>{" "}
              pentru orice solicitare.
            </p>

            <h2>7. Reținerea datelor</h2>
            <p>
              Păstrăm datele doar atât timp cât e necesar scopurilor declarate
              sau cât impune legea. Cererile de ofertă sunt arhivate maxim 24
              luni.
            </p>

            <h2>8. Modificări</h2>
            <p>
              Putem actualiza această politică. Ultima revizuire:{" "}
              {new Date().toLocaleDateString("ro-RO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              .
            </p>

            <h2>9. Plângeri</h2>
            <p>
              Poți depune plângere la Autoritatea Națională de Supraveghere a
              Prelucrării Datelor cu Caracter Personal (ANSPDCP):{" "}
              <a
                href="https://www.dataprotection.ro"
                target="_blank"
                rel="noopener noreferrer"
              >
                dataprotection.ro
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
