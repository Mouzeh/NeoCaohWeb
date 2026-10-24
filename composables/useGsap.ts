import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Registra animaciones GSAP ligadas al ciclo de vida del componente.
 * `setup` recibe un gsap.matchMedia acotado a `scope`; todo lo creado
 * dentro se revierte automáticamente al desmontar.
 */
export function useGsap(
  setup: (mm: gsap.MatchMedia) => void,
  scope?: Ref<HTMLElement | null>,
) {
  let mm: gsap.MatchMedia | undefined;

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    mm = gsap.matchMedia(scope?.value ?? undefined);
    setup(mm);
  });

  onBeforeUnmount(() => mm?.revert());
}
