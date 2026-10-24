<script setup lang="ts">
import gsap from "gsap";

const scrollContainer = ref<HTMLElement | null>(null);
const loaderVisible = ref(true);
const loadProgress = ref(0);

const { canvasRef, init } = useScrollFrames({
  startFrame: 77,
  endFrame: 192,
  videoWidth: 1280,
  videoHeight: 720,
  scrollContainer,
  framePath: (n) => `/frames/png/frame_${n}.png`,
  onProgress: (pct) => {
    loadProgress.value = pct;
  },
  onReady: () => {
    loaderVisible.value = false;
  },
});

const titleLines = ["Un nuevo", "Comienzo"];
const sparkles = [
  { x: "47%", y: "18%", s: 46 },
  { x: "58%", y: "34%", s: 22 },
  { x: "88%", y: "16%", s: 30 },
  { x: "72%", y: "72%", s: 18 },
  { x: "12%", y: "86%", s: 16 },
];

onMounted(() => init());

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    // Entrada
    gsap
      .timeline({ delay: 0.3 })
      .from(".hero-aqua", {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        duration: 1.1,
        ease: "power4.inOut",
      })
      .from(
        ".hero-indigo",
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          duration: 1.1,
          ease: "power4.inOut",
        },
        "<0.08",
      )
      .from(
        ".hero-line > span",
        { yPercent: 110, duration: 0.9, stagger: 0.09, ease: "power4.out" },
        "-=0.45",
      )
      .from(
        ".hero-fade",
        { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        "-=0.5",
      )
      .from(
        ".hero-sparkle",
        {
          scale: 0,
          rotate: -90,
          duration: 0.8,
          stagger: 0.07,
          ease: "back.out(2)",
        },
        "-=0.8",
      );

    gsap.to(".hero-sparkle", {
      scale: 0.6,
      opacity: 0.5,
      rotate: 45,
      duration: 1.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.35, from: "random" },
      delay: 2,
    });

    // Scroll: el texto se aleja y el panel índigo se repliega
    gsap
      .timeline({
        scrollTrigger: {
          trigger: scrollContainer.value,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      })
      .to(".hero-copy", { yPercent: -18, autoAlpha: 0, ease: "power1.in" }, 0.35)
      .to(".hero-ghost", { xPercent: -30, ease: "none" }, 0);
  });

  mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: scrollContainer.value,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      })
      // Los paneles se deslizan juntos hacia la izquierda (transform, no clip-path)
      .to(".hero-panels", { xPercent: -42, ease: "none" }, 0.35)
      .to(".hero-canvas-wrap", { xPercent: -22, scale: 1.08, ease: "none" }, 0.35);
  });
}, scrollContainer);
</script>

