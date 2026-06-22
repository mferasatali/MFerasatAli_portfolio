import { createRouter, createWebHistory } from "vue-router";
import { applyPageSeo, applyPageSeoFromRoute } from "@/utils/siteSeo";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: () => import("@/views/landing/LandingPage.vue"),
  },
  {
    path: "/resume",
    name: "Resume",
    component: () => import("@/views/documents/ResumePage.vue"),
    meta: { title: "Resume — Muhammad Ferasat Ali" },
  },
  {
    path: "/cover-letter",
    name: "CoverLetter",
    component: () => import("@/views/documents/CoverLetterPage.vue"),
    meta: { title: "Cover Letter — Muhammad Ferasat Ali" },
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("@/views/blog/BlogIndexPage.vue"),
    meta: { title: "Articles — Muhammad Ferasat Ali" },
  },
  {
    path: "/blog/:slug",
    name: "Article",
    component: () => import("@/views/blog/ArticlePage.vue"),
  },
  {
    path: "/projects/:slug",
    name: "ProjectCaseStudy",
    component: () => import("@/views/projects/ProjectCaseStudyPage.vue"),
  },
  {
    path: "/recruiter",
    name: "Recruiter",
    component: () => import("@/views/recruiter/RecruiterPage.vue"),
    meta: { title: "Recruiter Brief — Muhammad Ferasat Ali" },
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/NotFoundPage.vue"),
    meta: { title: "404 — Page Not Found" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "CatchAll",
    component: () => import("@/views/NotFoundPage.vue"),
    meta: { title: "404 — Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.name === "Article" || to.name === "ProjectCaseStudy") return;

  if (to.name === "CatchAll" || to.name === "NotFound") {
    applyPageSeo({
      path: to.path,
      title: "404 — Page Not Found",
      description: "The page you are looking for does not exist.",
    });
    return;
  }

  applyPageSeoFromRoute(to.path);

  if (to.hash) {
    const id = to.hash.replace("#", "");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
});

export default router;
