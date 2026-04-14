import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-pink-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-2">
            <Star size={16} /> Păreri Avizate
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Recomandați de Lideri.
          </h3>
          <p className="text-lg text-slate-600">
            Nu ne crede doar pe cuvânt. Ascultă experiențele proprietarilor de clinici care și-au transformat afacerea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 hover:border-pink-200 hover:-translate-y-1.5 transition-all duration-500 relative flex flex-col"
            >
              <div className="absolute top-8 right-8 text-slate-100">
                <Quote size={48} className="rotate-180" />
              </div>
              <div className="flex gap-1 mb-6 text-pink-400 relative z-10">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-8 relative z-10 flex-1">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-slate-50">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-lg border border-slate-200">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">{t.name}</h5>
                  <p className="text-sm text-slate-500">{t.clinic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
