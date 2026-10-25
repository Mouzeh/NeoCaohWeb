import gsap from "gsap";

/**
 * Entrada de página sin parpadeo.
 * El root lleva `:class="{ 'intro-pending': pending }"`; mientras está pendiente,
 * el CSS global oculta `.ix-line > span`, `.ix-fade` e `.ix-hide` (también en SSR).
 * Al montar se fijan los estados iniciales con GSAP, se quita la clase y se anima.
 * `extra` permite sumar tweens propios (p. ej. para elementos `.ix-hide`).
 */
export function usePageIntro(
  root: Ref<HTMLElement | null>,
  extra?: (tl: gsap.core.Timeline, q: (sel: string) => Element[]) => void,
) {
  const pending = ref(true);
  let tl: gsap.core.Timeline | undefined;

  onMounted(() => {
    if (
      !root.value ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      pending.value = false;
      return;
    }
    const q = gsap.utils.selector(root.value);
    // Quita la clase ya en el DOM (no esperar a Vue) para que GSAP no lea
    // el transform del CSS como valor inicial; no hay pintado entre medio.
    root.value.classList.remove("intro-pending");
    gsap.set(q(".ix-line > span"), { yPercent: 105 });
    gsap.set(q(".ix-fade"), { autoAlpha: 0, y: 18 });
    gsap.set(q(".ix-hide"), { autoAlpha: 0 });
    pending.value = false;

    tl = gsap
      .timeline({ delay: 0.1, defaults: { ease: "power3.out" } })
      .to(q(".ix-line > span"), { yPercent: 0, duration: 1.1, stagger: 0.1 })
      .to(
        q(".ix-fade"),
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 },
        "-=0.75",
      );
    extra?.(tl, q);
  });

  onBeforeUnmount(() => tl?.kill());

  return pending;
}
