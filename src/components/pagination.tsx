import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string | undefined>;
};

function buildHref(
  basePath: string,
  params: Record<string, string | undefined>,
  page: number,
): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (key === "page") continue;
    if (value && value.length > 0) qs.set(key, value);
  }
  if (page > 1) qs.set("page", String(page));
  const queryString = qs.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

function getPageRange(current: number, total: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const pushUnique = (p: number | "...") => {
    if (pages[pages.length - 1] !== p) pages.push(p);
  };

  pushUnique(1);
  if (current - 2 > 2) pushUnique("...");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pushUnique(p);
  }
  if (current + 2 < total - 1) pushUnique("...");
  if (total > 1) pushUnique(total);

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}: Props) {
  if (totalPages <= 1) return null;

  const range = getPageRange(currentPage, totalPages);
  const prevHref = buildHref(basePath, searchParams, currentPage - 1);
  const nextHref = buildHref(basePath, searchParams, currentPage + 1);
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const buttonBase =
    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors border";

  return (
    <nav
      aria-label="Paginare"
      className="flex items-center justify-center gap-2 flex-wrap mt-12"
    >
      {prevDisabled ? (
        <span
          className={`${buttonBase} border-slate-100 text-slate-300 cursor-not-allowed`}
          aria-disabled="true"
        >
          <ArrowLeft size={16} />
        </span>
      ) : (
        <Link
          href={prevHref}
          className={`${buttonBase} border-slate-200 text-slate-700 hover:border-pink-600 hover:bg-pink-600 hover:text-white`}
          aria-label="Pagina anterioară"
        >
          <ArrowLeft size={16} />
        </Link>
      )}

      {range.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-slate-400">
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            aria-current="page"
            className={`${buttonBase} bg-pink-600 text-white border-pink-600`}
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(basePath, searchParams, p)}
            className={`${buttonBase} border-slate-200 text-slate-700 hover:border-pink-600 hover:text-pink-600`}
          >
            {p}
          </Link>
        ),
      )}

      {nextDisabled ? (
        <span
          className={`${buttonBase} border-slate-100 text-slate-300 cursor-not-allowed`}
          aria-disabled="true"
        >
          <ArrowRight size={16} />
        </span>
      ) : (
        <Link
          href={nextHref}
          className={`${buttonBase} border-slate-200 text-slate-700 hover:border-pink-600 hover:bg-pink-600 hover:text-white`}
          aria-label="Pagina următoare"
        >
          <ArrowRight size={16} />
        </Link>
      )}
    </nav>
  );
}
