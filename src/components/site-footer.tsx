import Link from "next/link";
import { Hexagon, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY_INFO } from "@/lib/site-data";

const QUICK_LINKS: { name: string; href: string }[] = [
  { name: "Despre noi", href: "/despre" },
  { name: "Catalog echipamente", href: "/echipamente" },
  { name: "Finanțare", href: "/finantare" },
  { name: "Training", href: "/training" },
  { name: "Service & suport", href: "/service" },
  { name: "Calculator ROI", href: "/calculator" },
  { name: "Contact", href: "/contact" },
];

const TOP_CATEGORIES: { name: string; href: string }[] = [
  { name: "Epilare laser", href: "/epilare" },
  { name: "Bronzare", href: "/bronzare" },
  { name: "Toate echipamentele", href: "/echipamente" },
];

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 group">
              <Hexagon size={28} className="text-pink-500 fill-current" />
              <span className="text-2xl font-bold tracking-tight text-white">
                X<span className="font-light">Beauty</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Cea mai inovatoare gamă de dispozitive, creată pentru a te ajuta să te remarci. Tehnologie de top și grijă remarcabilă pentru clienți.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
              Linkuri Rapide
            </h4>
            <ul className="space-y-4">
              {QUICK_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-pink-400 transition-colors text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
              Categorii
            </h4>
            <ul className="space-y-4">
              {TOP_CATEGORIES.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-pink-400 transition-colors text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
              Contactează-ne
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-pink-500 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  {COMPANY_INFO.addressLines.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < COMPANY_INFO.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-pink-500 flex-shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`}
                  className="text-sm hover:text-pink-400"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-pink-500 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm hover:text-pink-400"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs">
            <a
              href="https://anpc.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              ANPC
            </a>
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Soluționarea Alternativă a Litigiilor (SAL)
            </a>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Soluționarea Online a Litigiilor (SOL)
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
            <p>
              &copy; 2026 {COMPANY_INFO.legalName} — CUI {COMPANY_INFO.cui}
              {COMPANY_INFO.regCom ? ` · ${COMPANY_INFO.regCom}` : ""}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              <Link
                href="/termeni"
                className="hover:text-white transition-colors"
              >
                Termeni și Condiții
              </Link>
              <Link
                href="/confidentialitate"
                className="hover:text-white transition-colors"
              >
                Confidențialitate &amp; Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
