import { NextResponse } from "next/server";
import { listProducts } from "@/lib/wc";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (q.length < 2) {
    return NextResponse.json({ items: [] });
  }

  try {
    const { items } = await listProducts({
      search: q,
      per_page: 6,
      orderby: "popularity",
      order: "desc",
    });
    return NextResponse.json({
      items: items.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: p.images[0]?.src ?? null,
        category:
          p.categories[p.categories.length - 1]?.name ?? "Echipament",
      })),
    });
  } catch (err) {
    console.error("search failed:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
