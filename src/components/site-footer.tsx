import { Hexagon, Mail, MapPin, Phone } from "lucide-react";

const QUICK_LINKS = [
  "Acasă",
  "Despre Noi",
  "Ultimele Noutăți",
  "Finanțare",
  "Cariere",
  "Contact",
];

const TOP_DEVICES = ["SMARTDiode", "SkinXcell", "Mezotix", "SMARTSculpt Pro", "Tixel"];

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
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-pink-400 transition-colors text-sm font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
              Echipamente de Top
            </h4>
            <ul className="space-y-4">
              {TOP_DEVICES.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-pink-400 transition-colors text-sm font-medium"
                  >
                    {item}
                  </a>
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
                  Unit 1, The Smart Building
                  <br />
                  Innovation Park, RO
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-pink-500 flex-shrink-0" />
                <a href="tel:01344411480" className="text-sm hover:text-pink-400">
                  01344 411480
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-pink-500 flex-shrink-0" />
                <a
                  href="mailto:contact@xbeauty.ro"
                  className="text-sm hover:text-pink-400"
                >
                  contact@xbeauty.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
          <p>&copy; 2026 XBeauty. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <a
              href="/confidentialitate"
              className="hover:text-white transition-colors"
            >
              Confidențialitate &amp; Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
