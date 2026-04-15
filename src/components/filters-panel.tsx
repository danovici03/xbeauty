"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { WCCategory } from "@/types/woocommerce";

type Props = {
  categories: WCCategory[];
};

const SORT_OPTIONS = [
  { value: "popularity-desc", label: "Populare" },
  { value: "date-desc", label: "Cele mai noi" },
  { value: "price-asc", label: "Preț crescător" },
  { value: "price-desc", label: "Preț descrescător" },
  { value: "title-asc", label: "Nume A-Z" },
];

export function FiltersPanel({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedCategory = params.get("category") ?? "";
  const minPrice = params.get("min_price") ?? "";
  const maxPrice = params.get("max_price") ?? "";
  const inStockOnly = params.get("in_stock") === "1";
  const sort = params.get("sort") ?? "popularity-desc";
  const search = params.get("q") ?? "";

  const activeCount = useMemo(() => {
    let n = 0;
    if (selectedCategory) n++;
    if (minPrice) n++;
    if (maxPrice) n++;
    if (inStockOnly) n++;
    if (search) n++;
    return n;
  }, [selectedCategory, minPrice, maxPrice, inStockOnly, search]);

  const update = (
    mutations: Record<string, string | null>,
    opts?: { resetPage?: boolean },
  ) => {
    const qs = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(mutations)) {
      if (value === null || value === "") qs.delete(key);
      else qs.set(key, value);
    }
    if (opts?.resetPage !== false) qs.delete("page");
    const queryString = qs.toString();
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  const resetAll = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  const content = (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="f-search"
          className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
        >
          Caută
        </label>
        <input
          id="f-search"
          type="search"
          defaultValue={search}
          onBlur={(e) => update({ q: e.target.value || null })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              update({ q: (e.target as HTMLInputElement).value || null });
            }
          }}
          placeholder="Nume produs…"
          className="w-full rounded-full border border-slate-200 px-4 py-2.5 text-sm focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="f-sort"
          className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
        >
          Sortare
        </label>
        <select
          id="f-sort"
          value={sort}
          onChange={(e) => update({ sort: e.target.value })}
          className="w-full rounded-full border border-slate-200 px-4 py-2.5 text-sm focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          Categorie
        </h4>
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => update({ category: null })}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedCategory
                ? "bg-pink-50 text-pink-700 font-semibold"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            Toate categoriile
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => update({ category: String(cat.id) })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between gap-2 ${
                selectedCategory === String(cat.id)
                  ? "bg-pink-50 text-pink-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="truncate">{cat.name}</span>
              {cat.count !== undefined && (
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {cat.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          Preț (RON)
        </h4>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            defaultValue={minPrice}
            onBlur={(e) => update({ min_price: e.target.value || null })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none"
          />
          <input
            type="number"
            min="0"
            placeholder="Max"
            defaultValue={maxPrice}
            onBlur={(e) => update({ max_price: e.target.value || null })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => update({ in_stock: e.target.checked ? "1" : null })}
            className="w-4 h-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500"
          />
          <span className="text-sm text-slate-700">Doar produse în stoc</span>
        </label>
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={resetAll}
          className="text-sm text-slate-500 hover:text-pink-600 underline transition-colors"
        >
          Resetează toate filtrele
        </button>
      )}

      {isPending && (
        <p className="text-xs text-slate-400">Se încarcă…</p>
      )}
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-pink-300 hover:text-pink-600 transition-colors"
      >
        <SlidersHorizontal size={16} />
        Filtre
        {activeCount > 0 && (
          <span className="ml-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          {content}
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Filtre</h3>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Închide filtre"
                className="p-2 rounded-full hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{content}</div>
            <div className="p-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-500 transition-colors"
              >
                Aplică filtrele
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
