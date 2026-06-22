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
    "Senior Full-Stack Engineer · Vue · React · Angular · Node.js · AI/LLM",
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
    "Senior Full-Stack Software Engineer with 3+ years delivering enterprise-scale web applications and AI-integrated platforms for high-profile UAE clients — including Mubadala Investment Company, G42 (Inception · Core42 · Space42), Emirates Foundation, Dubai Municipality, and Khalifa University — through Inception - IBHC Abu Dhabi. Proficient across Vue.js, React, Angular, Nuxt.js, and Next.js on the frontend; Node.js, NestJS, and Laravel on the backend; PostgreSQL, MongoDB, and Redis for data. Actively integrating LLMs, RAG pipelines, vector databases, and OpenAI API into production systems.",
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
