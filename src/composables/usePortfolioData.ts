import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { FerasatProjects } from "@/utils/ferasatProjects";
import { FerasatExperience } from "@/utils/ferasatExperiences";
import { FerasatEducation } from "@/utils/ferasatJourney";
import {
  FerasatSkillCategories,
  FerasatSkillsFlat,
} from "@/utils/ferasatSkillCategories";
import { FerasatSocialLinks, PROFILE } from "@/utils/ferasatProfile";
import { getFeaturedArticles } from "@/utils/ferasatArticles";
import { FerasatTestimonials } from "@/utils/ferasatTestimonials";
import { IExperience, IJourney } from "@/interfaces";

/**
 * All portfolio content is static (src/utils/*.ts).
 * Google Sheets is used only for contact form submissions — see loadSheetsApi.
 */
export function usePortfolioData() {
  const { t } = useI18n();
  const socialLinks = ref(FerasatSocialLinks);
  const projects = ref(FerasatProjects);
  const experiences = ref<IExperience.ExperiencePayload[]>([...FerasatExperience]);
  const education = ref(FerasatEducation);
  const skillCategories = ref<IJourney.SkillCategory[]>(FerasatSkillCategories);
  const skills = ref<string[]>(FerasatSkillsFlat);
  const profile = ref(PROFILE);
  const introduction = computed(() => t("profile.summary"));
  const canDo = computed(() => t("profile.summary"));
  const profileTitle = computed(() => t("profile.title"));
  const articles = ref(getFeaturedArticles(3));
  const testimonials = ref(FerasatTestimonials);
  const isDataLoaded = ref(false);

  onMounted(() => {
    isDataLoaded.value = true;
  });

  return {
    socialLinks,
    projects,
    experiences,
    education,
    skillCategories,
    skills,
    profile,
    profileTitle,
    introduction,
    canDo,
    articles,
    testimonials,
    isDataLoaded,
  };
}
