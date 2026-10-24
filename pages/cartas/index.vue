<script setup lang="ts">
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cards, energyMeta, type Card, type EnergyType } from "~/data/cards";

useHead({
  title: "Cartas — NeoCaoh",
  meta: [
    {
      name: "description",
      content:
        "Archivo de cartas de NeoCaoh: PS, ataques, debilidades y más de las cartas de Neo Genesis.",
    },
  ],
});

const route = useRoute();
const router = useRouter();

const findCard = (slug?: unknown) =>
  cards.find((c) => c.slug === slug) ?? cards[0];

const current = ref<Card>(findCard(route.query.c));
const index = computed(() => cards.indexOf(current.value));
const paddedNumber = computed(() =>
  current.value.number.split("/")[0].padStart(3, "0"),
);

// ── Cambio de carta con transición ─────────────────────
let busy = false;
const reduceMotion = () =>
  import.meta.client &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function select(slug: string, scrollTop = false) {
  const next = findCard(slug);
  if (busy || next === current.value) return;
  busy = true;

  router.replace({ query: { ...route.query, c: next.slug } });
  if (scrollTop) window.scrollTo({ top: 0, behavior: "smooth" });

  if (reduceMotion()) {
    current.value = next;
    busy = false;
    return;
  }

  await gsap
    .timeline()
    .to(".hx-line > span", {
      yPercent: -110,
      duration: 0.4,
      stagger: 0.04,
      ease: "power3.in",
    })
    .to(".hx-fade", { autoAlpha: 0, y: -12, duration: 0.3 }, 0)
    .to(
      ".hx-card",
      { rotationY: -90, autoAlpha: 0, duration: 0.4, ease: "power3.in" },
      0,
    )
    .to(".hx-ghost", { autoAlpha: 0, duration: 0.3 }, 0);

  current.value = next;
  await nextTick();

  await gsap
    .timeline()
    .fromTo(
      ".hx-line > span",
      { yPercent: 110 },
      { yPercent: 0, duration: 0.7, stagger: 0.06, ease: "power4.out" },
    )
    .fromTo(
      ".hx-fade",
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" },
      0.1,
    )
    .fromTo(
      ".hx-card",
      { rotationY: 90, autoAlpha: 0 },
      { rotationY: 0, autoAlpha: 1, duration: 0.8, ease: "power4.out" },
      0,
    )
    .to(".hx-ghost", { autoAlpha: 1, duration: 0.6 }, 0.2)
    .fromTo(
      ".atk-item",
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
      0.1,
    );

  busy = false;
}

const step = (dir: 1 | -1) =>
  select(cards[(index.value + dir + cards.length) % cards.length].slug);

watch(
  () => route.query.c,
  (slug) => {
    if (slug && slug !== current.value.slug) select(String(slug));
  },
);

// ── Filtro de colección (GSAP Flip) ────────────────────
const filters = computed(() => {
  const types = [...new Set(cards.map((c) => c.type))];
  return [
    { key: "all" as const, label: "Todas" },
    ...types.map((t) => ({ key: t, label: energyMeta[t].label })),
  ];
});
const activeFilter = ref<EnergyType | "all">("all");

function setFilter(key: EnergyType | "all") {
  if (key === activeFilter.value) return;
  if (reduceMotion()) {
    activeFilter.value = key;
    return;
  }
  const state = Flip.getState(".coll-card");
  activeFilter.value = key;
  nextTick(() => {
    Flip.from(state, {
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.03,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.04 },
        ),
    });
  });
}

// ── Animaciones de entrada / scroll ────────────────────
const root = ref<HTMLElement | null>(null);

useGsap((mm) => {
  gsap.registerPlugin(Flip);

  mm.add(MOTION_OK, () => {
    gsap
      .timeline({ delay: 0.2 })
      .from(".hx-line > span", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
      })
      .from(
        ".hx-fade",
        { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" },
        "-=0.6",
      )
      .from(
        ".hx-card",
        {
          y: 80,
          rotationY: 25,
          rotationZ: 6,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        0.1,
      )
      .from(
        ".thumb",
        { y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" },
        "-=0.8",
      );

    gsap.to(".hx-ghost", {
      xPercent: -15,
      ease: "none",
      scrollTrigger: { trigger: ".hx", start: "top top", end: "bottom top", scrub: true },
    });

    gsap.from(".atk-head > *", {
      y: 50,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: ".atk", start: "top 70%" },
    });
    gsap.from(".atk-item", {
      y: 50,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".atk-grid", start: "top 80%" },
    });
    gsap.from(".atk-stat", {
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: ".atk-stats", start: "top 90%" },
    });

    ScrollTrigger.batch(".coll-card", {
      start: "top 90%",
      once: true,
      onEnter: (els) =>
        gsap.from(els, {
          y: 60,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
        }),
    });
  });
}, root);

