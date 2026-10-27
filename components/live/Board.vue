<script setup lang="ts">
import gsap from "gsap";
import { cards } from "~/data/cards";

// Ranking por ELO y cartas presentes en más mazos, en vivo desde el servidor
const live = usePublicStats();

// Nombre y color de cada liga (el color solo pinta la insignia, nunca el texto)
const RANKS: Record<string, { label: string; color: string }> = {
  BRONZE: { label: "Bronce", color: "#D08A57" },
  SILVER: { label: "Plata", color: "#C9D1DE" },
  GOLD: { label: "Oro", color: "#F2C94C" },
  PLATINUM: { label: "Platino", color: "#A6F2E8" },
  DIAMOND: { label: "Diamante", color: "#5BCEFA" },
  MASTER: { label: "Maestro", color: "#FF4F6D" },
};
const rankOf = (r: string) => RANKS[r] ?? { label: r, color: "#9A94C4" };

// Medallas del podio
const MEDALS = ["#F2C94C", "#C9D1DE", "#D08A57"];

// Podio en orden 2 · 1 · 3 para que el primero quede al centro
const podium = computed(() => {
  const top = live.value?.ranking.slice(0, 3) ?? [];
  return [top[1], top[0], top[2]].filter(Boolean);
});
const rest = computed(() => live.value?.ranking.slice(3) ?? []);

// Miniatura de la carta si está en el archivo de cartas
const cardImage = (number: string | null) => cards.find((c) => c.number === number)?.image;

const root = ref<HTMLElement | null>(null);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from(".live-card", {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: root.value, start: "top 85%" },
    });
  });
}, root);
</script>

