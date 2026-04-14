import Image from "next/image";
import { Activity, ArrowRight } from "lucide-react";
import { TREATMENTS } from "@/lib/site-data";

export function Treatments() {
  return (
    <section id="treatments" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-2">
            <Activity size={16} /> Soluții Personalizate
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            În Funcție de Tratament.
          </h3>
          <p className="text-lg text-slate-600">
            Găsește tehnologia perfectă, adaptată cerințelor specifice ale clienților tăi și obiectivelor clinicii tale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TREATMENTS.map((treatment) => (
            <a
              key={treatment.name}
              href="#treatments"
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-200 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  src={treatment.image}
                  alt={treatment.name}
                  fill
                  sizes="(min-width: 1024px) 28rem, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
              </div>
              <div className="p-6 md:p-8 flex items-center justify-between flex-1">
                <div>
                  <p className="text-xs font-bold text-pink-600 uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Descoperă
                  </p>
                  <h4 className="font-bold text-slate-900 text-xl tracking-tight group-hover:text-pink-600 transition-colors">
                    {treatment.name}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-all duration-300 flex-shrink-0 border border-slate-100 group-hover:border-pink-600 shadow-sm">
                  <ArrowRight
                    size={20}
                    className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
