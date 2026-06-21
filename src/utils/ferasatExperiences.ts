import { IExperience } from "@/interfaces/index";

export const FerasatExperience: IExperience.ExperiencePayload[] = [
  {
    companyName: "Inception - IBHC",
    role: "Senior Software Engineer",
    duration: "Jan 2024 – Present",
    location: "Remote · Abu Dhabi, UAE",
    content: [
      "Engineered Takafo+ — AI-powered Human Capital Management platform for Mubadala Investment Company — spanning 11 modules across 30+ role-based user personas.",
      "Built complex Vue.js 3 frontends with Pinia, multi-level approval workflows, Kanban task boards, 9-box talent mapping, and real-time WebSocket notifications — with Azure MSAL SSO and Azure B2C authentication.",
      "Implemented AI-powered candidate matching, VIP CV carousel with AI analysis, and Heygen live-avatar AI interview experiences via OpenAI API with structured prompt engineering.",
      "Delivered enterprise platforms for G42 subsidiaries (Inception AI · Core42 · Space42) and UAE government clients — Emirates Foundation, Dubai Municipality, and Khalifa University.",
      "Built and maintained Dawamee (workforce attendance management) and Remote Work enterprise portal serving thousands of UAE employees.",
    ],
  },
  {
    companyName: "Aslase",
    role: "Full Stack Software Engineer · Frontend Lead",
    duration: "Jul 2023 – Present",
    location: "Lahore, Pakistan (Concurrent)",
    content: [
      "Lead and mentor the frontend development team — guiding implementation, conducting code reviews, and enforcing performance and best-practice standards.",
      "Architect and develop scalable Vue.js 3 and React.js frontends; build and maintain NestJS backend APIs owning features end-to-end.",
      "Integrated OpenAI API and LLM-powered workflows — document Q&A bots, RAG pipelines, semantic search with Pinecone vector DB using LangChain.",
      "Built interactive data visualisation dashboards using D3.js and GSAP animations.",
      "Bridge between technical execution and delivery — defining development standards, streamlining workflows, and resolving production issues.",
    ],
  },
  {
    companyName: "Byte Sailors",
    role: "Software Engineer · Full Stack",
    duration: "Feb 2022 – Jul 2023",
    location: "Lahore, Pakistan",
    content: [
      "Delivered end-to-end booking and reservation systems — Vue.js/React frontend, Node.js/Express backend, PostgreSQL and MongoDB persistence.",
      "Integrated Stripe, PayPal, and Braintree payment gateways with webhook-driven reconciliation.",
      "Optimised REST API response times and PostgreSQL query performance through indexing and schema refactoring.",
      "Managed production deployments on Heroku with CI/CD pipelines.",
    ],
  },
];
