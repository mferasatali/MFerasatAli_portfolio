import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { NAV_ITEMS } from "@/constants/navigation";
import { FerasatCaseStudies } from "@/utils/ferasatCaseStudies";
import { useAppTheme } from "@/composables/useAppTheme";
import { useRecruiterPack } from "@/composables/useRecruiterPack";
import { CALENDLY_URL } from "@/utils/ferasatRecruiter";
import { localizeCaseStudy } from "@/i18n/content";
import type { AppLocale } from "@/i18n";

export interface CommandItem {
  id: string;
  label: string;
  group: string;
  keywords: string[];
  icon: string;
  action: () => void;
}

export function useCommandPalette() {
  const open = ref(false);
  const query = ref("");
  const activeIndex = ref(0);
  const router = useRouter();
  const route = useRoute();
  const { toggleTheme } = useAppTheme();
  const { openPack } = useRecruiterPack();
  const { t, locale } = useI18n();

  const l = () => locale.value as AppLocale;

  const navigateSection = (sectionId: string) => {
    open.value = false;
    if (route.path === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const commands = computed<CommandItem[]>(() => {
    const items: CommandItem[] = [
      {
        id: "home",
        label: t("commandPalette.home"),
        group: t("commandPalette.groups.pages"),
        keywords: ["home", "landing", "portfolio"],
        icon: "mdi-home",
        action: () => {
          open.value = false;
          router.push("/");
        },
      },
      {
        id: "resume",
        label: t("header.resume"),
        group: t("commandPalette.groups.pages"),
        keywords: ["resume", "cv", "document"],
        icon: "mdi-file-document-outline",
        action: () => {
          open.value = false;
          router.push("/resume");
        },
      },
      {
        id: "cover-letter",
        label: t("header.coverLetter"),
        group: t("commandPalette.groups.pages"),
        keywords: ["cover", "letter"],
        icon: "mdi-email-outline",
        action: () => {
          open.value = false;
          router.push("/cover-letter");
        },
      },
      {
        id: "blog",
        label: t("header.articles"),
        group: t("commandPalette.groups.pages"),
        keywords: ["blog", "articles", "writing"],
        icon: "mdi-post-outline",
        action: () => {
          open.value = false;
          router.push("/blog");
        },
      },
      {
        id: "recruiter",
        label: t("commandPalette.recruiterBrief"),
        group: t("commandPalette.groups.pages"),
        keywords: ["recruiter", "hire", "pack", "brief", "cv"],
        icon: "mdi-account-tie",
        action: () => {
          open.value = false;
          router.push("/recruiter");
        },
      },
    ];

    NAV_ITEMS.filter((n) => n.id !== "hero").forEach((item) => {
      const label = t(`nav.${item.id}`);
      items.push({
        id: item.id,
        label,
        group: t("commandPalette.groups.sections"),
        keywords: [item.id, label.toLowerCase()],
        icon: item.icon,
        action: () => navigateSection(item.id),
      });
    });

    items.push({
      id: "github",
      label: t("nav.github"),
      group: t("commandPalette.groups.sections"),
      keywords: ["github", "repos", "open source"],
      icon: "mdi-github",
      action: () => navigateSection("github"),
    });

    items.push({
      id: "recruiter-pack",
      label: t("commandPalette.openPack"),
      group: t("commandPalette.groups.actions"),
      keywords: ["recruiter", "pack", "resume", "download", "links"],
      icon: "mdi-briefcase-download",
      action: () => {
        open.value = false;
        if (route.path !== "/") {
          router.push("/").then(() => setTimeout(() => openPack(), 300));
        } else {
          openPack();
        }
      },
    });

    if (CALENDLY_URL) {
      items.push({
        id: "book-call",
        label: t("hero.bookCall"),
        group: t("commandPalette.groups.actions"),
        keywords: ["calendly", "book", "call", "schedule", "meeting"],
        icon: "mdi-calendar",
        action: () => {
          open.value = false;
          window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
        },
      });
    }

    items.push({
      id: "contact-hire",
      label: t("commandPalette.contactHire"),
      group: t("commandPalette.groups.actions"),
      keywords: ["contact", "hire", "email", "message"],
      icon: "mdi-send",
      action: () => navigateSection("contact"),
    });

    FerasatCaseStudies.forEach((study) => {
      const localized = localizeCaseStudy(study, l());
      items.push({
        id: `project-${study.slug}`,
        label: `${localized.title} (${t("commandPalette.caseStudy")})`,
        group: t("commandPalette.groups.projects"),
        keywords: [study.slug, localized.title.toLowerCase(), "case study", "project"],
        icon: "mdi-text-box-search-outline",
        action: () => {
          open.value = false;
          router.push(`/projects/${study.slug}`);
        },
      });
    });

    items.push({
      id: "toggle-theme",
      label: t("commandPalette.toggleTheme"),
      group: t("commandPalette.groups.actions"),
      keywords: ["theme", "dark", "light", "mode"],
      icon: "mdi-theme-light-dark",
      action: () => {
        open.value = false;
        toggleTheme();
      },
    });

    return items;
  });

  const filtered = computed(() => {
    const q = query.value.toLowerCase().trim();
    if (!q) return commands.value;
    return commands.value.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.keywords.some((k) => k.includes(q)) ||
        cmd.group.toLowerCase().includes(q)
    );
  });

  const grouped = computed(() => {
    const groups = new Map<string, CommandItem[]>();
    for (const cmd of filtered.value) {
      const list = groups.get(cmd.group) ?? [];
      list.push(cmd);
      groups.set(cmd.group, list);
    }
    return groups;
  });

  const openPalette = () => {
    query.value = "";
    activeIndex.value = 0;
    open.value = true;
  };

  const closePalette = () => {
    open.value = false;
    query.value = "";
  };

  const runCommand = (cmd: CommandItem) => {
    cmd.action();
  };

  const runActive = () => {
    const cmd = filtered.value[activeIndex.value];
    if (cmd) runCommand(cmd);
  };

  const getFlatIndex = (cmd: CommandItem) =>
    filtered.value.findIndex((c) => c.id === cmd.id);

  watch(query, () => {
    activeIndex.value = 0;
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      open.value ? closePalette() : openPalette();
      return;
    }

    if (!open.value) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex.value = Math.min(activeIndex.value + 1, filtered.value.length - 1);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex.value = Math.max(activeIndex.value - 1, 0);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      runActive();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", onKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeyDown);
  });

  return {
    open,
    query,
    activeIndex,
    filtered,
    grouped,
    openPalette,
    closePalette,
    runCommand,
    getFlatIndex,
  };
}
