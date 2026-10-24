import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useReveal() {
  const activate = () => {
    if (!import.meta.client) return;
    gsap.registerPlugin(ScrollTrigger);
    const els = gsap.utils.toArray<HTMLElement>(".reveal:not(.is-visible)");
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          overwrite: true,
          onComplete: () =>
            batch.forEach((el) => (el as HTMLElement).classList.add("is-visible")),
        });
      },
    });
  };

  return { activate };
}
