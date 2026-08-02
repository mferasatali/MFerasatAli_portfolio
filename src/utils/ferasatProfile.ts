import { ISocialLinks } from "@/interfaces/index";

export const FerasatSocialLinks: ISocialLinks.SocialLinks[] = [
  {
    name: "GitHub",
    link: "https://github.com/mferasatali",
    icon: "/github.png",
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/mferasatali",
    icon: "/linkedin-02.png",
  },
  {
    name: "Email",
    link: "mailto:mferasatali@gmail.com",
    icon: "",
  },
];

export const PROFILE = {
  name: "Muhammad Ferasat Ali",
  title:
    "Full-Stack Engineer · Vue · React · Node.js · AI/LLM platforms",
  email: "mferasatali@gmail.com",
  linkedin: "https://linkedin.com/in/mferasatali",
  github: "https://github.com/mferasatali",
  location: "Lahore, Pakistan",
  phone: "03424658936",
  phoneDisplay: "+92 342 4658936",
  /** Opens WhatsApp chat (Pakistan +92) */
  whatsappUrl:
    "https://wa.me/923424658936?text=Hi%20Muhammad%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.",
  summary:
    "I build Vue/Node enterprise platforms with AI hiring workflows — shipped for UAE clients including Mubadala Investment Company and G42 ecosystem companies through Inception - IBHC Abu Dhabi. Frontend: Vue 3, React, Angular. Backend: Node.js, NestJS. Data: PostgreSQL, MongoDB, Redis. Production AI: LLMs, RAG, and OpenAI-powered screening.",
};

export type AvailabilityStatus = "open" | "limited" | "unavailable";

/** Update status here — shown in hero badge & assistant answers */
export const AVAILABILITY = {
  status: "open" as AvailabilityStatus,
  label: "Open to opportunities",
  detail: "Available for full-time & contract roles",
} as const;

/** Original Google Drive / Docs links for PDF download */
export const DOWNLOAD_LINKS = {
  resume:
    "https://drive.google.com/file/d/103HXbWAvlNYBAMDhJ0YCU1N1iVlMQHGO/view?usp=sharing",
  coverLetter:
    "https://drive.google.com/file/d/1A6Tq135tMbH4GIExc42oWNtzgvIf_78c/view?usp=sharing",
} as const;

export const DOWNLOAD_ITEMS = [
  { label: "Resume", url: DOWNLOAD_LINKS.resume },
  { label: "Cover Letter", url: DOWNLOAD_LINKS.coverLetter },
] as const;