<template>
  <section ref="root" class="bg-night px-6 md:px-[6vw] py-20">
    <div class="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      <!-- Ranking -->
      <div class="live-card relative overflow-hidden rounded-[28px] bg-panel p-6 md:p-8">
        <div
          class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full bg-indigo2/25 blur-3xl"
          aria-hidden="true"
        />

        <div class="relative flex items-end justify-between gap-4">
          <div>
            <span class="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-aqua">Temporada actual</span>
            <h2 class="mt-1 font-display font-black italic uppercase text-4xl md:text-5xl leading-none">Ranking</h2>
          </div>
          <span class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-white/45">Top 10 · ELO</span>
        </div>

        <template v-if="live?.ranking.length">
          <!-- Podio -->
          <ol class="relative mt-8 grid grid-cols-3 items-end gap-2 sm:gap-4" aria-label="Podio">
            <li
              v-for="p in podium"
              :key="p.username"
              class="flex flex-col items-center text-center min-w-0"
            >
              <span
                class="grid place-items-center rounded-full font-display font-black italic uppercase text-night shadow-[0_0_0_4px_rgba(255,255,255,0.06)]"
                :class="p.position === 1 ? 'w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl' : 'w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl'"
                :style="{ background: MEDALS[p.position - 1] }"
              >
                {{ p.username.charAt(0) }}
              </span>
              <span
                class="mt-3 w-full truncate font-display font-bold"
                :class="p.position === 1 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'"
                :title="p.username"
              >
                {{ p.username }}
              </span>
              <span class="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/55">
                <span class="w-2 h-2 rotate-45" :style="{ background: rankOf(p.rank).color }" aria-hidden="true" />
                {{ rankOf(p.rank).label }}
              </span>

              <!-- Escalón -->
              <div
                class="mt-3 w-full rounded-t-2xl border-t-4 bg-white/[0.06] flex flex-col items-center justify-start pt-3"
                :class="p.position === 1 ? 'h-28 sm:h-32' : p.position === 2 ? 'h-20 sm:h-24' : 'h-14 sm:h-16'"
                :style="{ borderColor: MEDALS[p.position - 1] }"
              >
                <span class="font-display font-black italic text-2xl sm:text-3xl leading-none tabular-nums">{{ p.elo }}</span>
                <span class="mt-1 font-mono text-[0.6rem] tracking-[0.2em] text-white/45">#{{ p.position }}</span>
              </div>
            </li>
          </ol>

          <!-- Del 4 al 10 -->
          <ol v-if="rest.length" class="relative mt-2 rounded-2xl bg-night/40 p-1.5">
            <li
              v-for="p in rest"
              :key="p.username"
              class="flex items-center gap-3 sm:gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
            >
              <span class="w-6 shrink-0 text-right font-mono text-xs text-white/45 tabular-nums">{{ p.position }}</span>
              <span
                class="w-8 h-8 shrink-0 rounded-full grid place-items-center bg-white/[0.08] font-display font-black italic uppercase text-white/80"
                aria-hidden="true"
              >
                {{ p.username.charAt(0) }}
              </span>
              <span class="min-w-0 flex-1 truncate font-display font-bold text-lg">{{ p.username }}</span>
              <span class="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/50">
                <span class="w-2 h-2 rotate-45" :style="{ background: rankOf(p.rank).color }" aria-hidden="true" />
                {{ rankOf(p.rank).label }}
              </span>
              <span class="w-14 text-right font-display font-black italic text-xl tabular-nums">{{ p.elo }}</span>
            </li>
          </ol>
        </template>
        <p v-else class="relative mt-8 text-white/50">{{ live ? "Aún no hay jugadores en el ranking." : "Cargando…" }}</p>
      </div>

      <!-- Cartas más usadas -->
      <div class="live-card rounded-[28px] bg-paper text-night p-6 md:p-8 flex flex-col">
        <div class="flex items-end justify-between gap-4">
          <div>
            <span class="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-indigo">Meta del mes</span>
            <h2 class="mt-1 font-display font-black italic uppercase text-4xl md:text-5xl leading-none">Lo más jugado</h2>
          </div>
          <span class="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-night/45">% de mazos</span>
        </div>
        <p class="mt-3 text-sm text-night/60">Cartas presentes en más mazos activos del último mes (sin energías básicas).</p>

        <ol v-if="live?.top_cards.length" class="mt-6 space-y-3">
          <li
            v-for="(c, i) in live.top_cards"
            :key="c.id"
            class="group flex items-center gap-4 rounded-2xl p-2 -mx-2 transition-colors hover:bg-night/[0.05]"
            :title="`${c.name}: en ${c.decks} mazos (${c.pct}%)`"
          >
            <!-- Miniatura (o dorso con el número si no está en el archivo) -->
            <div
              class="relative w-11 shrink-0 aspect-[63/88] overflow-hidden rounded-md shadow-[0_6px_14px_-6px_rgba(16,13,38,0.5)] transition-transform group-hover:-rotate-3"
            >
              <img
                v-if="cardImage(c.number)"
                :src="cardImage(c.number)"
                :alt="c.name"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                v-else
                class="w-full h-full grid place-items-center bg-gradient-to-br from-indigo to-indigo3 font-mono text-[0.55rem] leading-tight text-white/80 text-center px-0.5"
              >
                {{ c.number ?? "—" }}
              </div>
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-baseline gap-3">
                <span class="flex-1 min-w-0 truncate font-display font-black italic uppercase text-xl">{{ c.name }}</span>
                <span class="font-display font-black italic text-2xl tabular-nums">{{ c.pct }}<span class="text-base">%</span></span>
              </div>
              <div class="mt-1.5 h-2 rounded-full bg-night/10 overflow-hidden">
                <div
                  class="h-full rounded-full transition-[width] duration-700"
                  :class="i === 0 ? 'bg-indigo' : 'bg-indigo2'"
                  :style="{ width: `${c.pct}%` }"
                />
              </div>
              <div class="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-night/45">
                {{ c.decks }} mazos{{ c.number ? ` · ${c.number}` : "" }}
              </div>
            </div>
          </li>
        </ol>
        <p v-else class="mt-6 text-night/55">{{ live ? "Todavía no hay datos." : "Cargando…" }}</p>

        <div class="mt-auto pt-8">
          <NuxtLink to="/cartas" class="btn-dark">
            Ver archivo de cartas <AppIcon name="arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
