type Props = {
  price: string;
  regularPrice: string;
  salePrice: string;
  onSale: boolean;
  className?: string;
  compact?: boolean;
};

function formatPrice(value: string): string {
  if (!value) return "";
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(num);
}

export function Price({
  price,
  regularPrice,
  salePrice,
  onSale,
  className,
  compact,
}: Props) {
  if (!price) {
    return (
      <span className={`text-slate-500 ${className ?? ""}`}>La cerere</span>
    );
  }

  const size = compact ? "text-base" : "text-2xl";

  if (onSale && salePrice && regularPrice) {
    return (
      <div className={`flex items-baseline gap-2 ${className ?? ""}`}>
        <span className={`${size} font-bold text-pink-600`}>
          {formatPrice(salePrice)}
        </span>
        <span className="text-sm text-slate-400 line-through">
          {formatPrice(regularPrice)}
        </span>
      </div>
    );
  }

  return (
    <span className={`${size} font-bold text-slate-900 ${className ?? ""}`}>
      {formatPrice(price)}
    </span>
  );
}
