export interface Education {
  degree: string;
  studyIn: string;
  duration: string;
  institutionName: string;
  location?: string;
  marks: string;
  animation: string;
}

export type SkillCategoryVariant =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "ai"
  | "cloud";

export interface SkillCategory {
  name: string;
  variant: SkillCategoryVariant;
  skills: string[];
}
