"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Hexagon, Menu, X, Heart } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-data";
import { HeaderSearch } from "./header-search";
import { useStoredList, WISHLIST_KEY } from "@/lib/local-store";

type SiteHeaderProps = {
  overlay?: boolean;
};

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items: wishlist } = useStoredList(WISHLIST_KEY);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = isScrolled || !overlay;

  return (
    <header
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        solid
          ? "bg-white/90 backdrop-blur-lg shadow-sm py-3 border-b border-slate-100/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-tr from-slate-900 to-slate-700 text-white p-2.5 rounded-xl group-hover:scale-105 transition-transform shadow-md">
              <Hexagon size={26} className="fill-current text-white" />
            </div>
            <span
              className={`text-2xl font-bold tracking-tight transition-colors ${
                solid ? "text-slate-900" : "text-white"
              }`}
            >
              X<span className="font-light">Beauty</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-pink-600 ${
                  solid ? "text-slate-600" : "text-white/90"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-1">
            <HeaderSearch dark={!solid} />
            <Link
              href="/favorite"
              aria-label="Favorite"
              className={`relative p-2 rounded-full transition-colors ${
                solid
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-pink-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/contact"
              className="ml-3 bg-pink-600 hover:bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 hover:-translate-y-0.5"
            >
              Solicită ofertă
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <HeaderSearch dark={!solid} />
            <Link
              href="/favorite"
              aria-label="Favorite"
              className={`relative p-2 rounded-full transition-colors ${
                solid
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-pink-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Deschide meniu"
              className={`p-2 rounded-md transition-colors ${
                solid
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
          <div className="flex flex-col px-4 py-6 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-slate-800 font-semibold text-lg border-b border-slate-50 pb-3 hover:text-pink-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-3.5 rounded-xl text-center font-semibold transition-colors mt-2"
            >
              Solicită ofertă
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
