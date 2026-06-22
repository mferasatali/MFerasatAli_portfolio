import { PORTFOLIO_CORPUS, type CorpusChunk } from "./portfolioCorpus";

export interface RagMatch {
  chunk: CorpusChunk;
  score: number;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

export function searchCorpus(query: string, topK = 3): RagMatch[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const scored = PORTFOLIO_CORPUS.map((chunk) => {
    const haystack = `${chunk.text} ${chunk.source} ${chunk.tags.join(" ")}`.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score += token.length >= 4 ? 3 : 2;
      for (const tag of chunk.tags) {
        if (tag.includes(token) || token.includes(tag)) score += 2;
      }
    }
    return { chunk, score };
  })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}

export function synthesizeAnswer(query: string, matches: RagMatch[]): string {
  if (!matches.length) {
    return "";
  }
  const top = matches[0].chunk;
  if (matches.length === 1) {
    return top.text;
  }
  const extra = matches
    .slice(1)
    .map((m) => m.chunk.text)
    .join(" ");
  return `${top.text} ${extra.slice(0, 280)}`.trim();
}

export function askPortfolioRag(query: string): { answer: string; sources: CorpusChunk[] } {
  const matches = searchCorpus(query, 3);
  if (!matches.length) {
    return { answer: "", sources: [] };
  }
  return {
    answer: synthesizeAnswer(query, matches),
    sources: matches.map((m) => m.chunk),
  };
}
