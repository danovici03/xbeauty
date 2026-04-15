"use client";

import { useCallback, useEffect, useState } from "react";

export type StoredProduct = {
  id: number | string;
  name: string;
  slug: string;
  image: string;
  price: string;
};

const isBrowser = typeof window !== "undefined";

function read<T>(key: string): T[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(`${key}:changed`));
  } catch {}
}

export function useStoredList(key: string, max = 50) {
  const [items, setItems] = useState<StoredProduct[]>([]);

  useEffect(() => {
    setItems(read<StoredProduct>(key));
    const onChange = () => setItems(read<StoredProduct>(key));
    window.addEventListener(`${key}:changed`, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(`${key}:changed`, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [key]);

  const add = useCallback(
    (product: StoredProduct) => {
      const current = read<StoredProduct>(key);
      const filtered = current.filter((p) => p.id !== product.id);
      const next = [product, ...filtered].slice(0, max);
      write(key, next);
      setItems(next);
    },
    [key, max],
  );

  const remove = useCallback(
    (id: number | string) => {
      const current = read<StoredProduct>(key);
      const next = current.filter((p) => p.id !== id);
      write(key, next);
      setItems(next);
    },
    [key],
  );

  const clear = useCallback(() => {
    write(key, []);
    setItems([]);
  }, [key]);

  const has = useCallback((id: number | string) => {
    return items.some((p) => p.id === id);
  }, [items]);

  return { items, add, remove, clear, has };
}

export const WISHLIST_KEY = "xbeauty:wishlist";
export const RECENTLY_VIEWED_KEY = "xbeauty:recently-viewed";