// El tamaño del nombre se ajusta a su longitud para que quepa en una línea
const nameSize = computed(() => {
  const len = current.value.name.length;
  return `clamp(2.6rem, ${Math.min(100 / len, 10)}vw, ${Math.min(85 / len, 9)}rem)`;
});
</script>

<template>
  <div ref="root" class="bg-night">
    <!-- ═══ Ficha principal (clara) ═══ -->
    <section
      class="hx relative bg-paper text-night overflow-hidden pt-32 md:pt-36 pb-[calc(8vw+3rem)]"
    >
      <span
        class="hx-ghost absolute left-[-2vw] top-[16%] font-display font-black italic uppercase leading-none text-white/70 whitespace-nowrap select-none pointer-events-none"
        style="font-size: 24vw"
        aria-hidden="true"
        >{{ current.name }}</span
      >
      <span
        class="sparkle absolute w-10 h-10 bg-indigo right-[8%] top-[18%] hidden md:block"
        aria-hidden="true"
      />
      <span
        class="sparkle absolute w-5 h-5 bg-aqua right-[44%] bottom-[22%] hidden md:block"
        aria-hidden="true"
      />

      <div
        class="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center px-6 md:px-[6vw] max-w-[1400px] mx-auto"
      >
        <!-- Datos -->
        <div class="order-2 lg:order-1">
          <p class="hx-fade eyebrow-wide text-night/45 mb-5">
            {{ current.set }} archives
          </p>

          <div class="flex items-stretch gap-3 md:gap-4">
            <span class="hx-fade bracket-num text-night/70 self-center">
              {{ paddedNumber }}
            </span>
            <span class="hx-fade stripes w-5 md:w-7 shrink-0 text-night" aria-hidden="true" />
            <h1
              class="font-display font-black italic uppercase leading-[0.9] tracking-[-0.01em]"
              :style="{ fontSize: nameSize }"
            >
              <span class="hx-line block overflow-hidden py-[0.04em]">
                <span class="block">{{ current.name }}</span>
              </span>
            </h1>
          </div>

          <p class="hx-fade mt-6 font-display font-bold text-sm tracking-[0.12em] uppercase text-indigo">
            {{ current.species }}
            <span class="text-night/30 mx-2">/</span>
            Nv. {{ current.level }}
            <span class="text-night/30 mx-2">/</span>
            Nº {{ current.dex }}
          </p>
          <p class="hx-fade mt-4 max-w-[480px] text-night/70 leading-relaxed">
            {{ current.flavor }}
          </p>

          <div class="hx-fade flex flex-wrap gap-2 mt-7">
            <span
              class="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white font-display font-bold text-sm"
            >
              <img :src="energyMeta[current.type].icon" alt="" class="w-7 h-7" />
              {{ energyMeta[current.type].label }}
            </span>
            <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-night text-white font-display font-black italic text-sm">
              {{ current.hp }} PS
            </span>
            <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-white font-display font-bold text-sm">
              {{ current.stage }}<template v-if="current.evolvesFrom">&nbsp;· de {{ current.evolvesFrom }}</template>
            </span>
            <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-white font-display font-bold text-sm">
              {{ current.rarity }}
            </span>
          </div>

          <div class="hx-fade flex flex-wrap items-center gap-3 mt-9">
            <a href="#ataques" class="btn-dark">Ver ataques</a>
            <div class="flex gap-2">
              <button
                type="button"
                class="w-[52px] h-[52px] rounded-full border-2 border-night/20 grid place-items-center font-display font-black italic transition-colors hover:border-night hover:bg-night hover:text-white"
                aria-label="Carta anterior"
                @click="step(-1)"
              >
                ←
              </button>
              <button
                type="button"
                class="w-[52px] h-[52px] rounded-full border-2 border-night/20 grid place-items-center font-display font-black italic transition-colors hover:border-night hover:bg-night hover:text-white"
                aria-label="Carta siguiente"
                @click="step(1)"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <!-- Carta -->
        <div class="order-1 lg:order-2 flex justify-center [perspective:1200px]">
          <CardTilt class="hx-card w-[min(78vw,400px)] rounded-[18px]" :max="10">
            <img
              :src="current.image"
              :alt="`Carta ${current.name} ${current.number}`"
              class="w-full rounded-[18px] shadow-[0_50px_80px_-30px_rgba(16,13,38,0.55)]"
            />
          </CardTilt>
        </div>
      </div>

      <!-- Selector -->
      <div class="relative mt-14 px-6 md:px-[6vw] max-w-[1400px] mx-auto">
        <div class="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 thumbs">
          <button
            v-for="c in cards"
            :key="c.slug"
            type="button"
            class="thumb shrink-0 w-[68px] md:w-[78px] rounded-lg overflow-hidden ring-offset-2 ring-offset-paper transition-all duration-300"
            :class="
              c.slug === current.slug
                ? 'ring-[3px] ring-indigo -translate-y-1'
                : 'opacity-50 hover:opacity-100'
            "
            :aria-label="`Ver ${c.name}`"
            :aria-pressed="c.slug === current.slug"
            @click="select(c.slug)"
          >
            <img :src="c.image" alt="" class="w-full block" loading="lazy" />
          </button>
        </div>
      </div>
    </section>

    <!-- ═══ Ataques (oscura, corte diagonal) ═══ -->
    <section
      id="ataques"
      class="atk relative bg-night text-white overflow-hidden -mt-[8vw] pt-[calc(8vw+5rem)] pb-24 px-6 md:px-[6vw] scroll-mt-0"
    >
      <span
        class="absolute right-[-3vw] bottom-[-3vw] font-display font-black italic uppercase leading-none text-outline whitespace-nowrap select-none pointer-events-none"
        style="font-size: 18vw"
        aria-hidden="true"
        >{{ current.name }}</span
      >

      <div class="relative max-w-[1300px] mx-auto">
        <div class="atk-head flex items-center justify-center gap-4 mb-16">
          <span class="stripes w-9 h-14 md:w-12 md:h-[4.5rem] text-white" aria-hidden="true" />
          <h2
            class="font-display font-black italic leading-none"
            style="font-size: clamp(2.6rem, 6vw, 5rem)"
          >
            Ataques
          </h2>
        </div>

        <div
          class="atk-grid grid gap-12 md:gap-10"
          :class="
            (current.power ? 1 : 0) + current.attacks.length >= 3
              ? 'md:grid-cols-3'
              : 'md:grid-cols-2'
          "
        >
          <!-- Poder Pokémon -->
          <article v-if="current.power" :key="current.slug + '-power'" class="atk-item">
            <div class="flex items-center gap-2 h-12">
              <span
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-scarlet font-display font-black italic text-[0.68rem] tracking-[0.2em] uppercase"
              >
                <span class="sparkle w-3 h-3 bg-white" aria-hidden="true" />
                Poder Pokémon
              </span>
            </div>
            <h3 class="font-display font-black italic uppercase text-3xl md:text-[2.2rem] leading-none mt-4">
              {{ current.power.name }}
            </h3>
            <p class="mt-3 text-white/60 leading-relaxed text-[0.95rem]">
              {{ current.power.text }}
            </p>
          </article>

          <article
            v-for="a in current.attacks"
            :key="current.slug + a.name"
            class="atk-item"
          >
            <div class="flex items-center justify-between gap-4 h-12">
              <span class="flex items-center -space-x-1.5">
                <img
                  v-for="(e, i) in a.cost"
                  :key="i"
                  :src="energyMeta[e].icon"
                  :alt="energyMeta[e].label"
                  :title="energyMeta[e].label"
                  class="w-9 h-9 rounded-full ring-2 ring-night"
                />
              </span>
              <span
                v-if="a.damage"
                class="font-display font-black italic text-aqua leading-none"
                style="font-size: clamp(2.2rem, 4vw, 3rem)"
                >{{ a.damage }}</span
              >
            </div>
            <h3 class="font-display font-black italic uppercase text-3xl md:text-[2.2rem] leading-none mt-4">
              {{ a.name }}
            </h3>
            <p v-if="a.text" class="mt-3 text-white/60 leading-relaxed text-[0.95rem]">
              {{ a.text }}
            </p>
          </article>
        </div>

        <!-- Datos técnicos -->
        <dl
          class="atk-stats grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-20 border-t border-white/10"
        >
          <div class="atk-stat pt-6 pr-4">
            <dt class="stat-lbl">Debilidad</dt>
            <dd class="stat-val">
              <template v-if="current.weakness">
                <img :src="energyMeta[current.weakness].icon" alt="" class="w-6 h-6" />
                {{ energyMeta[current.weakness].label }} ×2
              </template>
              <template v-else>—</template>
            </dd>
          </div>
          <div class="atk-stat pt-6 pr-4">
            <dt class="stat-lbl">Resistencia</dt>
            <dd class="stat-val">
              <template v-if="current.resistance">
                <img :src="energyMeta[current.resistance.type].icon" alt="" class="w-6 h-6" />
                {{ current.resistance.value }}
              </template>
              <template v-else>—</template>
            </dd>
          </div>
          <div class="atk-stat pt-6 pr-4">
            <dt class="stat-lbl">Retirada</dt>
            <dd class="stat-val">
              <template v-if="current.retreat">
                <img
                  v-for="n in current.retreat"
                  :key="n"
                  :src="energyMeta.colorless.icon"
                  alt=""
                  class="w-6 h-6"
                />
              </template>
              <template v-else>Gratis</template>
            </dd>
          </div>
          <div class="atk-stat pt-6 pr-4">
            <dt class="stat-lbl">Expansión</dt>
            <dd class="stat-val">{{ current.set }}</dd>
          </div>
          <div class="atk-stat pt-6 pr-4">
            <dt class="stat-lbl">Número</dt>
            <dd class="stat-val">{{ current.number }}</dd>
          </div>
          <div class="atk-stat pt-6 pr-4">
            <dt class="stat-lbl">Ilustración</dt>
            <dd class="stat-val">{{ current.illustrator }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- ═══ Colección ═══ -->
    <section class="coll relative bg-indigo text-white px-6 md:px-[6vw] pt-[calc(6vw+5rem)] pb-28 -mt-[6vw] overflow-hidden">
      <span
        class="stripes absolute right-0 top-0 w-[26%] h-full text-white/[0.05]"
        aria-hidden="true"
      />
      <div class="relative max-w-[1300px] mx-auto">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div class="sec-head">
            <span class="sec-head-sub text-aqua">
              <span class="stripes w-8 h-5 text-aqua" />
              Colección
            </span>
            <h2 class="sec-head-big">collection</h2>
          </div>

          <div class="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
            <button
              v-for="f in filters"
              :key="f.key"
              type="button"
              class="inline-flex items-center gap-2 h-11 rounded-full font-display font-bold text-sm transition-colors duration-300"
              :class="[
                f.key === 'all' ? 'px-5' : 'pl-1.5 pr-4',
                activeFilter === f.key
                  ? 'bg-white text-night'
                  : 'bg-white/10 text-white hover:bg-white/20',
              ]"
              :aria-pressed="activeFilter === f.key"
              @click="setFilter(f.key)"
            >
              <img
                v-if="f.key !== 'all'"
                :src="energyMeta[f.key].icon"
                alt=""
                class="w-8 h-8"
              />
              {{ f.label }}
            </button>
          </div>
        </div>

        <div class="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-10">
          <button
            v-for="c in cards"
            v-show="activeFilter === 'all' || c.type === activeFilter"
            :key="c.slug"
            :data-flip-id="c.slug"
            type="button"
            class="coll-card group text-left"
            @click="select(c.slug, true)"
          >
            <span
              class="block rounded-[12px] overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1.5deg]"
              :class="c.slug === current.slug ? 'ring-[3px] ring-aqua ring-offset-4 ring-offset-indigo' : ''"
            >
              <img
                :src="c.image"
                :alt="c.name"
                class="w-full block shadow-[0_25px_50px_-20px_rgba(16,13,38,0.9)]"
                loading="lazy"
              />
            </span>
            <span class="flex items-center justify-between gap-2 mt-4">
              <span class="font-display font-black italic uppercase tracking-[0.03em] truncate">
                {{ c.name }}
              </span>
              <span class="flex items-center gap-1.5 shrink-0 font-display font-bold text-sm text-white/70">
                <img :src="energyMeta[c.type].icon" alt="" class="w-5 h-5" />
                {{ c.hp }}
              </span>
            </span>
            <span class="block font-mono text-[0.65rem] tracking-[0.2em] text-white/45 mt-1">
              {{ c.number }} · {{ c.rarity }}
            </span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.atk {
  clip-path: polygon(0 8vw, 100% 0, 100% 100%, 0 100%);
}
.coll {
  clip-path: polygon(0 0, 100% 6vw, 100% 100%, 0 100%);
}
.text-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.07);
}
.stat-lbl {
  @apply font-display font-bold text-[0.65rem] tracking-[0.3em] uppercase text-white/40 mb-2;
}
.stat-val {
  @apply flex items-center gap-1.5 font-display font-bold text-[0.95rem] text-white;
}
.thumbs {
  scrollbar-width: thin;
}
</style>
