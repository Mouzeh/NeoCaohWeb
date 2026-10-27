<script setup lang="ts">
import gsap from "gsap";
import { cards, energyMeta } from "~/data/cards";
import { SITE } from "~/data/site";

// Cifras en vivo del servidor del juego + ranking y cartas más usadas
const live = usePublicStats();

const stats = computed(() => [
  { key: "online", num: live.value?.online, lbl: "En línea ahora", dot: true, icon: energyMeta.lightning.icon },
  { key: "registered", num: live.value?.registered, lbl: "Entrenadores registrados", icon: energyMeta.grass.icon },
  { key: "games", num: live.value?.games, lbl: "Partidas en curso", icon: energyMeta.fire.icon },
  { key: "cards", num: live.value?.cards, lbl: "Cartas disponibles", icon: energyMeta.water.icon },
]);

const updatedAt = computed(() =>
  live.value
    ? new Date(live.value.updated_at).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
    : null,
);

// Frases de la cinta en vivo
const ticker = computed(() => {
  const d = live.value;
  if (!d) return [`NeoCaoh ${SITE.version}`, "Conectando con el servidor…"];
  const lead = d.ranking[0];
  const card = d.top_cards[0];
  return [
    `${d.online} en línea ahora`,
    `${d.games} ${d.games === 1 ? "partida" : "partidas"} en curso`,
    lead && `Líder: ${lead.username} · ${lead.elo} ELO`,
    card && `Carta del mes: ${card.name} · ${card.pct}%`,
    `NeoCaoh ${SITE.version}`,
    `Actualizado ${updatedAt.value}`,
  ].filter(Boolean) as string[];
});

const root = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
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
    // La cinta corre sin fin: el contenido va duplicado y se mueve media pista
    gsap.to(track.value, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    gsap.from(".live-ribbon", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1,
      ease: "power4.inOut",
      scrollTrigger: { trigger: root.value, start: "top 85%" },
    });
    gsap.from(".stat-cell", {
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
    <!-- Cinta en vivo -->
    <div class="relative -mx-[5vw] overflow-hidden py-4" aria-label="Datos en vivo del servidor">
      <div class="live-ribbon -skew-y-1 bg-aqua text-night py-3">
        <div ref="track" class="flex w-max">
          <div v-for="copy in 2" :key="copy" class="flex shrink-0" :aria-hidden="copy === 2">
            <span
              v-for="(t, i) in ticker"
              :key="i"
              class="flex items-center gap-5 pr-5 font-display font-black italic uppercase text-lg md:text-xl tracking-[0.06em] whitespace-nowrap"
            >
              <span v-if="i === 0" class="inline-flex items-center gap-2">
                <span class="relative flex w-2.5 h-2.5" aria-hidden="true">
                  <span class="absolute inset-0 rounded-full bg-night animate-ping opacity-60" />
                  <span class="relative w-2.5 h-2.5 rounded-full bg-night" />
                </span>
                En vivo
              </span>
              <span v-if="i === 0" class="sparkle w-3.5 h-3.5 bg-night" aria-hidden="true" />
              {{ t }}
              <span class="sparkle w-3.5 h-3.5 bg-night" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cifras -->
    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        v-for="s in stats"
        :key="s.key"
        class="stat-cell relative overflow-hidden rounded-[22px] p-5 md:p-6"
        :class="s.dot ? 'bg-indigo' : 'bg-panel'"
      >
        <div class="flex items-start justify-between gap-3">
          <span
            class="font-display font-bold text-[0.72rem] tracking-[0.2em] uppercase leading-snug"
            :class="s.dot ? 'text-white/85' : 'text-white/55'"
          >
            {{ s.lbl }}
          </span>
          <img :src="s.icon" alt="" class="w-7 h-7 shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]" />
        </div>
        <div
          class="font-display font-black italic leading-none text-white mt-4 tabular-nums"
          style="font-size: clamp(2.6rem, 5.5vw, 4.8rem)"
        >
          {{ s.num == null ? "—" : fmt(shown[s.key] ?? 0) }}
        </div>
        <span
          class="stripes absolute -right-2 -bottom-2 w-16 h-10 opacity-20"
          :class="s.dot ? 'text-white' : 'text-aqua'"
          aria-hidden="true"
        />
      </div>
    </div>

    <div class="mt-8 flex flex-wrap items-center justify-between gap-4">
      <p class="font-display font-bold italic uppercase tracking-[0.12em] text-white/60">
        ¿Quién manda en la mesa esta temporada?
      </p>
      <NuxtLink to="/ranking" class="btn-outline !py-3">
        Ver ranking y meta <AppIcon name="arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </section>
</template>
