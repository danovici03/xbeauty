export function Cta() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-pink-600" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
          Ești gata să îți modernizezi clinica?
        </h2>
        <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Programează o demonstrație gratuită, fără obligații, la clinica ta sau în showroom-ul nostru avansat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:contact@xbeauty.ro"
            className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5"
          >
            Solicită o Demonstrație
          </a>
          <a
            href="tel:01344411480"
            className="w-full sm:w-auto bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm"
          >
            Contactează Vânzările
          </a>
        </div>
      </div>
    </section>
  );
}
