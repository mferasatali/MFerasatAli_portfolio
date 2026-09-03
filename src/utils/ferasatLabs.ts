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
		id: "vue-ai-chat-kit",
		title: "vue-ai-chat-kit",
		tagline: "Vue 3 AI chat & conversation UI",
		description:
			"Streaming message feed, session history sidebar, prompt suggestions, markdown/code copy — minimal required-key contracts. On npm.",
		stack: ["Vue 3", "TypeScript", "npm"],
		href: "https://www.npmjs.com/package/vue-ai-chat-kit",
		repoUrl: "https://github.com/mferasatali/vue-ai-chat-kit",
		status: "live",
		icon: "mdi-robot-outline",
		accent: "#0891b2",
	},
	{
		id: "vue-kanban-board-kit",
		title: "vue-kanban-board-kit",
		tagline: "ATS · succession · VIP · agile boards",
		description:
			"Enterprise Vue 3 Kanban with drag-and-drop — ATS pipelines, 9-box succession badges, VIP referrals, and agile task boards. On npm.",
		stack: ["Vue 3", "TypeScript", "Drag & Drop", "npm"],
		href: "https://www.npmjs.com/package/vue-kanban-board-kit",
		repoUrl: "https://github.com/mferasatali/vue-kanban-board-kit",
		status: "live",
		icon: "mdi-view-column-outline",
		accent: "#7c3aed",
	},
	{
		id: "vue-custom-data-table",
		title: "vue-custom-data-table",
		tagline: "Excel-style filters · sort · select",
		description:
			"Vue 3 enterprise data table with column-header dropdown filters, sorting, row selection, pagination, and backend query mappers. On npm.",
		stack: ["Vue 3", "TypeScript", "npm"],
		href: "https://www.npmjs.com/package/vue-custom-data-table",
		repoUrl: "https://github.com/mferasatali/vue-custom-data-table",
		status: "live",
		icon: "mdi-table-large",
		accent: "#2563eb",
	},
	{
		id: "vue-table-filter-kit",
		title: "vue-table-filter-kit",
		tagline: "Search · pills · filter builder",
		description:
			"Vue 3 table filter kit — unified search, multi-type filter builder, active filter pills, saved presets, and backend query mapper. On npm.",
		stack: ["Vue 3", "TypeScript", "npm"],
		href: "https://www.npmjs.com/package/vue-table-filter-kit",
		repoUrl: "https://github.com/mferasatali/vue-table-filter-kit",
		status: "live",
		icon: "mdi-filter-variant",
		accent: "#db2777",
	},
	{
		id: "complete-schedule",
		title: "complete-schedule",
		tagline: "Vue 3 calendar · slots · meetings",
		description:
			"Vue 3 schedule kit — calendar, slot picker, and meeting card. Pass only required keys; mappers cover Microsoft Graph, availability days, and interview payloads. On npm.",
		stack: ["Vue 3", "Schedule-X", "TypeScript", "npm"],
		href: "https://www.npmjs.com/package/complete-schedule",
		repoUrl: "https://github.com/mferasatali/complete-schedule",
		status: "live",
		icon: "mdi-calendar-clock",
		accent: "#4f46e5",
	},
	{
		id: "claude-duo",
		title: "Claude Duo",
		tagline: "Two Claude Code panes on Windows",
		description:
			"Open-source Windows CLI that opens two Claude Code sessions in one Windows Terminal window — optional second account via isolated CLAUDE_CONFIG_DIR. npx claude-duo.",
		stack: ["PowerShell", "Windows Terminal", "Node.js", "npm"],
		href: "https://www.npmjs.com/package/claude-duo",
		repoUrl: "https://github.com/mferasatali/claude-duo",
		status: "live",
		icon: "mdi-console",
		accent: "#d97706",
	},
	{
		id: "clear-md",
		title: "ClearMD",
		tagline: "Markdown viewer for Windows",
		description:
			"Attractive Markdown viewer — Electron desktop app with Open with / drag-drop, plus a VS Code webview extension. Portable builds on GitHub Releases.",
		stack: ["Electron", "React", "Vite", "VS Code"],
		href: "https://github.com/mferasatali/clear-md/releases",
		repoUrl: "https://github.com/mferasatali/clear-md",
		status: "live",
		icon: "mdi-language-markdown",
		accent: "#0e7490",
	},
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
	{
		id: "anything-log",
		title: "Anything Log",
		tagline: "Capture anything · search later",
		description:
			"Angular + Supabase private timeline for any life log — custom types, tags, search, CSV export, and auth with Postgres RLS on GitHub Pages.",
		stack: ["Angular", "Supabase", "Postgres", "GitHub Pages"],
		href: "https://mferasatali.github.io/anything-log/",
		repoUrl: "https://github.com/mferasatali/anything-log",
		status: "live",
		icon: "mdi-notebook-outline",
		accent: "#0b1f33",
	},
];
