"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Hexagon, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-data";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm py-3 border-b border-slate-100/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-tr from-slate-900 to-slate-700 text-white p-2.5 rounded-xl group-hover:scale-105 transition-transform shadow-md">
              <Hexagon size={26} className="fill-current text-white" />
            </div>
            <span
              className={`text-2xl font-bold tracking-tight transition-colors ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              X<span className="font-light">Beauty</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-pink-400 ${
                  isScrolled ? "text-slate-600" : "text-white/90"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:01344411480"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isScrolled
                  ? "text-slate-800 hover:text-pink-600"
                  : "text-white hover:text-pink-200"
              }`}
            >
              01344 411480
            </a>
            <a
              href="#contact"
              className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 hover:-translate-y-0.5"
            >
              Programează o Probă
            </a>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Deschide meniu"
              className={`p-2 rounded-md transition-colors ${
                isScrolled
                  ? "text-slate-900 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl lg:hidden border-t border-slate-100">
          <div className="flex flex-col px-4 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-slate-800 font-semibold text-lg border-b border-slate-50 pb-3 hover:text-pink-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3.5 rounded-xl text-center font-semibold transition-colors"
            >
              Programează o Probă
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
