import type { AppLocale } from "@/i18n";
import type { Article, ArticleBlock } from "@/interfaces/blog.interface";
import type { IExperience } from "@/interfaces";
import type { AssistantAction } from "@/utils/portfolioAssistant";

export interface TimelineItem {
  company: string;
  role: string;
  period: string;
  impact: string;
}

export interface TakafoModuleLocalized {
  name: string;
  description: string;
}

export interface CaseStudyOverride {
  title?: string;
  subtitle?: string;
  role?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  impact?: string[];
  highlights?: string[];
}

export interface ArticleOverride {
  title?: string;
  excerpt?: string;
  blocks?: ArticleBlock[];
}

export interface AssistantFaqEntry {
  keywords: string[];
  answer: string;
  actions?: AssistantAction[];
}

export interface AssistantContent {
  greeting: string;
  fallback: string;
  suggestions: string[];
  actionLabels: Record<string, string>;
  faq: AssistantFaqEntry[];
}

export type ExperiencesByLocale = Record<AppLocale, IExperience.ExperiencePayload[]>;
export type TimelineByLocale = Record<AppLocale, TimelineItem[]>;
export type TakafoModulesByLocale = Record<AppLocale, TakafoModuleLocalized[]>;
export type CaseStudyOverrides = Record<string, Partial<Record<AppLocale, CaseStudyOverride>>>;
export type ArticleOverrides = Record<string, Partial<Record<AppLocale, ArticleOverride>>>;

export type LocalizedArticle = Article;
