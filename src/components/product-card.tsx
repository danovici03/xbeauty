import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { WCProduct } from "@/types/woocommerce";
import { Price } from "./price";
import { WishlistButton } from "./wishlist-button";

type Props = {
  product: WCProduct;
};

export function ProductCard({ product }: Props) {
  const image = product.images[0]?.src;
  const href = `/echipamente/${product.slug}`;
  const outOfStock = product.stock_status === "outofstock";

  return (
    <Link
      href={href}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-pink-900/5 hover:border-pink-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
          {product.on_sale && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-600 text-white px-2.5 py-1 rounded-full shadow-sm">
              Redus
            </span>
          )}
          {!product.on_sale && outOfStock && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded-full shadow-sm">
              Epuizat
            </span>
          )}
          <WishlistButton
            compact
            id={product.id}
            name={product.name}
            slug={product.slug}
            image={image ?? ""}
            price={product.price}
          />
        </div>

        <div className="absolute inset-0 p-5 flex items-center justify-center">
          {image ? (
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 18rem, (min-width: 768px) 25vw, 45vw"
                className="object-contain group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-slate-300 text-sm">
              Fără imagine
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pt-4 pb-5 flex flex-col flex-1 gap-2 border-t border-slate-50">
        <h3 className="font-semibold text-slate-900 text-sm md:text-[15px] leading-snug tracking-tight group-hover:text-pink-600 transition-colors line-clamp-2 min-h-[2.5em]">
          {product.name}
        </h3>

        <Price
          price={product.price}
          regularPrice={product.regular_price}
          salePrice={product.sale_price}
          onSale={product.on_sale}
          compact
        />

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-pink-600 transition-colors">
            Vezi detalii
            <ArrowRight
              size={12}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
