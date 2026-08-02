import { IExperience } from "@/interfaces/index";

export const FerasatExperience: IExperience.ExperiencePayload[] = [
  {
    companyName: "Inception - IBHC",
    role: "Software Engineer · Full-Stack (Primary)",
    duration: "Jan 2024 – Present",
    location: "Remote · Abu Dhabi, UAE",
    engagement: "Primary role · enterprise product delivery",
    content: [
      "Owned delivery on Takafo+ — AI-powered HCM for Mubadala — 11 modules, 30+ role-based personas across recruiting, CRM, onboarding, and succession.",
      "Shipped Vue 3 + Pinia frontends: multi-level approvals, Kanban boards, 9-box talent mapping, WebSocket notifications, Azure MSAL SSO + B2C.",
      "Production AI: candidate matching, VIP CV analysis, Heygen live-avatar interviews with server-side prompt validation.",
      "Delivered platforms for G42 subsidiaries (Inception · Core42 · Space42) and UAE clients — Emirates Foundation, Dubai Municipality, Khalifa University.",
      "Maintained Dawamee attendance and Remote Work portals used by thousands of UAE employees.",
    ],
  },
  {
    companyName: "Aslase",
    role: "Frontend Lead · Full-Stack (Concurrent)",
    duration: "Jul 2023 – Present",
    location: "Lahore, Pakistan",
    engagement: "Concurrent · team lead & architecture support",
    content: [
      "Lead the frontend team — code reviews, performance standards, mentoring — while owning NestJS APIs end-to-end.",
      "Built Vue 3 / React product surfaces and NestJS services for delivery-critical features.",
      "Shipped OpenAI + RAG workflows: document Q&A, semantic search with Pinecone / LangChain.",
      "Built interactive D3.js / GSAP dashboards and unblocked production incidents with clear escalation paths.",
    ],
  },
  {
    companyName: "Byte Sailors",
    role: "Software Engineer · Full Stack",
    duration: "Feb 2022 – Jul 2023",
    location: "Lahore, Pakistan",
    engagement: "Full-time",
    content: [
      "Delivered booking / reservation systems — Vue/React, Node/Express, PostgreSQL + MongoDB.",
      "Integrated Stripe, PayPal, and Braintree with webhook reconciliation.",
      "Improved API latency and Postgres performance via indexing and schema cleanup.",
      "Owned Heroku production deploys with CI/CD pipelines.",
    ],
  },
];
