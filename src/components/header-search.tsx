"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";

type Result = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  category: string;
};

type Props = {
  dark?: boolean;
};

export function HeaderSearch({ dark }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}`,
          { signal: ctrl.signal },
        );
        const data = await res.json();
        setResults(data.items ?? []);
      } catch {}
      finally {
        setLoading(false);
      }
    }, 200);
    return () => {
      ctrl.abort();
      clearTimeout(timer);
    };
  }, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/echipamente?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Caută"
        className={`p-2 rounded-full transition-colors ${
          dark
            ? "text-white hover:bg-white/10"
            : "text-slate-700 hover:bg-slate-100"
        }`}
      >
        <Search size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[92vw] max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          <form onSubmit={submit} className="relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Caută echipament, model, brand..."
              className="w-full pl-11 pr-11 py-4 text-sm outline-none border-b border-slate-100"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Șterge"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </form>

          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-8 text-slate-400">
                <Loader2 size={18} className="animate-spin" />
              </div>
            )}

            {!loading && q.length >= 2 && results.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-slate-500">
                Niciun rezultat pentru „{q}".
              </p>
            )}

            {!loading && results.length > 0 && (
              <ul>
                {results.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/echipamente/${r.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="relative w-12 h-12 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                        {r.image && (
                          <Image
                            src={r.image}
                            alt={r.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-pink-600 mb-0.5">
                          {r.category}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                          {r.name}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {!loading && q.length < 2 && (
              <p className="px-4 py-8 text-center text-sm text-slate-400">
                Scrie minim 2 caractere pentru a căuta.
              </p>
            )}

            {results.length > 0 && (
              <div className="border-t border-slate-100 p-3">
                <button
                  type="button"
                  onClick={submit}
                  className="w-full text-center text-sm font-semibold text-pink-600 hover:text-pink-500 py-2"
                >
                  Vezi toate rezultatele pentru „{q}"
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
