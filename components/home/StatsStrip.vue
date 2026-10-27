<script setup lang="ts">
import gsap from "gsap";

// Cifras en vivo del servidor del juego + ranking y cartas más usadas
const live = usePublicStats();

const stats = computed(() => [
  { key: "online", num: live.value?.online, lbl: "En línea ahora", dot: true },
  { key: "registered", num: live.value?.registered, lbl: "Entrenadores registrados" },
  { key: "games", num: live.value?.games, lbl: "Partidas en curso" },
  { key: "cards", num: live.value?.cards, lbl: "Cartas disponibles" },
]);

const RANKS: Record<string, string> = {
  BRONZE: "Bronce",
  SILVER: "Plata",
  GOLD: "Oro",
  PLATINUM: "Platino",
  DIAMOND: "Diamante",
  MASTER: "Maestro",
};
const rankLabel = (r: string) => RANKS[r] ?? r;

const root = ref<HTMLElement | null>(null);
const shown = reactive<Record<string, number>>({});
const fmt = (n?: number) => (n == null ? "—" : n.toLocaleString("es-CL"));

// Cuenta hacia el valor nuevo cada vez que llegan datos
watch(
  stats,
  (list) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const s of list) {
      if (s.num == null) continue;
      const from = { v: shown[s.key] ?? 0 };
      if (reduce) shown[s.key] = s.num;
      else
        gsap.to(from, {
          v: s.num,
          duration: 1.4,
          ease: "power2.out",
          snap: { v: 1 },
          onUpdate: () => (shown[s.key] = from.v),
        });
    }
  },
  { flush: "post" },
);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from(".stat-cell, .live-card", {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: root.value, start: "top 80%" },
    });
  });
}, root);
</script>

<template>
  <section ref="root" class="bg-night px-[5vw] pb-24">
    <div class="grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
      <div
        v-for="(s, i) in stats"
        :key="s.key"
        class="stat-cell relative pt-10 pb-4 pr-6 md:border-r border-white/10 last:border-r-0 md:pl-8 first:pl-0"
      >
        <span class="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.3em] text-aqua">
          [0{{ i + 1 }}]
          <span v-if="s.dot" class="relative flex w-2 h-2" aria-hidden="true">
            <span class="absolute inset-0 rounded-full bg-aqua animate-ping opacity-75" />
            <span class="relative w-2 h-2 rounded-full bg-aqua" />
          </span>
        </span>
        <div
          class="font-display font-black italic leading-none text-white mt-3 tabular-nums"
          style="font-size: clamp(3rem, 6vw, 5.2rem)"
        >
          {{ s.num == null ? "—" : fmt(shown[s.key] ?? 0) }}
        </div>
        <div class="font-display font-bold text-[0.7rem] tracking-[0.25em] uppercase text-white/50 mt-3">
          {{ s.lbl }}
        </div>
      </div>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <!-- Ranking -->
      <div class="live-card rounded-[28px] bg-panel p-6 md:p-8">
        <div class="flex items-baseline justify-between gap-4">
          <h2 class="font-display font-black italic uppercase text-3xl md:text-4xl leading-none">Ranking</h2>
          <span class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white/45">Top 10 · ELO</span>
        </div>

        <ol v-if="live?.ranking.length" class="mt-6 divide-y divide-white/[0.07]">
          <li v-for="p in live.ranking" :key="p.username" class="flex items-center gap-4 py-2.5">
            <span
              class="w-9 h-9 shrink-0 rounded-full grid place-items-center font-display font-black italic text-lg"
              :class="p.position === 1 ? 'bg-aqua text-night' : p.position <= 3 ? 'bg-white/15' : 'bg-white/[0.05] text-white/60'"
            >
              {{ p.position }}
            </span>
            <span class="min-w-0 flex-1 truncate font-display font-bold text-lg">{{ p.username }}</span>
            <span class="hidden sm:block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">{{ rankLabel(p.rank) }}</span>
            <span class="w-14 text-right font-display font-black italic text-xl tabular-nums">{{ p.elo }}</span>
          </li>
        </ol>
        <p v-else class="mt-6 text-white/50">{{ live ? "Aún no hay jugadores en el ranking." : "Cargando…" }}</p>
      </div>

      <!-- Cartas más usadas -->
      <div class="live-card rounded-[28px] bg-paper text-night p-6 md:p-8">
        <div class="flex items-baseline justify-between gap-4">
          <h2 class="font-display font-black italic uppercase text-3xl md:text-4xl leading-none">Lo más jugado</h2>
          <span class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-night/45">Mazos activos</span>
        </div>
        <p class="mt-2 text-sm text-night/55">Cartas presentes en más mazos de los jugadores del último mes (sin energías básicas).</p>

        <ol v-if="live?.top_cards.length" class="mt-6 space-y-4">
          <li v-for="(c, i) in live.top_cards" :key="c.id">
            <div class="flex items-baseline gap-3">
              <span class="font-mono text-xs text-night/45">0{{ i + 1 }}</span>
              <span class="flex-1 min-w-0 truncate font-display font-black italic uppercase text-xl">{{ c.name }}</span>
              <span class="font-display font-black italic text-xl tabular-nums">{{ c.pct }}%</span>
            </div>
            <div class="mt-1.5 h-2 rounded-full bg-night/10 overflow-hidden">
              <div class="h-full rounded-full bg-indigo transition-[width] duration-700" :style="{ width: `${c.pct}%` }" />
            </div>
          </li>
        </ol>
        <p v-else class="mt-6 text-night/55">{{ live ? "Todavía no hay datos." : "Cargando…" }}</p>
      </div>
    </div>
  </section>
</template>
