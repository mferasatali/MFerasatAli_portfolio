export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

/** Full section list (drawer / scroll-spy) */
export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home", icon: "mdi-home" },
  { id: "about", label: "About", icon: "mdi-account" },
  { id: "selected-work", label: "Selected Work", icon: "mdi-star-circle" },
  { id: "experience", label: "Experience", icon: "mdi-briefcase" },
  { id: "skills", label: "Skills", icon: "mdi-school" },
  { id: "recruiters", label: "Recruiters", icon: "mdi-account-tie" },
  { id: "projects", label: "Projects", icon: "mdi-folder" },
  { id: "blog", label: "Articles", icon: "mdi-post-outline" },
  { id: "testimonials", label: "Reviews", icon: "mdi-star-outline" },
  { id: "contact", label: "Contact", icon: "mdi-email" },
];

/** Compact top-bar links on wide screens */
export const DESKTOP_NAV_IDS = [
  "selected-work",
  "experience",
  "projects",
  "recruiters",
  "contact",
] as const;

/** Right-side dots — keep short so they stay usable */
export const FLOATING_NAV_IDS = [
  "hero",
  "selected-work",
  "experience",
  "projects",
  "contact",
] as const;

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export const DESKTOP_NAV_ITEMS = NAV_ITEMS.filter((n) =>
  (DESKTOP_NAV_IDS as readonly string[]).includes(n.id)
);

export const FLOATING_NAV_ITEMS = NAV_ITEMS.filter((n) =>
  (FLOATING_NAV_IDS as readonly string[]).includes(n.id)
);
