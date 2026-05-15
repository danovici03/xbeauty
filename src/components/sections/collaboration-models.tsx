import { ArrowRight, Briefcase, Handshake, Wallet } from "lucide-react";

type Model = {
  icon: typeof Briefcase;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  cta: string;
};

const MODELS: Model[] = [
  {
    icon: Briefcase,
    title: "Vânzare echipamente",
    description:
      "Achiziție directă din portofoliul nostru certificat CE, cu instalare la clinică și training pentru echipă.",
    bullets: [
      "Echipamente noi, garanție extinsă",
      "Instalare și punere în funcțiune",
      "Training certificat inclus",
    ],
    href: "/echipamente",
    cta: "Vezi portofoliul",
  },
  {
    icon: Wallet,
    title: "Leasing și rate",
    description:
      "Finanțare prin leasing operațional sau financiar, cu rate adaptate fluxului tău de încasări.",
    bullets: [
      "Avans flexibil, rate până la 60 luni",
      "Documentație gestionată de noi",
      "Aprobare rapidă, fără birocrație",
    ],
    href: "/contact",
    cta: "Solicită ofertă",
  },
  {
    icon: Handshake,
    title: "Consultanță business",
    description:
      "Te ajutăm să alegi portofoliul potrivit pentru tipul tău de clinică, să estimezi ROI-ul și să planifici lansarea.",
    bullets: [
      "Analiză piață și public țintă",
      "Calcul ROI per echipament",
      "Plan de lansare și pricing",
    ],
    href: "/contact",
    cta: "Programează discuție",
  },
];

export function CollaborationModels() {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
            <Briefcase size={16} /> Cum lucrăm împreună
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Trei moduri prin care îți pornim afacerea.
          </h3>
          <p className="text-lg text-slate-600">
            De la cumpărare directă până la leasing și consultanță strategică — alegi modelul potrivit pentru cifrele și etapa ta de business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {MODELS.map((model) => {
            const Icon = model.icon;
            return (
              <a
                key={model.title}
                href={model.href}
                className="group rounded-[2rem] border border-slate-100 bg-white p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-200 hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
              >
                <div className="w-14 h-14 rounded-[1rem] bg-pink-50 text-pink-600 flex items-center justify-center mb-6 border border-pink-100 group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600 transition-colors duration-300">
                  <Icon size={26} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-pink-600 transition-colors">
                  {model.title}
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {model.description}
                </p>
                <ul className="space-y-2 mb-8 text-sm text-slate-700">
                  {model.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                  {model.cta}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
