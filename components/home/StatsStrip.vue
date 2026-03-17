<script setup lang="ts">
const stats = [
  { num: "50", sup: "+", lbl: "Jugadores Activos" },
  { num: "220", sup: "+", lbl: "Cartas Disponibles" },
  { num: "1", sup: "+", lbl: "Torneos Jugados" },
  { num: "3", sup: "", lbl: "Expansiones" },
];
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-4 bg-ink2">
    <div
      v-for="s in stats"
      :key="s.lbl"
      class="stat-cell reveal px-8 py-14 text-center relative border-r border-white/[0.04] last:border-r-0"
      :class="{ 'border-r-0': s.lbl === 'Uptime' }"
    >
      <div
        class="font-display font-extrabold text-[3.4rem] leading-none text-white"
      >
        {{ s.num
        }}<sup class="text-gold text-[1.4rem] align-super">{{ s.sup }}</sup>
      </div>
      <div
        class="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-muted mt-2"
      >
        {{ s.lbl }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.stat-cell::before {
  content: "";
  @apply absolute top-0 left-1/2 -translate-x-1/2 w-[36%] h-0.5 bg-violet2;
}
</style>
