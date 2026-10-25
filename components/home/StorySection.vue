<script setup lang="ts">
import gsap from "gsap";
import { cards } from "~/data/cards";
import { SITE } from "~/data/site";

const fan = ["cyndaquil", "azumarill", "typhlosion", "feraligatr", "bellossom"]
  .map((slug) => cards.find((c) => c.slug === slug)!)
  .filter(Boolean);

const logos = [
  "Neo Genesis",
  "Neo Discovery",
  "Neo Revelation",
  "Neo Destiny",
  "Legendary Collection",
];

const root = ref<HTMLElement | null>(null);

const fanned = () => {
  const mid = (fan.length - 1) / 2;
  const spread = () => Math.min(window.innerWidth * 0.075, 110);
  return {
    x: (i: number) => (i - mid) * spread(),
    y: (i: number) => Math.abs(i - mid) * 18,
    rotate: (i: number) => (i - mid) * 9,
  };
};

useGsap((mm) => {
  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(".fan-card", fanned());
  });

  mm.add(MOTION_OK, () => {
    gsap.from(".story-copy > *", {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: root.value, start: "top 65%" },
    });

    // Las cartas parten apiladas y se abren en abanico con el scroll
    gsap.fromTo(
      ".fan-card",
      { x: 0, y: 60, rotate: 0 },
      {
        ...fanned(),
        ease: "power2.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: ".fan-stage",
          start: "top 85%",
          end: "center 45%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    );

    gsap.to(".story-logo", {
      y: (i) => (i % 2 ? -40 : 40),
      ease: "none",
      scrollTrigger: {
        trigger: root.value,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}, root);
</script>

<template>
  <section
    id="story"
    ref="root"
    class="story relative bg-indigo text-white overflow-hidden -mt-[6vw] pt-[calc(6vw+6rem)] pb-28 px-6 md:px-[6vw]"
  >
    <span
      class="stripes absolute left-0 bottom-0 w-[30%] h-[45%] text-white/[0.05]"
      aria-hidden="true"
    />
    <span
      class="absolute right-[-4vw] top-[8vw] font-display font-black italic text-[18vw] leading-none text-white/[0.04] select-none pointer-events-none"
      aria-hidden="true"
      >FANS</span
    >

    <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1300px] mx-auto">
      <!-- Texto -->
      <div class="story-copy">
        <div class="sec-head mb-8">
          <span class="sec-head-sub text-aqua">
            <span class="stripes w-8 h-5 text-aqua" />
            Nuestro proyecto
          </span>
          <h2 class="sec-head-big">story</h2>
        </div>
        <p
          class="font-display font-black italic uppercase tracking-[0.05em] leading-[1.05] mb-7"
          style="font-size: clamp(1.8rem, 3.4vw, 3rem)"
        >
          Hecho por fans,<br /><span class="text-aqua">para fans</span>
        </p>
        <p class="text-white/75 leading-[1.85] max-w-[480px] mb-4">
          Neo Caoh TCG nació del vacío que existía en la comunidad hispana: no
          había un lugar donde jugar TCG Pokémon retro competitivo.
        </p>
        <p class="text-white/75 leading-[1.85] max-w-[480px] mb-10">
          Somos jugadores, devs y artistas que construimos esto con amor al
          juego. Completamente gratuito y siempre lo será.
        </p>
        <div class="flex flex-wrap gap-3">
          <a
            :href="SITE.discord"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-dark !pl-3 !pr-7 !py-3"
          >
            <span class="w-10 h-10 rounded-full bg-[#5865F2] grid place-items-center">
              <AppIcon name="discord" class="w-5 h-5" />
            </span>
            Unirme al Discord
          </a>
          <a
            :href="SITE.whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-dark !pl-3 !pr-7 !py-3"
          >
            <span class="w-10 h-10 rounded-full bg-[#25D366] grid place-items-center">
              <AppIcon name="whatsapp" class="w-5 h-5" />
            </span>
            Grupo de WhatsApp
          </a>
        </div>
      </div>

      <!-- Abanico de cartas -->
      <div class="fan-stage relative h-[380px] sm:h-[460px] md:h-[540px]">
        <img
          v-for="(logo, i) in logos"
          :key="logo"
          :src="`/frames/logos/${logo}.png`"
          :alt="logo"
          class="story-logo absolute w-24 md:w-32 h-auto opacity-25 hidden md:block"
          :style="{
            left: ['2%', '74%', '6%', '78%', '40%'][i],
            top: ['6%', '4%', '78%', '74%', '-6%'][i],
          }"
          loading="lazy"
        />
        <NuxtLink
          v-for="(c, i) in fan"
          :key="c.slug"
          :to="`/cartas?c=${c.slug}`"
          class="fan-card group absolute left-1/2 top-1/2 w-[150px] sm:w-[190px] md:w-[230px] -ml-[75px] sm:-ml-[95px] md:-ml-[115px] -mt-[105px] sm:-mt-[133px] md:-mt-[160px]"
          :style="{ zIndex: i === 2 ? 10 : 5 - Math.abs(i - 2) }"
          :aria-label="`Ver carta ${c.name}`"
        >
          <img
            :src="c.image"
            :alt="c.name"
            class="w-full rounded-[12px] shadow-[0_30px_60px_-15px_rgba(16,13,38,0.7)] transition-transform duration-500 group-hover:-translate-y-6 group-hover:scale-[1.04]"
            loading="lazy"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story {
  clip-path: polygon(0 0, 100% 6vw, 100% 100%, 0 100%);
}
</style>
