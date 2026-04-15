import type { Metadata } from "next";
import { listProducts, listCategories } from "@/lib/wc";
import type { WCProductListParams } from "@/types/woocommerce";
import { ProductGrid } from "@/components/product-grid";
import { FiltersPanel } from "@/components/filters-panel";
import { Pagination } from "@/components/pagination";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ActiveFilterChips } from "@/components/active-filter-chips";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Catalog Echipamente Estetice",
  description:
    "Catalog complet de echipamente estetice premium: epilare laser, microneedling, rejuvenare, remodelare corporală și solarii profesionale.",
  alternates: { canonical: `${SITE_URL}/echipamente` },
  openGraph: {
    type: "website",
    title: "Catalog Echipamente Estetice — XBeauty",
    description:
      "Peste 40 de modele de echipamente profesionale pentru saloane și clinici.",
    url: `${SITE_URL}/echipamente`,
  },
};

const PER_PAGE = 12;

type SearchParams = Record<string, string | string[] | undefined>;

function str(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

function parseSort(value: string | undefined): {
  orderby: WCProductListParams["orderby"];
  order: WCProductListParams["order"];
} {
  const [orderby, order] = (value ?? "popularity-desc").split("-");
  const validOrderby: WCProductListParams["orderby"][] = [
    "date",
    "title",
    "price",
    "popularity",
    "rating",
    "slug",
    "id",
  ];
  return {
    orderby: validOrderby.includes(orderby as WCProductListParams["orderby"])
      ? (orderby as WCProductListParams["orderby"])
      : "popularity",
    order: order === "asc" ? "asc" : "desc",
  };
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(str(sp.page)) || 1);
  const category = str(sp.category);
  const minPrice = str(sp.min_price);
  const maxPrice = str(sp.max_price);
  const inStock = str(sp.in_stock) === "1";
  const search = str(sp.q);
  const { orderby, order } = parseSort(str(sp.sort));

  const queryParams: WCProductListParams = {
    page,
    per_page: PER_PAGE,
    orderby,
    order,
    ...(category ? { category } : {}),
    ...(minPrice ? { min_price: minPrice } : {}),
    ...(maxPrice ? { max_price: maxPrice } : {}),
    ...(inStock ? { stock_status: "instock" as const } : {}),
    ...(search ? { search } : {}),
  };

  const [productsRes, categories] = await Promise.all([
    listProducts(queryParams),
    listCategories(),
  ]);

  const visibleCategories = categories
    .filter((c) => (c.count ?? 0) > 0)
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0));

  const flatSearchParams: Record<string, string | undefined> = {
    page: str(sp.page),
    category: str(sp.category),
    min_price: str(sp.min_price),
    max_price: str(sp.max_price),
    in_stock: str(sp.in_stock),
    sort: str(sp.sort),
    q: str(sp.q),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Acasă", url: "/" },
          { name: "Echipamente", url: "/echipamente" },
        ])}
      />
      <SiteHeader />
      <main className="pt-32 pb-24 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Acasă", href: "/" }, { label: "Echipamente" }]}
          />

          <div className="mt-6 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Echipamente
            </h1>
            <p className="text-slate-600 mt-2">
              {productsRes.total} {productsRes.total === 1 ? "produs" : "produse"}
              {category && " în categoria selectată"}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <FiltersPanel categories={visibleCategories} />

            <div className="flex-1 min-w-0">
              <ActiveFilterChips categories={visibleCategories} />
              <ProductGrid products={productsRes.items} />

              <Pagination
                currentPage={page}
                totalPages={productsRes.totalPages}
                basePath="/echipamente"
                searchParams={flatSearchParams}
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
