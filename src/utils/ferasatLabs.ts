export type LabStatus = "live" | "live-local" | "coming-soon";

export interface LabTool {
	id: string;
	title: string;
	tagline: string;
	description: string;
	stack: string[];
	href: string;
	repoUrl?: string;
	status: LabStatus;
	icon: string;
	accent: string;
}

/** Personal build tools showcased from the portfolio Labs tab. */
export const FerasatLabs: LabTool[] = [
	{
		id: "changelog-generator",
		title: "Changelog Generator",
		tagline: "Commits → release notes",
		description:
			"SvelteKit tool that turns GitHub commits into clean markdown changelogs. Multi-account Personal / Office switch, tag ranges, copy & download.",
		stack: ["SvelteKit", "TypeScript", "GitHub API", "Octokit"],
		href: "https://change-log-generator.netlify.app/",
		repoUrl: "https://github.com/mferasatali/change-log-generator",
		status: "live",
		icon: "mdi-file-document-edit-outline",
		accent: "#0f766e",
	},
  {
		id: "sql-lab",
		title: "SQL Lab",
		tagline: "Query studio for Postgres",
		description:
			"Browser-based Postgres workbench — Vue 3 editor, Netlify Functions API, connections in localStorage, read-only guards, library, history, and CSV/JSON/Excel export.",
		stack: ["Vue 3", "Netlify Functions", "PostgreSQL", "CodeMirror"],
		href: "https://sql-labs.netlify.app/",
		repoUrl: "https://github.com/mferasatali/sql-labs",
		status: "live",
		icon: "mdi-database-search-outline",
		accent: "#2563eb",
	},
  {
    id: "ai-pulse-desk",
    title: "AI News · Pulse Desk",
    tagline: "Career-first AI briefing",
    description:
      "Daily AI news desk that auto-pulls RSS, ranks stories for your career track, keeps a must-read list, streaks, and optional Gemini explanations.",
    stack: ["Next.js", "TypeScript", "RSS", "PWA"],
    href: "https://ai-news-live.netlify.app/",
    status: "live",
    icon: "mdi-newspaper-variant-outline",
    accent: "#c2410c",
  },
	{
		id: "babul-hawaij-events",
		title: "Babul Hawaij Events",
		tagline: "Collections · expenses · volunteers",
		description:
			"Vue 3 + Supabase app for yearly event collections, expense tracking, and volunteer managers — auth, Postgres, and storage on a free stack (Vercel).",
		stack: ["Vue 3", "Supabase", "Pinia", "Vercel"],
		href: "https://babulhawaij-events.vercel.app/",
		repoUrl: "https://github.com/babulhawaij/babulhawaij-events",
		status: "live",
		icon: "mdi-calendar-heart",
		accent: "#7c3aed",
	},
	{
		id: "rosca",
		title: "Rosca — Kameeti Manager",
		tagline: "Rotating savings groups",
		description:
			"Vue 3 + Vuetify + Firebase app to manage Kameeti/ROSCA groups — members, monthly pot calculations, contributions, and distribution summaries.",
		stack: ["Vue 3", "Vuetify", "Firebase", "Vercel"],
		href: "https://rosca-coral.vercel.app/",
		repoUrl: "https://github.com/mferasatali/rosca",
		status: "live",
		icon: "mdi-account-group-outline",
		accent: "#b45309",
	},
	{
		id: "expense-tracker",
		title: "Expense Tracker",
		tagline: "Personal finance dashboard",
		description:
			"Vue 3 + Firebase expense tracker with accounts, income, budgets, categories, and Chart.js dashboards — real-time sync on Vercel.",
		stack: ["Vue 3", "Vuetify", "Firebase", "Chart.js"],
		href: "https://expense-tracker-ivory-nu-92.vercel.app/",
		repoUrl: "https://github.com/mferasatali/expense-tracker",
		status: "live",
		icon: "mdi-wallet-outline",
		accent: "#047857",
	},
];
