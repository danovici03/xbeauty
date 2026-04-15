"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { X } from "lucide-react";
import type { WCCategory } from "@/types/woocommerce";

type Props = {
  categories: WCCategory[];
};

type Chip = {
  key: string;
  label: string;
  paramsToRemove: string[];
};

export function ActiveFilterChips({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const chips: Chip[] = [];

  const q = params.get("q");
  if (q) chips.push({ key: "q", label: `„${q}"`, paramsToRemove: ["q"] });

  const catId = params.get("category");
  if (catId) {
    const cat = categories.find((c) => String(c.id) === catId);
    chips.push({
      key: "category",
      label: cat?.name ?? `Cat. ${catId}`,
      paramsToRemove: ["category"],
    });
  }

  const minP = params.get("min_price");
  const maxP = params.get("max_price");
  if (minP || maxP) {
    const label = `${minP ?? "0"} — ${maxP ?? "∞"} RON`;
    chips.push({
      key: "price",
      label,
      paramsToRemove: ["min_price", "max_price"],
    });
  }

  if (params.get("in_stock") === "1") {
    chips.push({
      key: "stock",
      label: "Doar în stoc",
      paramsToRemove: ["in_stock"],
    });
  }

  if (chips.length === 0) return null;

  const removeParams = (toRemove: string[]) => {
    const qs = new URLSearchParams(params.toString());
    for (const k of toRemove) qs.delete(k);
    qs.delete("page");
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

  return (
    <div className="flex items-center flex-wrap gap-2 mb-5">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mr-1">
        Filtre active:
      </span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => removeParams(chip.paramsToRemove)}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 border border-pink-100 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-pink-100 transition-colors disabled:opacity-60"
        >
          {chip.label}
          <X size={12} />
        </button>
      ))}
      <button
        type="button"
        onClick={resetAll}
        disabled={isPending}
        className="text-xs text-slate-500 hover:text-pink-600 underline ml-1"
      >
        Resetează tot
      </button>
    </div>
  );
}
