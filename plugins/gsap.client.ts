import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger);

  // Recalcula posiciones tras cada navegación y cuando terminan de cargar imágenes
  nuxtApp.hook("page:finish", () => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
  window.addEventListener("load", () => ScrollTrigger.refresh());
});
