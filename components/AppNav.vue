<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Cartas", to: "/cartas" },
  { label: "Noticias", to: "/blog" },
  { label: "Descargar", to: "/descargar" },
];

const route = useRoute();
const navRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const pillRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);
const menuOpen = ref(false);
const scrolled = ref(false);

const isActive = (to: string) =>
  to === "/" ? route.path === "/" : route.path.startsWith(to);

// Mueve la píldora blanca hacia el link indicado (o el activo)
function movePill(target?: HTMLElement | null, instant = false) {
  const list = listRef.value;
  const pill = pillRef.value;
  if (!list || !pill) return;
  const el =
    target ?? list.querySelector<HTMLElement>("[data-active='true']");
  if (!el) {
    gsap.to(pill, { autoAlpha: 0, duration: 0.25 });
    return;
  }
  const listBox = list.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  gsap.to(pill, {
    x: box.left - listBox.left,
    width: box.width,
    autoAlpha: 1,
    duration: instant ? 0 : 0.5,
    ease: "power3.out",
  });
}

let hideTrigger: ScrollTrigger | undefined;

onMounted(() => {
  nextTick(() => movePill(null, true));
  document.fonts?.ready.then(() => movePill(null, true));
  window.addEventListener("resize", onResize);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Oculta al bajar, muestra al subir
  hideTrigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      scrolled.value = self.scroll() > 40;
      if (menuOpen.value) return;
      const hide = self.direction === 1 && self.scroll() > 240;
      gsap.to(navRef.value, {
        yPercent: hide ? -160 : 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
  });
});

onBeforeUnmount(() => {
  hideTrigger?.kill();
  window.removeEventListener("resize", onResize);
});

function onResize() {
  movePill(null, true);
}

watch(
  () => route.path,
  () => {
    menuOpen.value = false;
    nextTick(() => movePill());
  },
);

// Menú móvil
watch(menuOpen, (open) => {
  const menu = menuRef.value;
  if (!menu) return;
  document.documentElement.style.overflow = open ? "hidden" : "";
  if (open) {
    gsap.set(menu, { display: "flex" });
    gsap
      .timeline()
      .fromTo(
        menu,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.6,
          ease: "power4.inOut",
        },
      )
      .from(
        menu.querySelectorAll(".m-link"),
        { yPercent: 110, duration: 0.6, stagger: 0.07, ease: "power3.out" },
        "-=0.2",
      );
  } else {
    gsap.to(menu, {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => gsap.set(menu, { display: "none" }),
    });
  }
});
</script>

<template>
  <header class="fixed top-3 md:top-4 inset-x-0 z-[800] px-4 pointer-events-none">
    <nav
      ref="navRef"
      class="nav-bar pointer-events-auto mx-auto max-w-[1180px] flex items-center justify-between gap-4 h-[60px] pl-7 pr-2.5 text-white transition-shadow duration-300"
      :class="scrolled ? 'shadow-[0_18px_40px_-12px_rgba(16,13,38,0.65)]' : ''"
      aria-label="Principal"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-display font-black italic text-[1.55rem] tracking-[0.02em] no-underline shrink-0"
      >
        <span class="sparkle w-4 h-4 bg-aqua" aria-hidden="true" />
        NEO<span class="text-aqua">CAOH</span>
      </NuxtLink>

      <!-- Links desktop -->
      <ul
        ref="listRef"
        class="relative hidden md:flex items-center list-none"
        @mouseleave="movePill()"
      >
        <span
          ref="pillRef"
          class="absolute left-0 top-1/2 -translate-y-1/2 h-10 rounded-full bg-white opacity-0 pointer-events-none"
          aria-hidden="true"
        />
        <li v-for="link in links" :key="link.to" class="relative">
          <NuxtLink
            :to="link.to"
            :data-active="isActive(link.to)"
            class="nav-link relative z-[1] flex items-center gap-2 h-10 px-5 font-display font-bold uppercase tracking-[0.08em] text-[0.95rem] no-underline transition-colors duration-300"
            @mouseenter="movePill($event.currentTarget as HTMLElement)"
          >
            {{ link.label }}
            <span
              v-if="isActive(link.to)"
              class="w-4 h-4 rounded-full border-[3px] border-night grid place-items-center"
              aria-hidden="true"
            >
              <span class="w-1 h-1 rounded-full bg-night" />
            </span>
          </NuxtLink>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <NuxtLink
          to="/donar"
          class="hidden lg:inline-flex items-center gap-2 h-10 px-4 rounded-full border border-white/15 text-white font-display font-bold text-[0.9rem] tracking-[0.1em] uppercase no-underline transition-colors hover:border-[#FF6B8B] hover:text-[#FF6B8B]"
          :class="isActive('/donar') ? '!border-[#FF6B8B] !text-[#FF6B8B]' : ''"
        >
          <AppIcon name="heart" class="w-4 h-4" />
          Donar
        </NuxtLink>
        <NuxtLink
          to="/play"
          class="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-aqua text-night font-display font-extrabold text-[0.9rem] tracking-[0.1em] uppercase no-underline transition-colors hover:bg-white"
        >
          <span class="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-night" aria-hidden="true" />
          Jugar en web
        </NuxtLink>

        <button
          type="button"
          class="md:hidden w-11 h-11 rounded-full bg-white/10 grid place-items-center"
          :aria-expanded="menuOpen"
          aria-label="Abrir menú"
          @click="menuOpen = !menuOpen"
        >
          <span class="relative block w-5 h-3">
            <span
              class="absolute left-0 w-full h-0.5 bg-white transition-all duration-300"
              :class="menuOpen ? 'top-1.5 rotate-45' : 'top-0'"
            />
            <span
              class="absolute left-0 w-full h-0.5 bg-white transition-all duration-300"
              :class="menuOpen ? 'top-1.5 -rotate-45' : 'top-3'"
            />
          </span>
        </button>
      </div>
    </nav>
  </header>

  <!-- Menú móvil -->
  <div
    ref="menuRef"
    class="fixed inset-0 z-[790] bg-indigo hidden flex-col justify-between px-6 pt-28 pb-10 md:hidden"
  >
    <span class="stripes absolute right-0 top-0 w-1/3 h-full text-white/[0.06]" aria-hidden="true" />
    <ul class="relative list-none space-y-2">
      <li v-for="(link, i) in links" :key="link.to" class="overflow-hidden">
        <NuxtLink
          :to="link.to"
          class="m-link flex items-baseline gap-4 font-display font-black italic text-[2.8rem] leading-[1.1] uppercase text-white no-underline"
          :class="isActive(link.to) ? 'text-aqua' : ''"
        >
          <span class="font-mono text-xs font-normal text-white/50">0{{ i + 1 }}</span>
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
    <div class="relative grid grid-cols-2 gap-3">
      <NuxtLink to="/donar" class="btn-outline w-full"><AppIcon name="heart" class="w-4 h-4" /> Donar</NuxtLink>
      <NuxtLink to="/play" class="btn-primary w-full"><AppIcon name="play" class="w-4 h-4" /> Jugar</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  background: var(--night);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.nav-link {
  color: rgba(255, 255, 255, 0.85);
}
.nav-link:hover,
.nav-link[data-active="true"] {
  color: var(--night);
}
/* Cuando el ratón está sobre otro link, el activo vuelve a blanco */
ul:hover .nav-link[data-active="true"]:not(:hover) {
  color: rgba(255, 255, 255, 0.85);
}
ul:hover .nav-link[data-active="true"]:not(:hover) span {
  border-color: currentColor;
}
ul:hover .nav-link[data-active="true"]:not(:hover) span span {
  background: currentColor;
}
</style>
