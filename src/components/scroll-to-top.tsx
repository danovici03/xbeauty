"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Înapoi la început"
      className={`fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-20 w-11 h-11 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center transition-all ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      } hover:bg-pink-600 hover:-translate-y-0.5`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
