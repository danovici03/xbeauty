import { ArrowRight, Calculator, Timer, TrendingUp } from "lucide-react";

const STATS = [
  { label: "Profit estimat / lună", value: "12 000 RON+" },
  { label: "Perioadă recuperare", value: "3-6 luni" },
  { label: "Timp completare", value: "2 minute" },
];

export function RoiTeaser() {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-10 md:p-14 lg:p-16">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-900/30 to-transparent" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-pink-400 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
                <Calculator size={16} /> Calculator ROI
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
                Vezi în 2 minute cât profit îți aduce un echipament.
              </h3>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed font-light max-w-lg">
                Calcul orientativ bazat pe date reale din saloane. Modifică prețul ședinței, numărul de clienți și volumul de muncă — primești instant profitul lunar și perioada de recuperare.
              </p>
              <a
                href="/calculator"
                className="inline-flex items-center gap-3 bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:-translate-y-0.5 group"
              >
                Calculează profitul tău
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>

            <div className="grid gap-4">
              {STATS.map((stat, i) => {
                const Icon = i === 0 ? TrendingUp : i === 1 ? Timer : Calculator;
                return (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-sm p-6 md:p-7 flex items-center gap-5"
                  >
                    <div className="w-12 h-12 rounded-[0.9rem] bg-pink-500/15 text-pink-300 flex items-center justify-center border border-pink-500/20 flex-shrink-0">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
