"use client";

import { Heart } from "lucide-react";
import { useStoredList, WISHLIST_KEY } from "@/lib/local-store";

type Props = {
  id: number | string;
  name: string;
  slug: string;
  image: string;
  price: string;
  className?: string;
  compact?: boolean;
};

export function WishlistButton({
  id,
  name,
  slug,
  image,
  price,
  className,
  compact,
}: Props) {
  const { add, remove, has } = useStoredList(WISHLIST_KEY);
  const active = has(id);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (active) remove(id);
    else add({ id, name, slug, image, price });
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={active ? "Elimină din favorite" : "Adaugă la favorite"}
        aria-pressed={active}
        className={
          className ??
          "w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        }
      >
        <Heart
          size={16}
          className={
            active ? "fill-pink-600 text-pink-600" : "text-slate-400"
          }
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      className={className}
    >
      <Heart
        size={14}
        className={active ? "fill-pink-600 text-pink-600" : undefined}
      />
      {active ? "Salvat" : "Salvează"}
    </button>
  );
}
