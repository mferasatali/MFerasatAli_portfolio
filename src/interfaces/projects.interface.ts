export interface PersonalProjectsPayload {
  title: string;
  subtitle: string;
  date: string;
  content: string[];
  stack: string[];
  projectType: string;
  isPrivate: boolean;
  slug?: string;
  links: Links[];
  liveDemo?: string;
  animation: string;
  projectImages: string[];
  selected: Boolean;
}

export interface Links {
  url: string;
  name: string;
  color: string;
}
