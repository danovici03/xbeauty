import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2800&q=80"
          alt="Tratament clinic"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[4px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold text-pink-300 mb-8 uppercase tracking-widest shadow-sm">
            <Star size={12} className="fill-current" /> Echipamente Premium
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6">
            Cea Mai Inovatoare Gamă de Dispozitive.
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
              Creată Pentru a Te Remarca.
            </span>
          </h1>

          <p className="text-lg text-slate-300 mb-10 leading-relaxed font-light max-w-xl">
            Încorporând cea mai bună tehnologie din clasă, suport personalizat și grijă excepțională pentru clienți.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="#devices"
              className="w-full sm:w-auto bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:-translate-y-0.5"
            >
              Explorează Echipamentele
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-white hover:text-pink-400 font-medium transition-colors flex items-center justify-center gap-2 group"
            >
              Află Mai Multe{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
