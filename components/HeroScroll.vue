<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    startFrame?: number;
    endFrame?: number;
  }>(),
  {
    startFrame: 77,
    endFrame: 192,
  },
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const scrollRef = ref<HTMLDivElement | null>(null);
const loadPct = ref(0);
const loaded = ref(false);
const hydrated = ref(false);

let images: HTMLImageElement[] = [];
let currentIdx = -1;
let tickPending = false;
let mountTime = 0;

const frameCount = computed(() => props.endFrame - props.startFrame + 1);

onMounted(() => {
  mountTime = performance.now();
  hydrated.value = true;

  const canvas = canvasRef.value!;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 1280 * dpr;
  canvas.height = 720 * dpr;
  canvas.style.width = "100%";
  canvas.style.height = "auto";
  canvas.getContext("2d")!.scale(dpr, dpr);

  let loadedCount = 0;
  for (let i = props.startFrame; i <= props.endFrame; i++) {
    const img = new Image();
    img.src = `/frames/png/frame_${String(i).padStart(4, "0")}.png`;
    img.onload = img.onerror = () => {
      loadedCount++;
      loadPct.value = Math.round((loadedCount / frameCount.value) * 100);
      if (loadedCount === frameCount.value) init();
    };
    images.push(img);
  }
  setTimeout(() => {
    if (!loaded.value) init();
  }, 3200);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  images = [];
});

function init() {
  if (loaded.value) return;

  // Garantiza al menos 650ms de loader para evitar el "pestañeo" si las imágenes están en caché
  const elapsed = performance.now() - mountTime;
  const minWait = Math.max(0, 650 - elapsed);

  // Dibujamos el primer frame antes de quitar el loader
  drawFrame(0);

  setTimeout(() => {
    requestAnimationFrame(() => {
      loaded.value = true;
      window.addEventListener("scroll", onScroll, { passive: true });
    });
  }, minWait);
}

function drawFrame(idx: number) {
  if (idx === currentIdx) return;
  const img = images[idx];
  if (!img || !img.complete || !img.naturalWidth) return;
  const ctx = canvasRef.value?.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, 1280, 720);
  ctx.drawImage(img, 0, 0, 1280, 720);
  currentIdx = idx;
}

function onScroll() {
  if (tickPending) return;
  tickPending = true;
  requestAnimationFrame(() => {
    const el = scrollRef.value;
    if (!el) return;
    const max = el.scrollHeight - window.innerHeight;
    const rawFrac = Math.max(
      0,
      Math.min(1, (window.scrollY - el.offsetTop) / max),
    );
    const frac = rawFrac * rawFrac * (3 - 2 * rawFrac);
    const targetFrame = frac * (frameCount.value - 1);
    const frameIndex = Math.min(frameCount.value - 1, Math.floor(targetFrame));
    drawFrame(frameIndex);
    tickPending = false;
  });
}
</script>

