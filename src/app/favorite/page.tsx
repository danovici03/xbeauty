"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useStoredList, WISHLIST_KEY } from "@/lib/local-store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

export default function WishlistPage() {
  const { items, remove, clear } = useStoredList(WISHLIST_KEY);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Lista mea"
          title="Produse favorite"
          description={
            items.length === 0
              ? "Lista ta de favorite e goală. Adaugă produse cu butonul inimă pentru a le păstra pentru mai târziu."
              : `Ai ${items.length} ${items.length === 1 ? "produs salvat" : "produse salvate"}.`
          }
          breadcrumbs={[
            { label: "Acasă", href: "/" },
            { label: "Favorite" },
          ]}
        />

        <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
                  <Heart size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Nicio favorită salvată
                </h2>
                <p className="text-slate-600 mb-6">
                  Explorează catalogul și salvează echipamentele care te
                  interesează.
                </p>
                <Link
                  href="/echipamente"
                  className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Vezi catalogul
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-end">
                  <button
                    type="button"
                    onClick={clear}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={14} /> Golește lista
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {items.map((p) => (
                    <div
                      key={p.id}
                      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        aria-label="Elimină din favorite"
                        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                      <Link href={`/echipamente/${p.slug}`}>
                        <div className="relative aspect-square bg-slate-50">
                          {p.image && (
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="(min-width: 1024px) 20rem, 50vw"
                              className="object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <div className="p-4 border-t border-slate-50">
                          <p className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
                            {p.name}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
