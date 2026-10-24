<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { energyMeta } from "~/data/cards";

const sets = [
  "Neo Genesis",
  "Neo Discovery",
  "Neo Revelation",
  "Neo Destiny",
  "Legendary Collection",
];
const types = Object.values(energyMeta).filter((t) => t.label !== "Incolora");

const root = ref<HTMLElement | null>(null);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    const rows = gsap.utils.toArray<HTMLElement>(".mq-track");
    const tweens = rows.map((row, i) =>
      gsap.fromTo(
        row,
        { xPercent: i % 2 ? -50 : 0 },
        {
          xPercent: i % 2 ? 0 : -50,
          duration: i % 2 ? 26 : 34,
          ease: "none",
          repeat: -1,
        },
      ),
    );
    // Arranca "lejos" del inicio para poder invertir sin topar con el tiempo 0
    tweens.forEach((t) => t.totalTime(t.duration() * 200));

    // La velocidad del scroll acelera (o invierte) la marquesina
    ScrollTrigger.create({
      trigger: root.value,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        const boost = gsap.utils.clamp(-5, 5, self.getVelocity() / 250);
        tweens.forEach((t) => {
          t.timeScale(boost || 1);
          gsap.to(t, {
            timeScale: self.direction,
            duration: 1.2,
            ease: "power2.out",
            overwrite: true,
          });
        });
      },
    });
  });
}, root);
</script>

<template>
  <section
    ref="root"
    class="marquee relative z-[2] -mt-[7vw] bg-night pt-[calc(7vw+3.5rem)] pb-14 overflow-hidden"
  >
    <span
      class="stripes absolute right-[6vw] top-[2vw] w-24 h-10 text-aqua hidden md:block"
      aria-hidden="true"
    />

    <div class="flex w-max mq-track" aria-hidden="true">
      <div v-for="n in 2" :key="n" class="flex items-center shrink-0">
        <template v-for="(s, i) in sets" :key="s">
          <span
            class="font-display font-black italic uppercase leading-none px-6 whitespace-nowrap"
            :class="i % 2 ? 'text-aqua' : 'text-white'"
            style="font-size: clamp(3.4rem, 8.5vw, 8rem)"
            >{{ s }}</span
          >
          <span class="sparkle w-8 h-8 md:w-12 md:h-12 bg-aqua shrink-0" />
        </template>
      </div>
    </div>

    <div class="flex w-max mq-track mt-8" aria-hidden="true">
      <div v-for="n in 2" :key="n" class="flex items-center shrink-0">
        <span
          v-for="(t, j) in [...types, ...types]"
          :key="j"
          class="flex items-center gap-3 mx-3 pl-2 pr-5 py-2 rounded-full bg-white/[0.06] border border-white/10"
        >
          <img :src="t.icon" alt="" class="w-8 h-8" loading="lazy" />
          <span class="font-display font-bold text-base tracking-[0.2em] uppercase text-white/80">
            {{ t.label }}
          </span>
        </span>
      </div>
    </div>
    <p class="sr-only">
      Expansiones disponibles: {{ sets.join(", ") }}.
    </p>
  </section>
</template>

<style scoped>
.marquee {
  clip-path: polygon(0 7vw, 100% 0, 100% 100%, 0 100%);
}
.text-outline {
  color: transparent;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.55);
}
</style>
