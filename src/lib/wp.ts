import "server-only";
import { env } from "./env";
import type {
  WPPost,
  WPPage,
  WPMedia,
  WPPostListParams,
} from "@/types/wordpress";

const API_PREFIX = "/wp-json/wp/v2";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
  revalidate?: number | false;
  tags?: string[];
};

export type WPPaginated<T> = {
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

async function wpFetch(path: string, options: FetchOptions = {}): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (options.auth) {
    if (!env.wpAppUser || !env.wpAppPassword) {
      throw new Error(
        "WP auth requires WP_APP_USER and WP_APP_PASSWORD in environment.",
      );
    }
    const credentials = Buffer.from(
      `${env.wpAppUser}:${env.wpAppPassword}`,
    ).toString("base64");
    headers.Authorization = `Basic ${credentials}`;
  }

  const res = await fetch(`${env.wordpressUrl}${API_PREFIX}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `WordPress ${options.method ?? "GET"} ${path} failed: ${res.status} ${res.statusText} ${text}`,
    );
  }
  return res;
}

async function wpJson<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const res = await wpFetch(path, options);
  return (await res.json()) as T;
}

async function wpPaginated<T>(
  path: string,
  options: FetchOptions = {},
): Promise<WPPaginated<T>> {
  const res = await wpFetch(path, options);
  const items = (await res.json()) as T[];
  return {
    items,
    total: Number(res.headers.get("x-wp-total") ?? items.length),
    totalPages: Number(res.headers.get("x-wp-totalpages") ?? 1),
  };
}

export async function listPosts(
  params: WPPostListParams = {},
): Promise<WPPaginated<WPPost>> {
  return wpPaginated<WPPost>(`/posts${buildQuery(params)}`, {
    revalidate: 60,
    tags: ["wp:posts"],
  });
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const { items } = await wpPaginated<WPPost>(
    `/posts${buildQuery({ slug, per_page: 1 })}`,
    { revalidate: 60, tags: ["wp:posts", `wp:post:${slug}`] },
  );
  return items[0] ?? null;
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const { items } = await wpPaginated<WPPage>(
    `/pages${buildQuery({ slug, per_page: 1 })}`,
    { revalidate: 60, tags: ["wp:pages", `wp:page:${slug}`] },
  );
  return items[0] ?? null;
}

export async function getMedia(id: number): Promise<WPMedia> {
  return wpJson<WPMedia>(`/media/${id}`, {
    revalidate: 300,
    tags: ["wp:media", `wp:media:${id}`],
  });
}
