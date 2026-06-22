import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { AppLocale } from "@/i18n";
import {
  getExperiences,
  getTimeline,
  getTakafoModules,
  localizeArticle,
  localizeCaseStudy,
  localizeArticles,
} from "@/i18n/content";
import type { Article } from "@/interfaces/blog.interface";
import type { CaseStudy } from "@/utils/ferasatCaseStudies";

export function useLocalizedContent() {
  const { locale } = useI18n();

  const currentLocale = computed(() => locale.value as AppLocale);

  const localizedExperiences = computed(() => getExperiences(currentLocale.value));

  const localizedTimeline = computed(() => getTimeline(currentLocale.value));

  const localizedTakafoModules = computed(() => getTakafoModules(currentLocale.value));

  const localizeArticleByLocale = (article: Article) =>
    localizeArticle(article, currentLocale.value);

  const localizeArticlesList = (articles: Article[]) =>
    localizeArticles(articles, currentLocale.value);

  const localizeCaseStudyByLocale = (study: CaseStudy) =>
    localizeCaseStudy(study, currentLocale.value);

  return {
    currentLocale,
    localizedExperiences,
    localizedTimeline,
    localizedTakafoModules,
    localizeArticleByLocale,
    localizeArticlesList,
    localizeCaseStudyByLocale,
  };
}
