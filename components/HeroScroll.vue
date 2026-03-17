<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    startFrame?: number;
    endFrame?: number;
  }>(),
  {
    startFrame: 40,
    endFrame: 192,
  },
);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const scrollRef = ref<HTMLDivElement | null>(null);
const loadPct = ref(0);
const loaded = ref(false);

let images: HTMLImageElement[] = [];
let currentIdx = -1;
let tickPending = false;

const frameCount = computed(() => props.endFrame - props.startFrame + 1);

onMounted(() => {
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
    img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
    img.onload = img.onerror = () => {
      loadedCount++;
      loadPct.value = Math.round((loadedCount / frameCount.value) * 100);
      if (loadedCount === frameCount.value) init();
    };
    images.push(img);
  }
  setTimeout(() => {
    if (!loaded.value) init();
  }, 2800);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  images = [];
});

function init() {
  if (loaded.value) return;
  loaded.value = true;
  drawFrame(0);
  window.addEventListener("scroll", onScroll, { passive: true });
}

function drawFrame(idx: number) {
  if (idx === currentIdx) return;
  const img = images[idx];
  if (!img || !img.complete || !img.naturalWidth) return;
  const ctx = canvasRef.value!.getContext("2d")!;
  ctx.clearRect(0, 0, 1280, 720);
  ctx.drawImage(img, 0, 0, 1280, 720);
  currentIdx = idx;
}

function onScroll() {
  if (tickPending) return;
  tickPending = true;
  requestAnimationFrame(() => {
    const el = scrollRef.value!;
    const max = el.scrollHeight - window.innerHeight;
    const rawFrac = Math.max(
      0,
      Math.min(1, (window.scrollY - el.offsetTop) / max),
    );

    // Suavizar la fracción con easing para movimiento más fluido
    const frac = rawFrac * rawFrac * (3 - 2 * rawFrac); // smoothstep

    // Interpolación más suave entre frames
    const targetFrame = frac * (frameCount.value - 1);
    const frameIndex = Math.min(frameCount.value - 1, Math.floor(targetFrame));

    drawFrame(frameIndex);
    tickPending = false;
  });
}
</script>

<template>
  <div
    ref="scrollRef"
    class="relative"
    style="height: 600vh; background: var(--ink2)"
  >
    <div class="sticky top-0 h-screen overflow-hidden">
      <!-- Orbs de fondo -->
      <div
        class="absolute rounded-full pointer-events-none"
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
        class="absolute rounded-full pointer-events-none"
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
        class="absolute rounded-full pointer-events-none"
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

      <!-- ── Canvas: pegado a la derecha, 92vw de ancho para imagen mucho más grande ── -->
      <div
        class="absolute top-0 right-0 h-full flex items-center justify-center"
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

      <!-- Gradiente izquierda para separar texto del canvas -->
      <div
        class="absolute inset-0 pointer-events-none z-10"
        style="
          background: linear-gradient(
            to right,
            var(--ink2) 8%,
            rgba(10, 6, 20, 0.95) 20%,
            rgba(10, 6, 20, 0.5) 35%,
            transparent 50%
          );
        "
      />

      <!-- ── Texto hero — columna izquierda ── -->
      <div
        class="absolute inset-y-0 left-0 z-20 flex flex-col justify-center pointer-events-none"
        style="width: 35%; padding-left: 4vw; padding-right: 1vw"
      >
        <div
          class="flex items-center gap-3 font-mono text-[0.68rem] tracking-[0.3em] uppercase text-gold mb-5 hero-anim"
          style="--d: 1.2s"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Simulador TCG · Pokémon · Online
        </div>

        <h1
          class="font-display font-extrabold leading-[0.88] hero-anim"
          style="--d: 1.4s; font-size: clamp(3.5rem, 6.5vw, 7.5rem)"
        >
          <span class="block text-white">Un Nuevo</span>
          <span class="block text-scarlet">Comienzo.</span>
        </h1>

        <p
          class="font-light text-offwhite/70 leading-[1.8] mt-5 hero-anim"
          style="
            --d: 1.6s;
            font-size: clamp(0.9rem, 1.2vw, 1.05rem);
            max-width: 360px;
          "
        >
          Construye tu mazo, desafía al mundo. NeoCaoh es el simulador Pokémon
          TCG de la comunidad hispana — gratis y competitivo.
        </p>

        <div
          class="flex gap-3 mt-8 flex-wrap pointer-events-auto hero-anim"
          style="--d: 1.8s"
        >
          <NuxtLink to="/descargar" class="btn-primary"
            >▶ Descargar Ahora</NuxtLink
          >
          <NuxtLink to="#features" class="btn-outline">Ver Features</NuxtLink>
        </div>
      </div>

      <!-- Loader -->
      <Transition name="fade">
        <div
          v-if="!loaded"
          class="absolute inset-0 z-30 flex flex-col items-center justify-center gap-7 bg-ink"
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
              class="h-full bg-gold rounded-full transition-all duration-100"
              :style="{ width: loadPct + '%' }"
            />
          </div>
          <div class="font-mono text-xs tracking-[0.2em] text-muted">
            {{ loadPct }}%
          </div>
        </div>
      </Transition>

      <!-- Scroll needle -->
      <div
        class="absolute right-10 bottom-10 z-20 flex flex-col items-center gap-2 scroll-hint-anim"
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

.hero-anim {
  opacity: 0;
  transform: translateY(24px);
  animation: riseIn 0.7s ease var(--d, 1s) forwards;
}
@keyframes riseIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-hint-anim {
  opacity: 0;
  animation: fadeIn 1s ease 2.5s forwards;
}
@keyframes fadeIn {
  to {
    opacity: 1;
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

.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
