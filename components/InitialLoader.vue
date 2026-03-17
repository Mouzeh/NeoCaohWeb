<script setup lang="ts">
const isVisible = ref(true)
const cards = ref([
  '/frames/cartas/wooper-neo-genesis-es-82.jpg',
  '/frames/cartas/furret-neo-genesis-es-35.jpg',
  '/frames/cartas/clefairy-neo-genesis-es-30.jpg',
  '/frames/cartas/cyndaquil-neo-genesis-es-56.jpg',
  '/frames/cartas/bellossom-neo-genesis-es-3.jpg',
  '/frames/cartas/gligar-neo-genesis-es-59.jpg',
  '/frames/cartas/ariados-neo-genesis-es-27.jpg',
  '/frames/cartas/donphan-neo-genesis-es-21.jpg'
])

const emit = defineEmits(['loaded'])

onMounted(() => {
  // Hide loader after animation completes
  setTimeout(() => {
    isVisible.value = false
    setTimeout(() => {
      emit('loaded')
    }, 800) // Wait for fade out transition
  }, 4000) // Show for 4 seconds
})
</script>

<template>
  <Transition name="loader-fade" appear>
    <div v-if="isVisible" class="fixed inset-0 z-[999] bg-ink overflow-hidden">
      <!-- Purple granulated overlay -->
      <div class="absolute inset-0 purple-grain"></div>

      <!-- Cards Animation -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="cards-container relative w-screen h-screen">
          <div v-for="(card, index) in cards" :key="card"
               class="floating-card absolute"
               :style="{
                 '--delay': `${index * 0.6}s`,
                 '--x': `${Math.random() * 80 + 10}%`,
                 '--y': `${Math.random() * 70 + 15}%`,
                 '--rotation': `${Math.random() * 40 - 20}deg`,
                 '--scale': `${Math.random() * 0.4 + 0.8}`
               }">
            <div class="card-wrapper">
              <img :src="card" :alt="'Carta Pokémon'" class="card-image" />
              <div class="card-glow"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Logo and Loading -->
      <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div class="logo-section text-center mb-8">
          <h1 class="font-display font-extrabold text-[4rem] md:text-[6rem] tracking-[0.06em] text-white logo-glow">
            Neo<span class="text-scarlet">Caoh</span>
          </h1>
          <p class="font-mono text-[0.9rem] tracking-[0.3em] uppercase text-gold/80 mt-4 typewriter">
            Pokémon TCG Simulator
          </p>
        </div>

        <!-- Loading animation -->
        <div class="loading-section">
          <div class="loader-dots flex gap-2">
            <div class="dot" style="--delay: 0s"></div>
            <div class="dot" style="--delay: 0.2s"></div>
            <div class="dot" style="--delay: 0.4s"></div>
          </div>
          <p class="text-muted text-sm mt-4 font-mono tracking-wider">
            Cargando experiencia...
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.purple-grain {
  background:
    radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(124, 58, 237, 0.2) 0%, transparent 50%);
  animation: grainShift 8s ease-in-out infinite;
}

.purple-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  opacity: 0.6;
}

.floating-card {
  left: var(--x);
  top: var(--y);
  transform: rotate(var(--rotation)) scale(var(--scale));
  animation: floatIn 1s ease-out var(--delay) both,
             cardFloat 6s ease-in-out var(--delay) infinite;
}

.card-wrapper {
  position: relative;
  width: 120px;
  height: 168px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.1);
  filter: brightness(0.9) contrast(1.1);
}

.card-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(45deg,
    rgba(245, 200, 66, 0.3),
    rgba(232, 35, 10, 0.3),
    rgba(147, 51, 234, 0.3)
  );
  border-radius: 16px;
  z-index: -1;
  opacity: 0;
  filter: blur(8px);
  animation: glowPulse 3s ease-in-out var(--delay) infinite;
}

.logo-glow {
  text-shadow:
    0 0 20px rgba(255, 255, 255, 0.5),
    0 0 40px rgba(147, 51, 234, 0.4),
    0 0 60px rgba(168, 85, 247, 0.3);
  animation: logoBreath 3s ease-in-out infinite;
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #F5C842;
  animation: typewriter 2s steps(20) 1s both,
             blinkCursor 1s step-end infinite 1s;
}

.dot {
  width: 8px;
  height: 8px;
  background: #F5C842;
  border-radius: 50%;
  animation: dotBounce 1.5s ease-in-out var(--delay) infinite;
}

/* Animations */
@keyframes grainShift {
  0%, 100% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(-5px) translateY(-10px); }
  50% { transform: translateX(10px) translateY(5px); }
  75% { transform: translateX(-8px) translateY(8px); }
}

@keyframes floatIn {
  0% {
    opacity: 0;
    transform: rotate(var(--rotation)) scale(0) translateY(100px);
  }
  100% {
    opacity: 1;
    transform: rotate(var(--rotation)) scale(var(--scale)) translateY(0);
  }
}

@keyframes cardFloat {
  0%, 100% {
    transform: rotate(var(--rotation)) scale(var(--scale)) translateY(0px);
  }
  50% {
    transform: rotate(calc(var(--rotation) + 5deg)) scale(calc(var(--scale) * 1.05)) translateY(-10px);
  }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.6; }
}

@keyframes logoBreath {
  0%, 100% {
    text-shadow:
      0 0 20px rgba(255, 255, 255, 0.5),
      0 0 40px rgba(147, 51, 234, 0.4),
      0 0 60px rgba(168, 85, 247, 0.3);
  }
  50% {
    text-shadow:
      0 0 30px rgba(255, 255, 255, 0.7),
      0 0 60px rgba(147, 51, 234, 0.6),
      0 0 90px rgba(168, 85, 247, 0.5);
  }
}

@keyframes typewriter {
  0% { width: 0; }
  100% { width: 100%; }
}

@keyframes blinkCursor {
  0%, 50% { border-color: #F5C842; }
  51%, 100% { border-color: transparent; }
}

@keyframes dotBounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
    background: #F5C842;
  }
  40% {
    transform: translateY(-10px);
    background: #E8230A;
  }
  60% {
    transform: translateY(-5px);
    background: #9333EA;
  }
}

.loader-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.loader-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
  filter: blur(10px);
}
</style>