import { SITE_URL, absoluteUrl } from "./site-url";
import type { WCProduct } from "@/types/woocommerce";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XBeauty",
    alternateName: "X-Beauty",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "XBeauty este distribuitor de echipamente profesionale pentru saloane de înfrumusețare: epilare laser diodă, solarii Ultrasun, microneedling RF, remodelare corporală.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+40-740-950-000",
        email: "marketing@xbeauty.ro",
        contactType: "sales",
        availableLanguage: ["ro", "en"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Petre Ispirescu, nr. 21",
      addressLocality: "Bistrița",
      addressRegion: "B-N",
      addressCountry: "RO",
    },
    founder: {
      "@type": "Organization",
      name: "S.C. English Beauty House S.R.L.",
    },
    taxID: "49960236",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "XBeauty",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/echipamente?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: absoluteUrl(item.url) } : {}),
    })),
  };
}

export function productSchema(product: WCProduct) {
  const canonical = `${SITE_URL}/echipamente/${product.slug}`;
  const description = product.short_description
    ? stripTags(product.short_description)
    : stripTags(product.description);

  const availability =
    product.stock_status === "instock"
      ? "https://schema.org/InStock"
      : product.stock_status === "onbackorder"
        ? "https://schema.org/BackOrder"
        : "https://schema.org/OutOfStock";

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: canonical,
    priceCurrency: "RON",
    availability,
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@type": "Organization", name: "XBeauty" },
  };
  if (product.price) offer.price = product.price;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: description || product.name,
    sku: product.sku || String(product.id),
    url: canonical,
    brand: { "@type": "Brand", name: "XBeauty" },
    image: product.images.map((img) => img.src),
    offers: offer,
  };

  if (product.categories.length > 0) {
    schema.category = product.categories[product.categories.length - 1].name;
  }

  if (product.rating_count > 0 && Number(product.average_rating) > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.average_rating,
      reviewCount: product.rating_count,
    };
  }

  return schema;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim().slice(0, 400);
}
