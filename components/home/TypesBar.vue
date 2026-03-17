<script setup lang="ts">
const types = [
  { icon: '/frames/tipos/fire.png', glow: 'fire-glow' },
  { icon: '/frames/tipos/water.png', glow: 'water-glow' },
  { icon: '/frames/tipos/grass.png', glow: 'grass-glow' },
  { icon: '/frames/tipos/electric.png', glow: 'electric-glow' },
  { icon: '/frames/tipos/psy.png', glow: 'psy-glow' },
  { icon: '/frames/tipos/dark.png', glow: 'dark-glow' },
  { icon: '/frames/tipos/dragon.png', glow: 'dragon-glow' },
  { icon: '/frames/tipos/metal.png', glow: 'metal-glow' },
]
</script>

<template>
  <div class="bg-panel px-12 py-[1.6rem] flex items-center justify-center gap-8 overflow-x-auto scrollbar-hide border-y border-white/[0.04]">
    <div v-for="(t, index) in types" :key="t.icon"
         class="type-icon flex-shrink-0"
         :class="t.glow"
         :style="{ animationDelay: `${index * 0.2}s` }">
      <img :src="t.icon" alt="Tipo" class="w-8 h-8" />
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }

.type-icon {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fire-glow {
  filter: drop-shadow(0 0 8px rgba(232, 80, 10, 0.6)) drop-shadow(0 0 16px rgba(255, 140, 90, 0.4));
}

.water-glow {
  filter: drop-shadow(0 0 8px rgba(59, 168, 224, 0.6)) drop-shadow(0 0 16px rgba(125, 205, 255, 0.4));
}

.grass-glow {
  filter: drop-shadow(0 0 8px rgba(78, 200, 80, 0.6)) drop-shadow(0 0 16px rgba(142, 232, 144, 0.4));
}

.electric-glow {
  filter: drop-shadow(0 0 8px rgba(245, 200, 66, 0.6)) drop-shadow(0 0 16px rgba(255, 224, 122, 0.4));
}

.psy-glow {
  filter: drop-shadow(0 0 8px rgba(220, 50, 200, 0.6)) drop-shadow(0 0 16px rgba(240, 122, 234, 0.4));
}

.dark-glow {
  filter: drop-shadow(0 0 8px rgba(123, 95, 181, 0.6)) drop-shadow(0 0 16px rgba(184, 152, 232, 0.4));
}

.dragon-glow {
  filter: drop-shadow(0 0 8px rgba(80, 50, 220, 0.6)) drop-shadow(0 0 16px rgba(138, 116, 240, 0.4));
}

.metal-glow {
  filter: drop-shadow(0 0 8px rgba(160, 170, 200, 0.6)) drop-shadow(0 0 16px rgba(200, 208, 232, 0.4));
}
</style>
