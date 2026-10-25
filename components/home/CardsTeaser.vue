<script setup lang="ts">
import gsap from "gsap";
import { cards, energyMeta } from "~/data/cards";

const featured = ["typhlosion", "ampharos", "donphan", "xatu"]
  .map((slug) => cards.find((c) => c.slug === slug)!)
  .filter(Boolean);

const root = ref<HTMLElement | null>(null);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from(".teaser-head > *", {
      y: 60,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: root.value, start: "top 70%" },
    });
    gsap.from(".teaser-card", {
      y: 120,
      rotate: (i) => (i % 2 ? 6 : -6),
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: { trigger: ".teaser-grid", start: "top 80%" },
    });
  });
}, root);
</script>

<template>
  <section ref="root" class="relative bg-night px-6 md:px-[6vw] py-28 overflow-hidden">
    <div
      class="teaser-head relative flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-[1300px] mx-auto"
    >
      <div class="sec-head">
        <span class="sec-head-sub text-aqua">
          <span class="stripes w-8 h-5 text-aqua" />
          Archivo de cartas
        </span>
        <h2 class="sec-head-big text-white">cards</h2>
      </div>
      <NuxtLink to="/cartas" class="btn-primary self-start md:self-auto">
        Ver todas las cartas <AppIcon name="arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <div
      class="teaser-grid relative grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 max-w-[1300px] mx-auto"
    >
      <NuxtLink
        v-for="(c, i) in featured"
        :key="c.slug"
        :to="`/cartas?c=${c.slug}`"
        class="teaser-card group block no-underline"
        :class="i % 2 ? 'lg:mt-16' : ''"
      >
        <CardTilt class="rounded-[14px]">
          <img
            :src="c.image"
            :alt="c.name"
            class="w-full rounded-[14px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
            loading="lazy"
          />
        </CardTilt>
        <div class="flex items-center justify-between mt-5 gap-3">
          <div class="min-w-0">
            <span class="font-mono text-[0.65rem] tracking-[0.25em] text-white/40">
              {{ c.number }}
            </span>
            <h3
              class="font-display font-black italic uppercase text-white text-2xl md:text-[1.7rem] tracking-[0.02em] truncate group-hover:text-aqua transition-colors"
            >
              {{ c.name }}
            </h3>
          </div>
          <span
            class="flex items-center gap-2 shrink-0 font-display font-black italic text-sm text-white"
          >
            <img :src="energyMeta[c.type].icon" :alt="energyMeta[c.type].label" class="w-6 h-6" />
            {{ c.hp }} PS
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
