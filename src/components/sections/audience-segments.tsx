import { ArrowUpRight, Building2, Scissors, Sparkles, Sun, Users } from "lucide-react";

type Segment = {
  icon: typeof Building2;
  title: string;
  description: string;
};

const SEGMENTS: Segment[] = [
  {
    icon: Building2,
    title: "Clinici medicale estetice",
    description:
      "Laser medical, microneedling RF, criolipoliză și platforme pentru dermatologie și medicină estetică.",
  },
  {
    icon: Sparkles,
    title: "Clinici de estetică",
    description:
      "Soluții complete: epilare definitivă, rejuvenare facială, anti-aging și tratamente corporale.",
  },
  {
    icon: Scissors,
    title: "Saloane de înfrumusețare",
    description:
      "Echipamente accesibile pentru servicii faciale, lifting fără bisturiu și remodelare corporală.",
  },
  {
    icon: Sun,
    title: "Centre SPA și bronzare",
    description:
      "Solarii profesionale, cabine de bronzare și echipamente wellness pentru centre dedicate.",
  },
];

export function AudienceSegments() {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
            <Users size={16} /> Pentru cine lucrăm
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Soluții adaptate tipului tău de business.
          </h3>
          <p className="text-lg text-slate-600">
            Fiecare segment are nevoi diferite — de la certificări medicale până la buget și volum de clienți. Construim portofoliul în jurul tău.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SEGMENTS.map((segment) => {
            const Icon = segment.icon;
            return (
              <a
                key={segment.title}
                href="/contact"
                className="group rounded-[1.5rem] bg-white border border-slate-100 p-7 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-900/5 hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-[0.9rem] bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-100 group-hover:bg-pink-50 group-hover:text-pink-600 group-hover:border-pink-100 transition-colors">
                    <Icon size={22} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 group-hover:text-pink-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-pink-600 transition-colors">
                  {segment.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {segment.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
