<script setup lang="ts">
import gsap from "gsap";

const root = ref<HTMLElement | null>(null);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.fromTo(
      ".cta-word",
      { xPercent: (i) => (i ? 18 : -18) },
      {
        xPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.value,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      },
    );
    gsap.from(".cta-fade", {
      y: 30,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: root.value, start: "top 55%" },
    });
    gsap.to(".cta-sparkle", {
      rotate: 360,
      duration: 12,
      ease: "none",
      repeat: -1,
    });
  });
}, root);
</script>

<template>
  <section
    ref="root"
    class="cta relative bg-aqua text-night px-6 md:px-[6vw] pt-[calc(6vw+6rem)] pb-28 overflow-hidden -mt-[6vw]"
  >
    <span
      class="stripes absolute right-0 top-0 w-[28%] h-full text-night/[0.06]"
      aria-hidden="true"
    />
    <span
      class="cta-sparkle sparkle absolute w-24 h-24 md:w-40 md:h-40 bg-indigo right-[8vw] top-[10vw]"
      aria-hidden="true"
    />

    <div class="relative max-w-[1300px] mx-auto">
      <p class="cta-fade eyebrow-wide text-night/70 mb-8">Completamente gratis</p>
      <h2
        class="font-display font-black italic uppercase leading-[0.9] tracking-[0.02em]"
        style="font-size: clamp(3.4rem, 12vw, 11rem)"
      >
        <span class="cta-word block">¿Quieres</span>
        <span class="cta-word block text-indigo md:pl-[12vw]">jugar?</span>
      </h2>

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-10 mt-12">
        <p class="cta-fade max-w-[440px] text-night/75 leading-[1.8]">
          Juega directo en el navegador o descarga el cliente para Windows,
          macOS y Linux. Solo tú, tu mazo y tu rival.
        </p>
        <div class="cta-fade flex flex-wrap gap-3">
          <NuxtLink to="/play" class="btn-dark"><AppIcon name="play" class="w-4 h-4" /> Jugar en web</NuxtLink>
          <NuxtLink to="/descargar" class="btn-outline-dark">Descargar</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  clip-path: polygon(0 6vw, 100% 0, 100% 100%, 0 100%);
}
</style>
