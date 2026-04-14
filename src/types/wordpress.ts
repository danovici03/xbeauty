export type WPRendered = {
  rendered: string;
  protected?: boolean;
};

export type WPPost = {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
};

export type WPPage = Omit<WPPost, "categories" | "tags">;

export type WPMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
};

export type WPPostListParams = {
  page?: number;
  per_page?: number;
  search?: string;
  slug?: string;
  categories?: number | number[];
  tags?: number | number[];
  orderby?: "date" | "id" | "title" | "slug" | "include";
  order?: "asc" | "desc";
};
