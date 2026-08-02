import { shallowRef, onUnmounted, type Ref, type ShallowRef } from "vue";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface LenisScrollController {
  scroll: number;
  on(event: "scroll", handler: () => void): void;
  off(event: "scroll", handler: () => void): void;
  scrollTo(
    target: HTMLElement | number | string,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ): void;
  raf(time: number): void;
  start(): void;
  stop(): void;
  destroy(): void;
}

export function useLenisScroll(prefersReducedMotion: Ref<boolean>) {
  const lenis: ShallowRef<LenisScrollController | null> = shallowRef(null);
  let tickerCallback: ((time: number) => void) | null = null;
  let stopped = false;

  const initLenis = () => {
    if (prefersReducedMotion.value) return;
    if (lenis.value) return;

    lenis.value = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Let drawers / modals scroll with the wheel/trackpad
      allowNestedScroll: true,
      prevent: (node: HTMLElement) =>
        node.hasAttribute("data-lenis-prevent") ||
        !!node.closest?.("[data-lenis-prevent]"),
    }) as unknown as LenisScrollController;

    lenis.value.on("scroll", ScrollTrigger.update);
    lenis.value.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    });

    tickerCallback = (time: number) => {
      lenis.value?.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
  };

  const scrollTo = (target: string, offset = -96) => {
    const id = target.startsWith("#") ? target.slice(1) : target;
    const element = document.getElementById(id);

    if (!element) return;

    if (lenis.value && !stopped) {
      lenis.value.scrollTo(element, { offset, duration: 1.05 });
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (lenis.value && !stopped) {
      lenis.value.scrollTo(0, { duration: 1.05 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const stopScroll = () => {
    stopped = true;
    lenis.value?.stop();
    document.documentElement.classList.add("nav-scroll-lock");
    document.body.style.overflow = "hidden";
  };

  const startScroll = () => {
    stopped = false;
    document.body.style.overflow = "";
    document.documentElement.classList.remove("nav-scroll-lock");
    lenis.value?.start();
  };

  const destroyLenis = () => {
    startScroll();
    if (tickerCallback) {
      gsap.ticker.remove(tickerCallback);
      tickerCallback = null;
    }
    lenis.value?.destroy();
    lenis.value = null;
  };

  onUnmounted(() => {
    destroyLenis();
  });

  return {
    lenis,
    initLenis,
    scrollTo,
    scrollToTop,
    stopScroll,
    startScroll,
    destroyLenis,
  };
}
