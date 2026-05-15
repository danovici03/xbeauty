import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SITE_URL } from "@/lib/site-url";
import { COMPANY_INFO } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Termeni și Condiții",
  description:
    "Termenii și condițiile de utilizare a site-ului xbeauty.ro și de vânzare a echipamentelor estetice profesionale XBeauty.",
  alternates: { canonical: `${SITE_URL}/termeni` },
  robots: { index: true, follow: false },
};

const LAST_UPDATED = new Date().toLocaleDateString("ro-RO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Legal"
          title="Termeni și Condiții"
          description="Condițiile de utilizare a site-ului xbeauty.ro și cadrul general de vânzare a echipamentelor profesionale comercializate de XBeauty."
          breadcrumbs={[
            { label: "Acasă", href: "/" },
            { label: "Termeni și condiții" },
          ]}
        />

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg max-w-none">
            <p className="text-sm text-slate-500">
              Ultima actualizare: {LAST_UPDATED}
            </p>

            <h2>1. Părțile</h2>
            <p>
              Site-ul <strong>xbeauty.ro</strong> este administrat de{" "}
              <strong>{COMPANY_INFO.legalName}</strong>, cu sediul în{" "}
              {COMPANY_INFO.addressLines.join(", ")}, C.U.I.{" "}
              {COMPANY_INFO.cui}
              {COMPANY_INFO.regCom
                ? `, înregistrată la Registrul Comerțului sub nr. ${COMPANY_INFO.regCom}`
                : ""}
              , denumită în continuare <em>„XBeauty"</em>, <em>„noi"</em> sau{" "}
              <em>„vânzător"</em>.
            </p>
            <p>
              <em>„Client"</em> sau <em>„utilizator"</em> reprezintă persoana
              fizică autorizată, persoana juridică sau entitatea profesională
              (clinică, cabinet medical, salon, SPA) care accesează site-ul,
              solicită o ofertă sau încheie un contract cu XBeauty.
            </p>

            <h2>2. Obiectul site-ului</h2>
            <p>
              xbeauty.ro este un site de prezentare și generare de cereri de
              ofertă pentru echipamente estetice profesionale (epilare laser,
              solarii, microneedling RF, remodelare corporală, dispozitive
              auxiliare) și servicii conexe: instalare, training certificat,
              service tehnic, mentenanță, finanțare prin parteneri.
            </p>
            <p>
              <strong>Site-ul nu este un magazin online cu finalizare automată
              a comenzilor.</strong> Orice achiziție se concretizează prin
              ofertă scrisă și contract semnat între XBeauty și client.
            </p>

            <h2>3. Public-țintă (B2B)</h2>
            <p>
              Echipamentele comercializate sunt destinate exclusiv utilizării
              profesionale de către operatori autorizați (clinici medicale,
              cabinete dermatologice, saloane și centre de înfrumusețare,
              SPA-uri). Prin solicitarea unei oferte, clientul declară pe
              propria răspundere că deține autorizațiile necesare desfășurării
              activității în care va folosi echipamentul.
            </p>

            <h2>4. Cereri de ofertă și comandă</h2>
            <p>
              Clientul poate solicita o ofertă prin formularele de pe site, prin
              email la{" "}
              <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>{" "}
              sau telefonic la{" "}
              <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}>
                {COMPANY_INFO.phone}
              </a>
              . Răspunsul ofertei se trimite în maxim 24 ore lucrătoare.
            </p>
            <p>
              Oferta devine angajantă doar după acceptarea scrisă (email, fax
              sau document semnat) și semnarea unui contract care detaliază:
              produsul, prețul, condițiile de plată, termenul de livrare,
              garanția, serviciile incluse și modalitatea de soluționare a
              eventualelor neconformități.
            </p>

            <h2>5. Prețuri</h2>
            <p>
              Prețurile prezentate pe site sunt informative și pot suferi
              modificări în funcție de configurație, accesorii, curs valutar și
              campanii. Prețul final este cel din contract. Dacă nu se
              specifică altfel, prețurile sunt exprimate fără TVA.
            </p>

            <h2>6. Plata</h2>
            <p>Modalități acceptate, conform contractului:</p>
            <ul>
              <li>Transfer bancar (factură proformă / avans + diferență)</li>
              <li>
                Leasing financiar sau operațional prin partenerii agreați (vezi
                pagina <Link href="/finantare">Finanțare</Link>)
              </li>
              <li>Achiziție în rate prin parteneri instituționali</li>
            </ul>
            <p>
              Plata se efectuează conform termenelor și instrumentelor stabilite
              în contract. Întârzierile generează penalități de întârziere
              conform clauzelor contractuale, în limitele legale.
            </p>

            <h2>7. Livrare și instalare</h2>
            <p>
              Termenele de livrare se confirmă în contract și depind de
              disponibilitatea pe stoc, configurația comandată și locația
              clientului. Livrarea standard pe teritoriul României se asigură
              prin transport propriu sau curier specializat. Instalarea la
              clinică, punerea în funcțiune și training-ul echipei se realizează
              conform pachetului contractat.
            </p>

            <h2>8. Garanție</h2>
            <p>
              Toate echipamentele beneficiază de garanție comercială oferită de
              XBeauty, conform termenilor specifici fiecărui produs, precum și
              de garanția legală de conformitate prevăzută de legislația
              națională aplicabilă (Legea 449/2003 pentru raporturile B2C,
              respectiv Codul Civil pentru raporturile B2B).
            </p>
            <p>
              Garanția <strong>nu acoperă</strong>: uzura normală, consumabilele
              (filtre, capete, optici), defecțiuni cauzate de utilizare
              improprie, lipsa mentenanței recomandate, modificări sau
              intervenții neautorizate, deteriorări apărute la transport sau
              instalare neefectuate de XBeauty, suprasolicitări, supratensiuni
              sau lipsa împământării.
            </p>

            <h2>9. Returnarea echipamentelor</h2>
            <p>
              <strong>
                Întrucât echipamentele comercializate sunt produse profesionale
                B2B, configurate și/sau personalizate pentru fiecare clinică,
                dreptul de retragere prevăzut de OUG 34/2014 (vânzări la
                distanță către consumatori) nu se aplică.
              </strong>
            </p>
            <p>
              Returnarea în cadrul garanției se face exclusiv pentru produse
              care prezintă neconformități, conform clauzelor de garanție din
              contract și procedurii descrise în secțiunea{" "}
              <Link href="/service">Service & suport</Link>. Procedura include:
              sesizarea scrisă, diagnostic tehnic, încercare de remediere
              (înlocuire piese, reparație, calibrare) și, în ultimă instanță,
              înlocuirea echipamentului.
            </p>

            <h2>10. Răspundere</h2>
            <p>
              XBeauty asigură conformitatea echipamentelor cu specificațiile
              tehnice și legislația aplicabilă în România și UE (marcaj CE,
              documentație tehnică). Clientul este responsabil pentru:
            </p>
            <ul>
              <li>
                obținerea autorizațiilor și avizelor necesare pentru funcționarea
                cabinetului/clinicii și utilizarea echipamentului;
              </li>
              <li>
                respectarea instrucțiunilor de utilizare, a protocoalelor
                clinice și a contraindicațiilor comunicate prin training și
                documentație;
              </li>
              <li>
                instruirea continuă a personalului care operează echipamentul;
              </li>
              <li>asigurarea condițiilor tehnice (alimentare, răcire, spațiu).</li>
            </ul>
            <p>
              XBeauty nu răspunde pentru daune indirecte, pierderi de profit
              sau prejudicii rezultate din utilizarea necorespunzătoare a
              echipamentului, în limitele permise de lege.
            </p>

            <h2>11. Proprietate intelectuală</h2>
            <p>
              Tot conținutul site-ului (texte, imagini, logo-uri, grafică,
              specificații, fotografii) este proprietatea XBeauty sau a
              partenerilor săi și este protejat de legislația privind drepturile
              de autor. Reproducerea sau utilizarea fără acord scris este
              interzisă.
            </p>

            <h2>12. Protecția datelor</h2>
            <p>
              Prelucrarea datelor personale este descrisă detaliat în{" "}
              <Link href="/confidentialitate">Politica de confidențialitate</Link>
              , care face parte integrantă din prezenții termeni.
            </p>

            <h2>13. Soluționarea litigiilor</h2>
            <p>
              Pentru orice nemulțumire, vă rugăm să ne contactați direct la{" "}
              <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>{" "}
              — ne propunem soluționarea amiabilă în maxim 14 zile lucrătoare.
            </p>
            <p>
              Dacă nu se ajunge la o înțelegere, clienții consumatori (în sensul
              legii) pot apela la:
            </p>
            <ul>
              <li>
                <strong>ANPC</strong> — Autoritatea Națională pentru Protecția
                Consumatorilor:{" "}
                <a
                  href="https://anpc.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  anpc.ro
                </a>
              </li>
              <li>
                <strong>SAL</strong> — Soluționarea Alternativă a Litigiilor:{" "}
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  anpc.ro/ce-este-sal
                </a>
              </li>
              <li>
                <strong>SOL</strong> — Platforma europeană de soluționare online
                a litigiilor:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ec.europa.eu/consumers/odr
                </a>
              </li>
            </ul>
            <p>
              Pentru raporturile B2B, litigiile nesoluționate amiabil vor fi
              deduse instanțelor judecătorești competente de la sediul
              vânzătorului, conform legii române.
            </p>

            <h2>14. Forța majoră</h2>
            <p>
              Niciuna dintre părți nu răspunde pentru neîndeplinirea obligațiilor
              cauzată de evenimente de forță majoră (calamități, război, acte
              ale autorităților, întreruperi de transport, pandemii) sau caz
              fortuit, în condițiile prevăzute de Codul Civil.
            </p>

            <h2>15. Modificarea termenilor</h2>
            <p>
              XBeauty își rezervă dreptul de a modifica acești termeni. Versiunea
              aplicabilă este cea publicată pe site la momentul cererii de
              ofertă sau încheierii contractului. Modificările sunt semnalate
              prin actualizarea datei de „Ultima actualizare".
            </p>

            <h2>16. Legea aplicabilă</h2>
            <p>
              Prezenții termeni sunt guvernați de legislația română. Eventualele
              clauze nule sau ineficace nu afectează validitatea celorlalte.
            </p>

            <h2>17. Contact</h2>
            <p>
              Pentru orice întrebare legată de acești termeni:{" "}
              <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>{" "}
              sau{" "}
              <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}>
                {COMPANY_INFO.phone}
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
