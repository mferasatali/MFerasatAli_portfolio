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
    target: HTMLElement | number,
    options?: { offset?: number; duration?: number }
  ): void;
  raf(time: number): void;
  destroy(): void;
}

export function useLenisScroll(prefersReducedMotion: Ref<boolean>) {
  const lenis: ShallowRef<LenisScrollController | null> = shallowRef(null);
  let tickerCallback: ((time: number) => void) | null = null;

  const initLenis = () => {
    if (prefersReducedMotion.value) return;

    lenis.value = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    }) as unknown as LenisScrollController;

    lenis.value.on("scroll", ScrollTrigger.update);

    tickerCallback = (time: number) => {
      lenis.value?.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
  };

  const scrollTo = (target: string, offset = -80) => {
    const id = target.startsWith("#") ? target.slice(1) : target;
    const element = document.getElementById(id);

    if (!element) return;

    if (lenis.value) {
      lenis.value.scrollTo(element, { offset, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    if (lenis.value) {
      lenis.value.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const destroyLenis = () => {
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

  return { lenis, initLenis, scrollTo, scrollToTop, destroyLenis };
}
