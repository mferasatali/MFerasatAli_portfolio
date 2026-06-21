import { ref, onMounted, onUnmounted, watch, type Ref } from "vue";
import type { LenisScrollController } from "@/composables/useLenisScroll";
import { SECTION_IDS } from "@/constants/navigation";

export function useScrollSpy(lenis: Ref<LenisScrollController | null>) {
  const activeSection = ref("hero");
  let rafId: number | null = null;
  let usingLenis = false;

  const updateActiveSection = () => {
    const scrollPosition = (lenis.value?.scroll ?? window.scrollY) + 200;

    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (!section) continue;

      const { offsetTop, offsetHeight } = section;
      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        activeSection.value = id;
        break;
      }
    }
  };

  const onScroll = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateActiveSection);
  };

  const attach = () => {
    if (lenis.value && !usingLenis) {
      lenis.value.on("scroll", onScroll);
      usingLenis = true;
      window.removeEventListener("scroll", onScroll);
    } else if (!lenis.value && !usingLenis) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    updateActiveSection();
  };

  onMounted(() => {
    attach();
  });

  watch(lenis, () => {
    attach();
  });

  onUnmounted(() => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    lenis.value?.off("scroll", onScroll);
    window.removeEventListener("scroll", onScroll);
  });

  return { activeSection };
}
