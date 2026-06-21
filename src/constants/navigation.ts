export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home", icon: "mdi-home" },
  { id: "about", label: "About", icon: "mdi-account" },
  { id: "experience", label: "Experience", icon: "mdi-briefcase" },
  { id: "skills", label: "Skills", icon: "mdi-school" },
  { id: "projects", label: "Projects", icon: "mdi-folder" },
  { id: "contact", label: "Contact", icon: "mdi-email" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
