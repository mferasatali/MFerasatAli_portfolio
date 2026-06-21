export type ArticleCategory = "Vue" | "AI" | "Backend" | "Architecture";

export type ArticleBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string; level?: 2 | 3 }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; content: string; language?: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  category: ArticleCategory;
  featured?: boolean;
  blocks: ArticleBlock[];
}

export namespace IBlog {
  export type Payload = Article;
  export type Block = ArticleBlock;
  export type Category = ArticleCategory;
}
