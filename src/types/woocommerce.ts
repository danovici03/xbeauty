export type WCImage = {
  id: number;
  src: string;
  name: string;
  alt: string;
};

export type WCCategory = {
  id: number;
  name: string;
  slug: string;
  count?: number;
  parent?: number;
};

export type WCAttribute = {
  id: number;
  name: string;
  slug: string;
  options: string[];
  visible: boolean;
};

export type WCProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: "simple" | "grouped" | "external" | "variable";
  status: "draft" | "pending" | "private" | "publish";
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  categories: WCCategory[];
  images: WCImage[];
  attributes: WCAttribute[];
  related_ids: number[];
  average_rating: string;
  rating_count: number;
};

export type WCProductListParams = {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
  on_sale?: boolean;
  min_price?: string | number;
  max_price?: string | number;
  stock_status?: "instock" | "outofstock" | "onbackorder";
  orderby?: "date" | "id" | "title" | "slug" | "price" | "popularity" | "rating";
  order?: "asc" | "desc";
  slug?: string;
  include?: number[];
  exclude?: number[];
};