<template>
  <Transition name="fade">
    <div
      v-if="loaderVisible"
      class="fixed inset-0 z-[900] bg-indigo flex flex-col items-center justify-center gap-6"
    >
      <span class="sparkle w-12 h-12 bg-aqua animate-spin [animation-duration:2.4s]" />
      <p class="font-display font-black italic text-[3.2rem] tracking-[0.02em] text-white">
        NEO<span class="text-aqua">CAOH</span>
      </p>
      <div class="w-56 h-[3px] bg-white/15 rounded-full overflow-hidden">
        <div
          class="h-full bg-aqua rounded-full transition-[width] duration-100"
          :style="{ width: loadProgress + '%' }"
        />
      </div>
      <p class="font-mono text-[0.7rem] tracking-[0.3em] text-white/60">
        {{ loadProgress }}%
      </p>
    </div>
  </Transition>

  <div ref="scrollContainer" class="relative bg-white" style="height: 300vh">
    <div class="sticky top-0 h-[100svh] overflow-hidden">
      <!-- Texto fantasma -->
      <span
        class="hero-ghost absolute bottom-[-4vw] left-[30%] font-display font-black italic text-[22vw] leading-none text-paper whitespace-nowrap select-none pointer-events-none"
        aria-hidden="true"
        >NEO TCG</span
      >

      <!-- Secuencia de frames -->
      <div
        class="hero-canvas-wrap absolute inset-0 flex items-end md:items-center justify-center md:justify-end md:pr-[2vw] pb-[2vh] md:pb-0"
      >
        <canvas
          ref="canvasRef"
          class="hero-canvas block w-[115%] max-w-none md:w-[68vw] md:max-w-[1100px] h-auto mix-blend-multiply"
        />
      </div>

      <!-- Paneles diagonales -->
      <div class="hero-panels absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="hero-aqua absolute inset-0 bg-aqua" />
      <div class="hero-indigo absolute inset-0 bg-indigo overflow-hidden">
        <span class="stripes absolute -left-10 bottom-0 w-[38%] h-[40%] text-white/[0.06]" />
        <span
          class="absolute w-0 h-0 border-y-[18px] border-y-transparent border-l-[30px] border-l-aqua/80 left-[40%] top-[62%] rotate-12 hidden md:block"
        />
        <span
          class="absolute w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white/40 left-[8%] top-[20%] -rotate-12"
        />
      </div>
      </div>

      <!-- Destellos -->
      <span
        v-for="(s, i) in sparkles"
        :key="i"
        class="hero-sparkle sparkle absolute bg-aqua pointer-events-none"
        :style="{ left: s.x, top: s.y, width: s.s + 'px', height: s.s + 'px' }"
        aria-hidden="true"
      />

      <!-- Copy -->
      <div
        class="hero-copy relative z-[5] h-full flex flex-col justify-start md:justify-center pt-28 md:pt-24 px-6 md:pl-[8vw] md:pr-0 md:max-w-[52vw]"
      >
        <p class="hero-fade eyebrow-wide text-white/70 mb-6">
          Simulador · Pokémon · TCG
        </p>
        <h1
          class="font-display font-black italic uppercase text-white leading-[0.86] tracking-[-0.01em]"
          style="font-size: clamp(3.6rem, min(9.5vw, 15vh), 9.5rem)"
        >
          <span
            v-for="(line, i) in titleLines"
            :key="line"
            class="hero-line block overflow-hidden pr-[0.08em]"
            :class="i === 1 ? 'text-aqua' : ''"
          >
            <span class="block">{{ line }}</span>
          </span>
        </h1>
        <p
          class="hero-fade self-start mt-5 -ml-1 bg-night text-white font-display font-bold italic uppercase text-base md:text-lg tracking-[0.12em] px-5 py-1.5 -skew-x-12"
        >
          <span class="block skew-x-12">El simulador de la comunidad hispana</span>
        </p>
        <ul
          class="hero-fade mt-5 space-y-1.5 font-display font-semibold text-[0.8rem] tracking-[0.22em] uppercase text-white/75 list-none"
        >
          <li>Construye tu mazo</li>
          <li>Desafía a entrenadores de todo el mundo</li>
          <li>Gratis, para siempre</li>
        </ul>
        <div class="hero-fade flex flex-wrap gap-3 mt-9">
          <NuxtLink to="/play" class="btn-primary">▶ Jugar ahora</NuxtLink>
          <NuxtLink to="/cartas" class="btn-outline">Ver cartas</NuxtLink>
        </div>
      </div>

      <!-- Indicador de scroll -->
      <div
        class="hero-fade absolute right-5 md:right-8 bottom-8 z-[6] hidden sm:flex flex-col items-center gap-3 text-night"
      >
        <span
          class="font-display font-bold text-[0.62rem] tracking-[0.4em] uppercase"
          style="writing-mode: vertical-rl"
          >Scroll</span
        >
        <span class="relative block w-px h-16 bg-night/15 overflow-hidden">
          <span class="scroll-needle absolute inset-x-0 top-0 h-1/2 bg-indigo" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Corte diagonal estilo groxi: en móvil el panel ocupa la parte superior */
.hero-indigo {
  clip-path: polygon(0 0, 100% 0, 100% 58%, 0 80%);
}
.hero-aqua {
  clip-path: polygon(0 0, 100% 0, 100% 60%, 0 82%);
}
@media (min-width: 768px) {
  .hero-indigo {
    clip-path: polygon(0 0, 60% 0, 38% 100%, 0 100%);
  }
  .hero-aqua {
    clip-path: polygon(0 0, 61.5% 0, 39.5% 100%, 0 100%);
  }
}

/* Difumina los bordes del frame (fondo no del todo blanco + marca de agua) */
.hero-canvas {
  -webkit-mask-image: radial-gradient(ellipse 46% 50% at 50% 50%, #000 70%, transparent 100%);
  mask-image: radial-gradient(ellipse 46% 50% at 50% 50%, #000 70%, transparent 100%);
}

.scroll-needle {
  animation: needle 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes needle {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(200%);
  }
}
</style>
