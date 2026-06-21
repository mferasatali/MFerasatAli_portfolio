import { ref, onMounted } from "vue";
import { FerasatProjects } from "@/utils/ferasatProjects";
import { FerasatExperience } from "@/utils/ferasatExperiences";
import { FerasatEducation } from "@/utils/ferasatJourney";
import {
  FerasatSkillCategories,
  FerasatSkillsFlat,
} from "@/utils/ferasatSkillCategories";
import { FerasatSocialLinks, PROFILE } from "@/utils/ferasatProfile";
import { IExperience, IJourney } from "@/interfaces";

/**
 * All portfolio content is static (src/utils/*.ts).
 * Google Sheets is used only for contact form submissions — see loadSheetsApi.
 */
export function usePortfolioData() {
  const socialLinks = ref(FerasatSocialLinks);
  const projects = ref(FerasatProjects);
  const experiences = ref<IExperience.ExperiencePayload[]>([...FerasatExperience]);
  const education = ref(FerasatEducation);
  const skillCategories = ref<IJourney.SkillCategory[]>(FerasatSkillCategories);
  const skills = ref<string[]>(FerasatSkillsFlat);
  const profile = ref(PROFILE);
  const introduction = ref(PROFILE.summary);
  const canDo = ref(PROFILE.summary);
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
    introduction,
    canDo,
    isDataLoaded,
  };
}
