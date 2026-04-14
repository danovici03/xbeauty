import { PRESS_LOGOS } from "@/lib/site-data";

export function LogoStrip() {
  return (
    <section className="border-b border-slate-100 bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-slate-400 mb-8 tracking-[0.2em] uppercase">
          Menționați În &amp; De Încredere Pentru
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {PRESS_LOGOS.map((brand) => (
            <h3 key={brand} className="text-2xl font-serif font-bold text-slate-800">
              {brand}
            </h3>
          ))}
        </div>
      </div>
    </section>
  );
}
