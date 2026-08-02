export interface PersonalProjectsPayload {
  title: string;
  subtitle: string;
  date: string;
  /** Prefer proof-of-work lines: Problem · Built · Result (shown in cards/modals) */
  content: string[];
  stack: string[];
  projectType: string;
  isPrivate: boolean;
  slug?: string;
  /** Shown on homepage Featured Projects when true */
  featured?: boolean;
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
