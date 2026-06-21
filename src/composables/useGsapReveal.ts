import { type Ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

let triggerCount = 0;

const nextId = () => `reveal-${++triggerCount}`;

export function splitTextToWords(element: HTMLElement | null) {
  if (!element) return [];
  const text = element.textContent?.trim() ?? "";
  element.innerHTML = text
    .split(/\s+/)
    .map(
      (word) =>
        `<span class="split-word" style="display:inline-block;overflow:hidden"><span class="split-inner" style="display:inline-block">${word}&nbsp;</span></span>`
    )
    .join("");
  return Array.from(element.querySelectorAll(".split-inner")) as HTMLElement[];
}

export function useGsapReveal(prefersReducedMotion: Ref<boolean>) {
  const triggers: ScrollTrigger[] = [];

  const killAll = () => {
    triggers.forEach((t) => t.kill());
    triggers.length = 0;
  };

  const revealUp = (
    element: HTMLElement | null,
    options: RevealOptions = {}
  ) => {
    if (!element) return;
    const {
      y = 40,
      duration = 0.8,
      delay = 0,
      start = "top 85%",
      once = true,
    } = options;

    if (prefersReducedMotion.value) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(element, { opacity: 0, y });
    const tween = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        once,
        id: nextId(),
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  };

  const revealSplit = (
    element: HTMLElement | null,
    options: RevealOptions = {}
  ) => {
    if (!element) return;
    const { duration = 0.7, stagger = 0.04, start = "top 85%", once = true } =
      options;

    const words = splitTextToWords(element);
    if (!words.length) return;

    if (prefersReducedMotion.value) {
      gsap.set(words, { y: 0, opacity: 1 });
      return;
    }

    gsap.set(words, { y: "100%", opacity: 0 });
    const tween = gsap.to(words, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        once,
        id: nextId(),
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  };

  const staggerChildren = (
    container: HTMLElement | null,
    selector: string,
    options: RevealOptions = {}
  ) => {
    if (!container) return;
    const children = container.querySelectorAll(selector);
    if (!children.length) return;

    const {
      y = 30,
      duration = 0.6,
      stagger = 0.1,
      start = "top 85%",
      once = true,
    } = options;

    if (prefersReducedMotion.value) {
      gsap.set(children, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(children, { opacity: 0, y });
    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start,
        once,
        id: nextId(),
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  };

  const pinHorizontal = (
    container: HTMLElement | null,
    track: HTMLElement | null,
    options: { end?: string } = {}
  ) => {
    if (!container || !track || prefersReducedMotion.value) return;
    if (window.innerWidth < 960) return;

    const getScrollAmount = () => -(track.scrollWidth - container.offsetWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: options.end ?? (() => `+=${track.scrollWidth - container.offsetWidth}`),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        id: nextId(),
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  };

  const parallax = (
    element: HTMLElement | null,
    yPercent = 20
  ) => {
    if (!element || prefersReducedMotion.value) return;

    const tween = gsap.to(element, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        id: nextId(),
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  };

  const refresh = () => ScrollTrigger.refresh();

  return {
    revealUp,
    revealSplit,
    staggerChildren,
    pinHorizontal,
    parallax,
    refresh,
    killAll,
  };
}
