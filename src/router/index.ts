// Composables
import { createRouter, createWebHistory } from "vue-router";

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
  const title =
    (to.meta.title as string) || "Muhammad Ferasat Ali — Senior Full-Stack Engineer";
  document.title = title;

  if (to.hash) {
    const id = to.hash.replace("#", "");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
});

export default router;
