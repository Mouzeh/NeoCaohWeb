<script setup lang="ts">
const scrollContainer = ref<HTMLElement | null>(null);
const loaderVisible = ref(true);
const loadProgress = ref(0);

const { canvasRef, init } = useScrollFrames({
  startFrame: 77,
  endFrame: 192,
  videoWidth: 1920,
  videoHeight: 1080,
  scrollContainer,
  framePath: (n) => `/frames/png/frame_${n}.png`,
  onProgress: (pct) => {
    loadProgress.value = pct;
  },
  onReady: () => {
    loaderVisible.value = false;
  },
});

onMounted(() => init());
</script>

<template>
  <Transition name="fade">
    <div
      v-if="loaderVisible"
      class="fixed inset-0 z-[900] bg-ink flex flex-col items-center justify-center gap-7"
    >
      <div
        class="loader-ring w-16 h-16 rounded-full border-[3px] border-white/[0.08] border-t-gold border-r-scarlet"
      />
      <p
        class="font-display font-extrabold text-[3rem] tracking-[0.06em] text-white"
      >
        Neo<span class="text-scarlet">Caoh</span>
      </p>
      <div class="w-60 h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
        <div
          class="h-full bg-gold rounded-full transition-[width] duration-100"
          :style="{ width: loadProgress + '%' }"
        />
      </div>
      <p class="font-mono text-[0.7rem] tracking-[0.2em] text-muted">
        {{ loadProgress }}%
      </p>
    </div>
  </Transition>

  <div
    ref="scrollContainer"
    class="scroll-container relative"
    style="height: 300vh; background: var(--ink2)"
  >
    <div
      class="sticky top-0 h-screen overflow-hidden flex items-center justify-end pr-0"
    >
      <div
        class="orb orb-1 absolute rounded-full"
        style="
          width: 560px;
          height: 560px;
          background: rgba(92, 26, 143, 0.5);
          bottom: -80px;
          left: -80px;
          filter: blur(90px);
        "
      />
      <div
        class="orb orb-2 absolute rounded-full"
        style="
          width: 480px;
          height: 480px;
          background: rgba(232, 35, 10, 0.3);
          top: -60px;
          right: -60px;
          filter: blur(90px);
        "
      />
      <div
        class="orb orb-3 absolute rounded-full"
        style="
          width: 360px;
          height: 360px;
          background: rgba(245, 200, 66, 0.15);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(90px);
        "
      />

      <div
        class="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]"
      >
        <svg
          viewBox="0 0 1280 720"
          preserveAspectRatio="xMidYMid slice"
          class="w-full h-full"
        >
          <defs>
            <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="white" stop-opacity="0" />
              <stop offset="50%" stop-color="white" stop-opacity="1" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g stroke="url(#lg)" stroke-width="1" fill="none">
            <line x1="0" y1="80" x2="1280" y2="640" />
            <line x1="0" y1="200" x2="1280" y2="520" />
            <line x1="0" y1="340" x2="1280" y2="380" />
            <line x1="0" y1="460" x2="1280" y2="260" />
            <line x1="0" y1="580" x2="1280" y2="140" />
            <line x1="160" y1="0" x2="1120" y2="720" />
            <line x1="380" y1="0" x2="1280" y2="720" />
            <line x1="0" y1="0" x2="900" y2="720" />
          </g>
        </svg>
      </div>

      <canvas
        ref="canvasRef"
        class="relative z-[2] object-contain canvas-glow block w-[70%] max-w-[600px] h-auto md:w-[85%] md:max-w-[800px] opacity-80 md:opacity-100 hero-canvas"
      />

      <div
        class="absolute inset-0 z-[5] flex flex-col justify-center px-[7vw] md:px-[7vw] px-[5vw] pointer-events-none"
      >
        <div
          class="hero-eyebrow font-mono text-[0.68rem] md:text-[0.68rem] text-[0.6rem] tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-5 md:mb-5 mb-3"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-gold animate-[blink_1.5s_ease_infinite]"
          />
          Simulador TCG · Pokémon · Online
        </div>
        <h1
          class="hero-title font-display font-extrabold leading-[0.88] tracking-tight relative"
        >
          <span
            class="block text-white title-glow-white"
            style="font-size: clamp(2.2rem, 8.5vw, 7.5rem)"
            >Un Nuevo</span
          >
          <span
            class="block text-scarlet title-glow-scarlet relative"
            style="font-size: clamp(2.2rem, 8.5vw, 7.5rem)"
            >Comienzo<span class="title-dot">.</span></span
          >
        </h1>
        <p
          class="hero-desc font-body font-light text-offwhite/70 max-w-[400px] md:max-w-[400px] max-w-[320px] leading-relaxed mt-6 md:mt-6 mt-4"
          style="font-size: clamp(0.85rem, 1.5vw, 1.1rem)"
        >
          Construye tu mazo, desafía a entrenadores de todo el mundo. Neo TCG es
          el simulador Pokemon TCG de la comunidad hispana.
        </p>
        <div class="hero-actions flex gap-4 md:gap-4 gap-3 mt-8 md:mt-8 mt-6 flex-wrap md:flex-nowrap flex-wrap pointer-events-auto">
          <NuxtLink to="/descargar" class="btn-primary md:text-base text-sm">▶ Jugar Ahora</NuxtLink>
          <NuxtLink to="#features" class="btn-outline md:text-base text-sm"
            >Descubre NEO TCG</NuxtLink
          >
        </div>
      </div>

      <div
        class="absolute right-12 md:right-12 right-6 bottom-12 md:bottom-12 bottom-8 z-[6] flex flex-col items-center gap-2 md:block hidden"
        style="animation: fadeIn 1s ease 2.4s both"
      >
        <span
          class="font-mono text-[0.58rem] tracking-[0.28em] uppercase text-muted"
          style="writing-mode: vertical-rl"
          >scroll</span
        >
        <div class="scroll-needle w-px h-14 bg-gold" />
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
.hero-eyebrow {
  animation: riseIn 0.6s ease 1.2s both;
}
.hero-title {
  animation: riseIn 0.8s ease 1.4s both;
}
.hero-desc {
  animation: riseIn 0.7s ease 1.6s both;
}
.hero-actions {
  animation: riseIn 0.7s ease 1.8s both;
}
.orb-1 {
  animation: orbDrift 9s ease-in-out infinite;
}
.orb-2 {
  animation: orbDrift 11s ease-in-out 2s infinite reverse;
}
.orb-3 {
  animation: orbPulse 7s ease-in-out infinite;
}
@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeIn {
  to {
    opacity: 1;
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

.canvas-glow {
  box-shadow:
    0 0 20px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(0, 0, 0, 0.6),
    0 0 80px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
}

.title-glow-white {
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(255, 255, 255, 0.2),
    0 0 30px rgba(255, 255, 255, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.3);
  animation: titleFloat 4s ease-in-out infinite;
}

.title-glow-scarlet {
  text-shadow:
    0 0 15px rgba(232, 35, 10, 0.6),
    0 0 30px rgba(232, 35, 10, 0.4),
    0 0 45px rgba(232, 35, 10, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.4);
  animation: titlePulse 3s ease-in-out infinite;
}

.title-dot {
  display: inline-block;
  color: #f5c842;
  text-shadow:
    0 0 10px rgba(245, 200, 66, 0.8),
    0 0 20px rgba(245, 200, 66, 0.6),
    0 0 30px rgba(245, 200, 66, 0.4);
  animation: dotBounce 2s ease-in-out infinite 0.5s;
}

@keyframes titleFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
    text-shadow:
      0 0 10px rgba(255, 255, 255, 0.3),
      0 0 20px rgba(255, 255, 255, 0.2),
      0 0 30px rgba(255, 255, 255, 0.1),
      0 2px 4px rgba(0, 0, 0, 0.3);
  }
  50% {
    transform: translateY(-3px) scale(1.005);
    text-shadow:
      0 0 15px rgba(255, 255, 255, 0.4),
      0 0 25px rgba(255, 255, 255, 0.3),
      0 0 35px rgba(255, 255, 255, 0.15),
      0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

@keyframes titlePulse {
  0%,
  100% {
    transform: translateY(0) scale(1);
    text-shadow:
      0 0 15px rgba(232, 35, 10, 0.6),
      0 0 30px rgba(232, 35, 10, 0.4),
      0 0 45px rgba(232, 35, 10, 0.2),
      0 2px 4px rgba(0, 0, 0, 0.4);
  }
  50% {
    transform: translateY(-2px) scale(1.01);
    text-shadow:
      0 0 20px rgba(232, 35, 10, 0.8),
      0 0 40px rgba(232, 35, 10, 0.6),
      0 0 60px rgba(232, 35, 10, 0.3),
      0 4px 8px rgba(0, 0, 0, 0.3);
  }
}

@keyframes dotBounce {
  0%,
  80%,
  100% {
    transform: scale(1) rotate(0deg);
    text-shadow:
      0 0 10px rgba(245, 200, 66, 0.8),
      0 0 20px rgba(245, 200, 66, 0.6),
      0 0 30px rgba(245, 200, 66, 0.4);
  }
  40% {
    transform: scale(1.2) rotate(5deg);
    text-shadow:
      0 0 15px rgba(245, 200, 66, 1),
      0 0 30px rgba(245, 200, 66, 0.8),
      0 0 45px rgba(245, 200, 66, 0.6);
  }
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0.3;
  }
}

.hero-canvas {
  transform: translateX(50px);
}

@media (min-width: 768px) {
  .hero-canvas {
    transform: translateX(200px);
  }
}
</style>
