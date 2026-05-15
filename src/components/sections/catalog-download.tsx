import Image from "next/image";
import Link from "next/link";
import { Download, Hexagon } from "lucide-react";

export function CatalogDownload() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-800">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-900/20 to-transparent" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center lg:justify-end pr-0 lg:pr-12 h-[400px] items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-8 -mt-4 w-56 md:w-72 aspect-[3/4] transform rotate-12 shadow-2xl rounded-xl overflow-hidden border border-white/10 z-10 opacity-70">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                alt="Pagină catalog"
                fill
                sizes="(min-width: 768px) 18rem, 14rem"
                className="object-cover grayscale opacity-50 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-slate-800/40" />
            </div>

            <div className="relative w-64 md:w-80 aspect-[3/4] transform -rotate-12 hover:-rotate-6 hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl shadow-black/80 rounded-xl overflow-hidden border border-white/20 z-20 group">
              <div className="w-full h-full bg-slate-900 relative">
                <div className="relative w-full h-1/2">
                  <Image
                    src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80"
                    alt="Copertă catalog"
                    fill
                    sizes="(min-width: 768px) 20rem, 16rem"
                    className="object-cover opacity-80"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900" />
                <div className="absolute bottom-8 left-6 right-6">
                  <Hexagon size={32} className="text-pink-500 fill-current mb-4" />
                  <h4 className="text-white font-bold text-xl leading-tight mb-2">
                    Catalog
                    <br />
                    Echipamente
                    <br />
                    Premium 2026
                  </h4>
                  <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase">
                    XBeauty
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-pink-400 font-bold tracking-widest uppercase text-sm mb-4 flex items-center justify-center lg:justify-start gap-2">
              <Download size={16} /> Resurse
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Descarcă Catalogul Nostru
            </h3>
            <p className="text-lg text-slate-300 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Descoperă detaliile complete ale întregii noastre game de echipamente estetice, specificații tehnice, randament (ROI) și pachete de suport.
            </p>
            <Link
              href="/contact?subiect=Solicit+catalog+PDF+XBeauty+2026"
              className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:-translate-y-0.5 inline-flex items-center justify-center gap-3 group"
            >
              <Download
                size={20}
                className="group-hover:-translate-y-1 transition-transform"
              />
              <span>Cere catalogul pe email</span>
            </Link>
            <p className="text-xs text-slate-400 mt-4 max-w-md">
              Îți trimitem catalogul complet pe email, împreună cu lista de prețuri și ghidul de finanțare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
