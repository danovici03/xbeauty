export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://xbeauty.ro"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
