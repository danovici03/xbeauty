import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, PackageX, Phone, Wrench, LifeBuoy, Banknote } from "lucide-react";
import { RequestQuoteModal } from "@/components/request-quote-modal";
import { getProductBySlug, listProductsByIds } from "@/lib/wc";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { Price } from "@/components/price";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, productSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-url";
import { ProductTabs } from "@/components/product-tabs";
import { WishlistButton } from "@/components/wishlist-button";
import {
  TrackRecentlyViewed,
  RecentlyViewedList,
} from "@/components/recently-viewed";
import { CollapsibleHtml } from "@/components/collapsible-html";
import { MobileProductBar } from "@/components/mobile-product-bar";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produs inexistent — XBeauty" };

  const description =
    stripTags(product.short_description) || stripTags(product.description).slice(0, 160);

  const canonical = `${SITE_URL}/echipamente/${slug}`;
  const mainImage = product.images[0]?.src;

  return {
    title: product.name,
    description: description || `${product.name} disponibil la XBeauty.`,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: product.name,
      description,
      url: canonical,
      siteName: "XBeauty",
      images: mainImage ? [{ url: mainImage, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: mainImage ? [mainImage] : [],
    },
  };
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = product.related_ids?.length
    ? await listProductsByIds(product.related_ids.slice(0, 4)).catch(() => [])
    : [];

  const primaryCategory = product.categories[product.categories.length - 1];
  const outOfStock = product.stock_status === "outofstock";
  const visibleAttributes = (product.attributes ?? []).filter(
    (a) => a.visible && a.options.length > 0,
  );

  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Echipamente", url: "/echipamente" },
    ...(primaryCategory
      ? [
          {
            name: primaryCategory.name,
            url: `/echipamente?category=${primaryCategory.id}`,
          },
        ]
      : []),
    { name: product.name, url: `/echipamente/${product.slug}` },
  ];

  const thumbnailUrl = product.images[0]?.src;

  return (
    <>
      <JsonLd
        data={[productSchema(product), breadcrumbSchema(breadcrumbItems)]}
      />
      <TrackRecentlyViewed
        id={product.id}
        name={product.name}
        slug={product.slug}
        image={thumbnailUrl ?? ""}
        price={product.price}
      />
      <SiteHeader />
      <MobileProductBar
        productName={product.name}
        productSlug={product.slug}
        productSku={product.sku}
        price={product.price}
        regularPrice={product.regular_price}
        salePrice={product.sale_price}
        onSale={product.on_sale}
      />
      <main className="pt-32 pb-28 lg:pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Echipamente", href: "/echipamente" },
              ...(primaryCategory
                ? [
                    {
                      label: primaryCategory.name,
                      href: `/echipamente?category=${primaryCategory.id}`,
                    },
                  ]
                : []),
              { label: product.name },
            ]}
          />

          <div className="grid lg:grid-cols-[minmax(0,1fr)_24rem] gap-10 lg:gap-12 mt-8">
            {/* Left column: gallery + tabs */}
            <div>
              <ProductGallery images={product.images} productName={product.name} />

              <div className="mt-8">
                <ProductTabs
                  tabs={[
                    {
                      id: "description",
                      label: "Descriere",
                      hidden: !product.description,
                      content: (
                        <div
                          className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-pink-600"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        />
                      ),
                    },
                    {
                      id: "specs",
                      label: "Specificații",
                      hidden: visibleAttributes.length === 0,
                      content: (
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                          {visibleAttributes.map((attr) => (
                            <div
                              key={attr.id || attr.name}
                              className="flex flex-col gap-1 border-b border-slate-100 pb-3"
                            >
                              <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                {attr.name}
                              </dt>
                              <dd className="text-base text-slate-900 font-medium">
                                {attr.options.join(", ")}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ),
                    },
                    {
                      id: "support",
                      label: "Suport & Service",
                      content: <SupportTab />,
                    },
                    {
                      id: "financing",
                      label: "Finanțare",
                      content: <FinancingTab />,
                    },
                  ]}
                />
              </div>
            </div>

            {/* Right column: sticky buy panel */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-7">
                {primaryCategory && (
                  <Link
                    href={`/echipamente?category=${primaryCategory.id}`}
                    className="inline-flex self-start text-xs font-bold tracking-widest uppercase text-pink-600 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors mb-4"
                  >
                    {primaryCategory.name}
                  </Link>
                )}

                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-3">
                  {product.name}
                </h1>

                {product.sku && (
                  <p className="text-sm text-slate-500 mb-5">
                    SKU: <span className="font-mono">{product.sku}</span>
                  </p>
                )}

                <div className="mb-5">
                  <Price
                    price={product.price}
                    regularPrice={product.regular_price}
                    salePrice={product.sale_price}
                    onSale={product.on_sale}
                  />
                </div>

                <div className="mb-6">
                  {outOfStock ? (
                    <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full text-sm font-medium">
                      <PackageX size={14} /> Stoc epuizat
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full text-sm font-medium">
                      <CheckCircle size={14} /> În stoc
                    </div>
                  )}
                </div>

                {product.short_description && (
                  <CollapsibleHtml
                    html={product.short_description}
                    collapsedMaxHeight={72}
                    className="mb-6"
                  />
                )}

                <div className="flex flex-col gap-3">
                  <RequestQuoteModal
                    productName={product.name}
                    productSlug={product.slug}
                    productSku={product.sku}
                    triggerClassName="w-full bg-pink-600 hover:bg-pink-500 text-white px-6 py-3.5 rounded-full font-semibold transition-all shadow-lg shadow-pink-600/25 hover:shadow-pink-600/40 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                  />
                  <div className="flex gap-2">
                    <a
                      href="tel:0740950000"
                      className="flex-1 bg-white border-2 border-slate-200 hover:border-pink-600 hover:text-pink-600 text-slate-900 px-4 py-3 rounded-full font-semibold text-center transition-colors inline-flex items-center justify-center gap-2 text-sm"
                    >
                      <Phone size={14} /> Sună
                    </a>
                    <WishlistButton
                      id={product.id}
                      name={product.name}
                      slug={product.slug}
                      image={thumbnailUrl ?? ""}
                      price={product.price}
                      className="flex-1 bg-white border-2 border-slate-200 hover:border-pink-600 text-slate-900 px-4 py-3 rounded-full font-semibold text-center transition-colors inline-flex items-center justify-center gap-2 text-sm"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <LifeBuoy
                      size={16}
                      className="text-pink-600 mt-0.5 flex-shrink-0"
                    />
                    <span>Instructaj și punere în funcțiune incluse</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wrench
                      size={16}
                      className="text-pink-600 mt-0.5 flex-shrink-0"
                    />
                    <span>Intervenție tehnică în max. 48h</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Banknote
                      size={16}
                      className="text-pink-600 mt-0.5 flex-shrink-0"
                    />
                    <span>Soluții de finanțare și leasing disponibile</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-20 lg:mt-28">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-8">
                Produse similare
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>

        <RecentlyViewedList
          excludeId={product.id}
          className="py-16 bg-slate-50 border-t border-slate-100 mt-20"
        />
      </main>
      <SiteFooter />
    </>
  );
}

function SupportTab() {
  return (
    <div className="space-y-4 text-slate-600 leading-relaxed">
      <p>
        Fiecare echipament XBeauty include un pachet complet de suport gândit
        să-ți asigure funcționarea fără întreruperi:
      </p>
      <ul className="space-y-2 pl-5 list-disc marker:text-pink-600">
        <li>
          <strong className="text-slate-900">Instalare și punere în funcțiune</strong>{" "}
          la locația ta, realizate de tehnicienii noștri autorizați.
        </li>
        <li>
          <strong className="text-slate-900">Training clinic și operațional</strong>{" "}
          pentru întreaga echipă — protocoale, siguranță, mentenanță zilnică.
        </li>
        <li>
          <strong className="text-slate-900">Suport tehnic cu intervenție în 48h</strong>{" "}
          pe teritoriul României.
        </li>
        <li>
          <strong className="text-slate-900">Piese și consumabile</strong> pe
          stoc la sediul din Bistrița.
        </li>
        <li>
          <strong className="text-slate-900">Kituri de marketing</strong> pentru
          lansarea serviciului în clinica ta.
        </li>
      </ul>
      <p>
        Pentru urgențe tehnice sună{" "}
        <a href="tel:0740950000" className="text-pink-600 font-semibold">
          0740 950 000
        </a>{" "}
        sau scrie la{" "}
        <a
          href="mailto:marketing@xbeauty.ro"
          className="text-pink-600 font-semibold"
        >
          marketing@xbeauty.ro
        </a>
        .
      </p>
    </div>
  );
}

function FinancingTab() {
  return (
    <div className="space-y-4 text-slate-600 leading-relaxed">
      <p>
        Investiția într-un echipament profesional se poate face în mai multe
        moduri. XBeauty colaborează cu parteneri de leasing pentru a-ți oferi
        soluția optimă pe termen mediu:
      </p>
      <div className="grid sm:grid-cols-3 gap-4 not-prose">
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-1">Achiziție directă</h4>
          <p className="text-sm text-slate-600">
            Plată integrală, factură, garanție standard extinsă.
          </p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-1">Leasing operațional</h4>
          <p className="text-sm text-slate-600">
            Rată lunară fixă, fără impact major asupra cash-flow-ului.
          </p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-1">Închiriere</h4>
          <p className="text-sm text-slate-600">
            Ideal pentru testare, sezon sau proiecte pe termen scurt.
          </p>
        </div>
      </div>
      <p>
        Vrei să-ți calculezi profitul estimat?{" "}
        <Link
          href="/calculator"
          className="text-pink-600 font-semibold hover:text-pink-500"
        >
          Deschide calculatorul de ROI
        </Link>
        .
      </p>
    </div>
  );
}
