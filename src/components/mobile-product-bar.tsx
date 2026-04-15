"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { RequestQuoteModal } from "./request-quote-modal";

type Props = {
  productName: string;
  productSlug: string;
  productSku?: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  onSale: boolean;
};

function formatPrice(value: string): string {
  if (!value) return "La cerere";
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(num);
}

export function MobileProductBar({
  productName,
  productSlug,
  productSku,
  price,
  regularPrice,
  salePrice,
  onSale,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const displayPrice = onSale && salePrice ? salePrice : price;
  const hasDiscount = onSale && salePrice && regularPrice;

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] px-3 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Preț
            </p>
            <div className="flex items-baseline gap-1.5">
              <p className="text-base font-bold text-slate-900 truncate">
                {formatPrice(displayPrice)}
              </p>
              {hasDiscount && (
                <p className="text-xs text-slate-400 line-through truncate">
                  {formatPrice(regularPrice)}
                </p>
              )}
            </div>
          </div>
          <a
            href="tel:0740950000"
            aria-label="Sună"
            className="w-11 h-11 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-700 hover:border-pink-600 hover:text-pink-600 transition-colors flex-shrink-0"
          >
            <Phone size={18} />
          </a>
          <RequestQuoteModal
            productName={productName}
            productSlug={productSlug}
            productSku={productSku}
            triggerLabel="Solicită"
            triggerClassName="bg-pink-600 hover:bg-pink-500 text-white px-5 py-3 rounded-full font-semibold transition-colors shadow-md shadow-pink-600/25 inline-flex items-center justify-center gap-2 text-sm flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
