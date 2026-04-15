import type { WCProduct } from "@/types/woocommerce";
import { ProductCard } from "./product-card";

type Props = {
  products: WCProduct[];
};

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-slate-600">
          Niciun produs nu corespunde criteriilor alese.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          Încearcă să ajustezi filtrele sau resetează căutarea.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
