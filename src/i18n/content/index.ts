import type { AppLocale } from "@/i18n";
import type { Article } from "@/interfaces/blog.interface";
import type { CaseStudy } from "@/utils/ferasatCaseStudies";
import { EXPERIENCES_BY_LOCALE } from "./experiences";
import { TIMELINE_BY_LOCALE } from "./timeline";
import { TAKAFO_MODULES_BY_LOCALE } from "./takafoModules";
import { CASE_STUDY_OVERRIDES } from "./caseStudies";
import { ARTICLE_OVERRIDES } from "./articles";

export function getExperiences(locale: AppLocale) {
  return EXPERIENCES_BY_LOCALE[locale] ?? EXPERIENCES_BY_LOCALE.en;
}

export function getTimeline(locale: AppLocale) {
  return TIMELINE_BY_LOCALE[locale] ?? TIMELINE_BY_LOCALE.en;
}

export function getTakafoModules(locale: AppLocale) {
  return TAKAFO_MODULES_BY_LOCALE[locale] ?? TAKAFO_MODULES_BY_LOCALE.en;
}

export function localizeCaseStudy(study: CaseStudy, locale: AppLocale): CaseStudy {
  const override = CASE_STUDY_OVERRIDES[study.slug]?.[locale];
  if (!override) return study;
  return { ...study, ...override };
}

export function localizeArticle(article: Article, locale: AppLocale): Article {
  const override = ARTICLE_OVERRIDES[article.slug]?.[locale];
  if (!override) return article;
  return {
    ...article,
    title: override.title ?? article.title,
    excerpt: override.excerpt ?? article.excerpt,
    blocks: override.blocks ?? article.blocks,
  };
}

export function localizeArticles(articles: Article[], locale: AppLocale): Article[] {
  return articles.map((a) => localizeArticle(a, locale));
}
