import { PROFILE } from "@/utils/ferasatProfile";

/** GitHub Pages production URL (no trailing slash) */
export const SITE_URL = "https://mferasatali.github.io/MFerasatAli_portfolio";

export const SITE_NAME = "Muhammad Ferasat Ali — Portfolio";

export const DEFAULT_DESCRIPTION =
  "Full-Stack Engineer building Vue/Node enterprise platforms with AI hiring workflows. Ship record for UAE clients including Mubadala and G42 via Inception - IBHC.";

export const DEFAULT_TITLE = "Muhammad Ferasat Ali — Full-Stack Engineer";

/** Social share image — 1200×630 PNG in /public */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface PageSeoOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

const ROUTE_SEO: Record<string, Partial<PageSeoOptions>> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/resume": {
    title: "Resume — Muhammad Ferasat Ali",
    description:
      "Resume of Muhammad Ferasat Ali — Full-Stack Engineer with enterprise Vue, React, Node.js, and AI/LLM experience.",
  },
  "/cover-letter": {
    title: "Cover Letter — Muhammad Ferasat Ali",
    description: "Cover letter of Muhammad Ferasat Ali — Full-Stack Engineer.",
  },
  "/labs": {
    title: "Labs — Muhammad Ferasat Ali",
    description:
      "Personal engineering labs: Changelog Generator, SQL Lab, AI News, Babul Hawaij Events, Rosca, Expense Tracker, and Anything Log by Muhammad Ferasat Ali.",
  },
  "/blog": {
    title: "Articles — Muhammad Ferasat Ali",
    description:
      "Technical articles on Vue, AI integration, Azure SSO, and enterprise engineering by Muhammad Ferasat Ali.",
  },
};

function setMeta(
  key: string,
  content: string,
  attr: "name" | "property" = "name"
) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = url;
}

function setJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.name,
        jobTitle: "Full-Stack Engineer",
        email: PROFILE.email,
        url: SITE_URL,
        image: DEFAULT_OG_IMAGE,
        sameAs: [PROFILE.linkedin, PROFILE.github],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        knowsAbout: [
          "Vue.js",
          "React",
          "Angular",
          "Node.js",
          "NestJS",
          "OpenAI",
          "LLM",
          "Enterprise Software",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
    ],
  };

  let el = document.getElementById("site-jsonld") as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = "site-jsonld";
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(graph);
}

export function applyPageSeo(options: PageSeoOptions = {}) {
  const path = options.path ?? window.location.pathname;
  const routeDefaults = ROUTE_SEO[path] ?? {};

  const title = options.title ?? routeDefaults.title ?? DEFAULT_TITLE;
  const description =
    options.description ?? routeDefaults.description ?? DEFAULT_DESCRIPTION;
  const image = options.image ?? routeDefaults.image ?? DEFAULT_OG_IMAGE;
  const type = options.type ?? routeDefaults.type ?? "website";
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;

  document.title = title;

  setMeta("description", description);
  setCanonical(url);

  setMeta("og:title", title, "property");
  setMeta("og:description", description, "property");
  setMeta("og:url", url, "property");
  setMeta("og:type", type, "property");
  setMeta("og:image", image, "property");
  setMeta("og:image:alt", `${PROFILE.name} — ${PROFILE.title}`, "property");
  setMeta("og:site_name", SITE_NAME, "property");
  setMeta("og:locale", "en_US", "property");

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  setMeta("twitter:image", image);
  setMeta("twitter:image:alt", `${PROFILE.name} — Portfolio`, "property");

  setJsonLd();
}

export function applyPageSeoFromRoute(path: string) {
  const defaults = ROUTE_SEO[path];
  applyPageSeo({ path, ...defaults });
}
