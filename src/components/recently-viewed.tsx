"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  useStoredList,
  RECENTLY_VIEWED_KEY,
  type StoredProduct,
} from "@/lib/local-store";

type TrackProps = StoredProduct;

export function TrackRecentlyViewed(props: TrackProps) {
  const { add } = useStoredList(RECENTLY_VIEWED_KEY, 8);

  useEffect(() => {
    add(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  return null;
}

type ListProps = {
  excludeId?: number | string;
  title?: string;
  className?: string;
};

export function RecentlyViewedList({
  excludeId,
  title = "Văzute recent",
  className,
}: ListProps) {
  const { items } = useStoredList(RECENTLY_VIEWED_KEY, 8);
  const visible = items.filter((p) => p.id !== excludeId).slice(0, 6);

  if (visible.length === 0) return null;

  return (
    <section className={className ?? "py-16 bg-white border-t border-slate-100"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {visible.map((p) => (
            <Link
              key={p.id}
              href={`/echipamente/${p.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden"
            >
              <div className="relative aspect-square bg-slate-50">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 16rem, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-slate-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
                  {p.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
