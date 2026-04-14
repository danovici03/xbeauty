import { Activity, CheckCircle, Shield, Zap } from "lucide-react";

export function SmartDifference() {
  return (
    <section
      id="business-support"
      className="py-24 bg-slate-950 text-white overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-900/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-pink-400 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
            <Shield size={16} /> Ecosistemul XBeauty
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 max-w-2xl text-white">
            Mai mult decât simple aparate.
            <br />
            Îți construim afacerea.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          <div className="md:col-span-2 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 p-8 md:p-10 flex flex-col justify-between group hover:border-pink-500/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pink-900/10 transition-all duration-500">
            <div className="w-14 h-14 rounded-[1rem] bg-pink-500/20 flex items-center justify-center text-pink-400 mb-6 border border-pink-500/20">
              <CheckCircle size={28} />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-3 text-white">
                Academie Comprehensivă de Training
              </h4>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Trainerii noștri certificați oferă instruire clinică și operațională aprofundată, asigurându-se că echipa ta este pregătită încă din prima zi.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-pink-600 to-rose-700 border border-pink-500/30 p-8 md:p-10 flex flex-col justify-between overflow-hidden relative group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pink-900/20 transition-all duration-500">
            <div className="absolute -right-4 -top-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
              <Zap size={140} />
            </div>
            <div className="w-14 h-14 rounded-[1rem] bg-white/20 flex items-center justify-center text-white mb-6 border border-white/20 backdrop-blur-sm z-10">
              <Zap size={28} />
            </div>
            <div className="z-10">
              <h4 className="text-2xl font-bold text-white mb-2">Profit Maximizat</h4>
              <p className="text-pink-100 text-sm leading-relaxed">
                Atinge recuperarea investiției mai rapid cu instrumentele noastre comerciale.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-900 border border-slate-800 p-8 md:p-10 flex flex-col justify-between group hover:border-pink-500/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pink-900/10 transition-all duration-500">
            <div className="w-14 h-14 rounded-[1rem] bg-slate-800 flex items-center justify-center text-white mb-6 border border-slate-700">
              <Activity size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2 text-white">Kituri de Marketing</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Acces la materiale premium pentru social media și strategii de lansare.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 rounded-[2rem] bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center border border-slate-800 overflow-hidden relative group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pink-900/10 transition-all duration-500">
            <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-950/70 transition-colors duration-500" />
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
              <div className="w-14 h-14 rounded-[1rem] bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/20">
                <Shield size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-3 text-white">
                  Garanție de Intervenție (48H)
                </h4>
                <p className="text-slate-300 max-w-md leading-relaxed">
                  Minimizează timpul de nefuncționare. Echipa tehnică dedicată se asigură că echipamentele tale funcționează perfect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
