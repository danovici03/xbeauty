import "server-only";
import { env } from "./env";
import type {
  WCProduct,
  WCProductListParams,
  WCCategory,
} from "@/types/woocommerce";

const API_PREFIX = "/wp-json/wc/v3";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  revalidate?: number | false;
  tags?: string[];
};

export type WCPaginated<T> = {
  items: T[];
  total: number;
  totalPages: number;
};

function buildQuery(params: Record<string, unknown> = {}): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      search.set(key, value.join(","));
    } else {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

async function wcFetch(path: string, options: FetchOptions = {}): Promise<Response> {
  const credentials = Buffer.from(
    `${env.wcConsumerKey}:${env.wcConsumerSecret}`,
  ).toString("base64");

  const res = await fetch(`${env.wordpressUrl}${API_PREFIX}${path}`, {
    method: options.method ?? "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `WooCommerce ${options.method ?? "GET"} ${path} failed: ${res.status} ${res.statusText} ${text}`,
    );
  }
  return res;
}

async function wcJson<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const res = await wcFetch(path, options);
  return (await res.json()) as T;
}

async function wcPaginated<T>(
  path: string,
  options: FetchOptions = {},
): Promise<WCPaginated<T>> {
  const res = await wcFetch(path, options);
  const items = (await res.json()) as T[];
  return {
    items,
    total: Number(res.headers.get("x-wp-total") ?? items.length),
    totalPages: Number(res.headers.get("x-wp-totalpages") ?? 1),
  };
}

export async function listProducts(
  params: WCProductListParams = {},
): Promise<WCPaginated<WCProduct>> {
  return wcPaginated<WCProduct>(`/products${buildQuery(params)}`, {
    revalidate: 60,
    tags: ["wc:products"],
  });
}

export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  const { items } = await wcPaginated<WCProduct>(
    `/products${buildQuery({ slug, per_page: 1 })}`,
    { revalidate: 60, tags: ["wc:products", `wc:product:${slug}`] },
  );
  return items[0] ?? null;
}

export async function getProduct(id: number): Promise<WCProduct> {
  return wcJson<WCProduct>(`/products/${id}`, {
    revalidate: 60,
    tags: ["wc:products", `wc:product:${id}`],
  });
}

export async function listCategories(): Promise<WCCategory[]> {
  return wcJson<WCCategory[]>(`/products/categories${buildQuery({ per_page: 100 })}`, {
    revalidate: 300,
    tags: ["wc:categories"],
  });
}

export async function getCategoryBySlug(slug: string): Promise<WCCategory | null> {
  const list = await wcJson<WCCategory[]>(
    `/products/categories${buildQuery({ slug, per_page: 1 })}`,
    { revalidate: 300, tags: ["wc:categories", `wc:category:${slug}`] },
  );
  return list[0] ?? null;
}

export async function listProductsByIds(ids: number[]): Promise<WCProduct[]> {
  if (ids.length === 0) return [];
  return wcJson<WCProduct[]>(
    `/products${buildQuery({ include: ids, per_page: ids.length })}`,
    { revalidate: 60, tags: ["wc:products"] },
  );
}
