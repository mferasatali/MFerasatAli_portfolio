import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { NAV_ITEMS } from "@/constants/navigation";
import { FerasatCaseStudies } from "@/utils/ferasatCaseStudies";
import { useAppTheme } from "@/composables/useAppTheme";

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
        label: "Home",
        group: "Pages",
        keywords: ["home", "landing", "portfolio"],
        icon: "mdi-home",
        action: () => {
          open.value = false;
          router.push("/");
        },
      },
      {
        id: "resume",
        label: "Resume",
        group: "Pages",
        keywords: ["resume", "cv", "document"],
        icon: "mdi-file-document-outline",
        action: () => {
          open.value = false;
          router.push("/resume");
        },
      },
      {
        id: "cover-letter",
        label: "Cover Letter",
        group: "Pages",
        keywords: ["cover", "letter"],
        icon: "mdi-email-outline",
        action: () => {
          open.value = false;
          router.push("/cover-letter");
        },
      },
      {
        id: "blog",
        label: "Articles",
        group: "Pages",
        keywords: ["blog", "articles", "writing"],
        icon: "mdi-post-outline",
        action: () => {
          open.value = false;
          router.push("/blog");
        },
      },
    ];

    NAV_ITEMS.filter((n) => n.id !== "hero").forEach((item) => {
      items.push({
        id: item.id,
        label: item.label,
        group: "Sections",
        keywords: [item.id, item.label.toLowerCase()],
        icon: item.icon,
        action: () => navigateSection(item.id),
      });
    });

    items.push({
      id: "github",
      label: "GitHub",
      group: "Sections",
      keywords: ["github", "repos", "open source"],
      icon: "mdi-github",
      action: () => navigateSection("github"),
    });

    items.push({
      id: "contact-hire",
      label: "Contact / Hire Me",
      group: "Actions",
      keywords: ["contact", "hire", "email", "message"],
      icon: "mdi-send",
      action: () => navigateSection("contact"),
    });

    FerasatCaseStudies.forEach((study) => {
      items.push({
        id: `project-${study.slug}`,
        label: `${study.title} (case study)`,
        group: "Projects",
        keywords: [study.slug, study.title.toLowerCase(), "case study", "project"],
        icon: "mdi-text-box-search-outline",
        action: () => {
          open.value = false;
          router.push(`/projects/${study.slug}`);
        },
      });
    });

    items.push({
      id: "toggle-theme",
      label: "Toggle light / dark theme",
      group: "Actions",
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