<template>
  <!-- Fallback hexadecimal directo (#0a0614) para que jamás pinte blanco al iniciar -->
  <div
    ref="scrollRef"
    class="relative"
    style="
      height: 600vh;
      background-color: #0a0614;
      background: var(--ink2, #0a0614);
    "
  >
    <div
      class="sticky top-0 h-screen overflow-hidden"
      style="background-color: #0a0614"
    >
      <!-- Orbs de fondo (aparecen suavemente solo tras cargar para no chocar con el loader) -->
      <div
        class="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        :style="{ opacity: loaded ? 1 : 0 }"
      >
        <div
          class="absolute rounded-full"
          style="
            width: 560px;
            height: 560px;
            background: rgba(92, 26, 143, 0.5);
            filter: blur(90px);
            bottom: -80px;
            left: -80px;
            animation: orbDrift 9s ease-in-out infinite;
          "
        />
        <div
          class="absolute rounded-full"
          style="
            width: 480px;
            height: 480px;
            background: rgba(232, 35, 10, 0.3);
            filter: blur(90px);
            top: -60px;
            right: -60px;
            animation: orbDrift 11s ease-in-out 2s infinite reverse;
          "
        />
        <div
          class="absolute rounded-full"
          style="
            width: 360px;
            height: 360px;
            background: rgba(245, 200, 66, 0.15);
            filter: blur(90px);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: orbPulse 7s ease-in-out infinite;
          "
        />
      </div>

      <!-- Speed lines -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          class="w-full h-full opacity-[0.05]"
          viewBox="0 0 1280 720"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="slg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="white" stop-opacity="0" />
              <stop offset="50%" stop-color="white" stop-opacity="1" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g stroke="url(#slg)" stroke-width="1" fill="none">
            <line x1="0" y1="80" x2="1280" y2="640" />
            <line x1="0" y1="200" x2="1280" y2="520" />
            <line x1="0" y1="340" x2="1280" y2="380" />
            <line x1="0" y1="460" x2="1280" y2="260" />
            <line x1="0" y1="580" x2="1280" y2="140" />
            <line x1="160" y1="0" x2="1120" y2="720" />
            <line x1="380" y1="0" x2="1280" y2="720" />
          </g>
        </svg>
      </div>

      <!-- Canvas con opacity: 0 inline inicial para evitar FOUC antes de que cargue el CSS -->
      <div
        class="absolute top-0 right-0 h-full flex items-center justify-center canvas-reveal"
        :class="{ 'is-loaded': loaded }"
        style="width: 92vw"
      >
        <canvas
          ref="canvasRef"
          style="
            width: 100%;
            height: 95vh;
            object-fit: cover;
            image-rendering: high-quality;
          "
        />
      </div>

      <!-- Gradiente izquierda con color sólido de respaldo -->
      <div
        class="absolute inset-0 pointer-events-none z-10"
        style="
          background: linear-gradient(
            to right,
            #0a0614 8%,
            rgba(10, 6, 20, 0.95) 20%,
            rgba(10, 6, 20, 0.5) 35%,
            transparent 50%
          );
        "
      />

      <!-- Texto hero -->
      <div
        class="absolute inset-y-0 left-0 z-20 flex flex-col justify-center pointer-events-none"
        :class="{ 'start-anims': loaded }"
        style="width: 35%; padding-left: 4vw; padding-right: 1vw"
      >
        <div
          class="flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.3em] uppercase text-gold mb-5 hero-anim"
          style="--d: 0.25s; opacity: 0"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Simulador TCG · Pokémon · Online
        </div>

        <h1
          class="font-display font-extrabold leading-[0.88] hero-anim"
          style="--d: 0.4s; font-size: clamp(3.5rem, 6.5vw, 7.5rem); opacity: 0"
        >
          <span class="block text-white">Un Nuevo</span>
          <span class="block text-scarlet">Comienzo.</span>
        </h1>

        <p
          class="font-light text-offwhite/70 leading-[1.8] mt-5 hero-anim"
          style="
            --d: 0.55s;
            font-size: clamp(0.9rem, 1.2vw, 1.05rem);
            max-width: 360px;
            opacity: 0;
          "
        >
          Construye tu mazo, desafía a entrenadores de todo el mundo. NeoCaoh es
          el simulador Pokémon TCG de la comunidad hispana — gratis y
          competitivo.
        </p>

        <!-- Badge navegador -->
        <div
          class="flex items-center gap-2 mt-4 mb-1 hero-anim"
          style="--d: 0.7s; opacity: 0"
        >
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span
            class="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-green-400"
          >
            Disponible en navegador · Sin descarga
          </span>
        </div>

        <!-- Botones -->
        <div
          class="flex gap-3 mt-4 flex-wrap pointer-events-auto hero-anim"
          style="--d: 0.85s; opacity: 0"
        >
          <NuxtLink to="/play" class="btn-primary"
            >▶ Jugar en Navegador</NuxtLink
          >
          <NuxtLink to="/descargar" class="btn-outline">
            <span class="opacity-60 text-[0.7em] mr-1">↓</span> Descargar
          </NuxtLink>
        </div>
      </div>

      <!-- Loader con fondo hexadecimal inline para que NUNCA sea transparente o blanco -->
      <Transition name="loader-fade">
        <div
          v-if="!loaded"
          class="absolute inset-0 z-50 flex flex-col items-center justify-center gap-7"
          style="background-color: #07040e"
        >
          <div
            class="flex flex-col items-center gap-7 transition-opacity duration-300"
            :style="{ opacity: hydrated ? 1 : 0 }"
          >
            <div class="loader-ring" />
            <div
              class="font-display font-extrabold text-5xl tracking-[0.06em] text-white"
            >
              Neo<span class="text-scarlet">Caoh</span>
            </div>
            <div
              class="w-60 h-[3px] bg-white/[0.07] rounded-full overflow-hidden"
            >
              <div
                class="h-full bg-gold rounded-full transition-all duration-150 ease-out"
                :style="{ width: loadPct + '%' }"
              />
            </div>
            <div class="font-mono text-xs tracking-[0.2em] text-muted">
              {{ loadPct }}%
            </div>
          </div>
        </div>
      </Transition>

      <!-- Scroll needle -->
      <div
        class="absolute right-10 bottom-10 z-20 flex flex-col items-center gap-2 scroll-hint-anim"
        :class="{ 'is-loaded': loaded }"
        style="opacity: 0"
      >
        <span
          class="font-mono text-[0.58rem] tracking-[0.28em] uppercase text-muted"
          style="writing-mode: vertical-rl"
          >scroll</span
        >
        <div class="w-px h-14 bg-gold scroll-needle" />
      </div>
    </div>
  </div>
</template>

<!-- Bloque global sin scoped: evita el pantallazo blanco de raíz en el navegador -->
<style>
html,
body {
  background-color: #07040e !important;
}
</style>

<style scoped>
.loader-ring {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.08);
  border-top-color: #f5c842;
  border-right-color: #e8230a;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Entrada suave del Canvas */
.canvas-reveal {
  opacity: 0;
  transform: scale(1.04);
  transition:
    opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.canvas-reveal.is-loaded {
  opacity: 1;
  transform: scale(1);
}

/* Animaciones escalonadas de texto */
.hero-anim {
  opacity: 0;
  transform: translateY(24px);
  will-change: opacity, transform;
}
.start-anims .hero-anim {
  animation: riseIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--d, 0.2s) forwards;
}

@keyframes riseIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Indicador de scroll */
.scroll-hint-anim {
  opacity: 0;
  transform: translateY(12px);
}
.scroll-hint-anim.is-loaded {
  animation: fadeInScroll 1s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
}
@keyframes fadeInScroll {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-needle {
  animation: needleDrop 2s ease infinite;
}
@keyframes needleDrop {
  0% {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scaleY(1);
    transform-origin: top;
  }
}

@keyframes orbDrift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(25px, -35px);
  }
}
@keyframes orbPulse {
  0%,
  100% {
    opacity: 0.35;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.12);
  }
}

/* Transición limpia del Loader sin blur pesado que cause parpadeo de GPU */
.loader-fade-leave-active {
  transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1);
}
.loader-fade-leave-to {
  opacity: 0;
}
</style>
