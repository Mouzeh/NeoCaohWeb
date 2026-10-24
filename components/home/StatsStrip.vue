<script setup lang="ts">
import gsap from "gsap";

const stats = [
  { num: 50, sup: "+", lbl: "Jugadores activos" },
  { num: 220, sup: "+", lbl: "Cartas disponibles" },
  { num: 1, sup: "+", lbl: "Torneos jugados" },
  { num: 3, sup: "", lbl: "Expansiones" },
];

const root = ref<HTMLElement | null>(null);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from(".stat-cell", {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: root.value, start: "top 80%" },
    });
    gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
      const target = Number(el.dataset.to);
      const counter = { v: 0 };
      gsap.to(counter, {
        v: target,
        duration: 1.6,
        ease: "power2.out",
        snap: { v: 1 },
        scrollTrigger: { trigger: root.value, start: "top 80%" },
        onUpdate: () => (el.textContent = String(counter.v)),
      });
    });
  });
}, root);
</script>

<template>
  <section ref="root" class="bg-night px-[5vw] pb-24">
    <div
      class="grid grid-cols-2 md:grid-cols-4 border-t border-white/10"
    >
      <div
        v-for="(s, i) in stats"
        :key="s.lbl"
        class="stat-cell relative pt-10 pb-4 pr-6 md:border-r border-white/10 last:border-r-0 md:pl-8 first:pl-0"
      >
        <span class="font-mono text-[0.65rem] tracking-[0.3em] text-aqua">
          [0{{ i + 1 }}]
        </span>
        <div
          class="font-display font-black italic leading-none text-white mt-3"
          style="font-size: clamp(3rem, 6vw, 5.2rem)"
        >
          <span class="stat-num" :data-to="s.num">{{ s.num }}</span
          ><span class="text-aqua">{{ s.sup }}</span>
        </div>
        <div
          class="font-display font-bold text-[0.7rem] tracking-[0.25em] uppercase text-white/50 mt-3"
        >
          {{ s.lbl }}
        </div>
      </div>
    </div>
  </section>
</template>
