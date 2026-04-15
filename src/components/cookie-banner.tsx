"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "xbeauty-cookie-consent";

type ConsentValue = "accepted" | "rejected";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setShow(true);
    } catch {
      setShow(false);
    }
  }, []);

  const setConsent = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      localStorage.setItem(`${STORAGE_KEY}-date`, new Date().toISOString());
    } catch {}
    setShow(false);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cookie-consent", { detail: { value } }),
      );
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6 pointer-events-none">
      <div
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
        className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl p-5 md:p-6 pointer-events-auto"
      >
        <div className="flex items-start gap-4 md:gap-6">
          <div className="flex-1 min-w-0">
            <h2
              id="cookie-title"
              className="text-base md:text-lg font-bold tracking-tight mb-2"
            >
              🍪 Folosim cookies
            </h2>
            <p
              id="cookie-desc"
              className="text-sm text-slate-300 leading-relaxed"
            >
              Folosim cookies esențiale pentru funcționarea site-ului și, cu
              acordul tău, cookies pentru analiză și marketing. Poți alege ce
              accepți.{" "}
              <a
                href="/confidentialitate"
                className="underline hover:text-pink-300"
              >
                Află mai multe
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            aria-label="Închide"
            className="lg:hidden p-1.5 rounded-full hover:bg-white/10 flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-5">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="sm:flex-1 px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Doar esențiale
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="sm:flex-1 px-5 py-2.5 rounded-full bg-pink-600 hover:bg-pink-500 text-sm font-semibold transition-colors shadow-lg shadow-pink-600/25"
          >
            Accept toate
          </button>
        </div>
      </div>
    </div>
  );
}
