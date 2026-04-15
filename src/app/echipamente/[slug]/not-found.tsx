import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Produsul nu a fost găsit
          </h1>
          <p className="text-slate-600 mb-8">
            Echipamentul căutat nu mai există sau a fost mutat.
          </p>
          <Link
            href="/echipamente"
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Vezi toate echipamentele
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
