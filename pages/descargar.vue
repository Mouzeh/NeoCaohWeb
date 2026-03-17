<script setup lang="ts">
const downloads = ref([
  {
    os: 'Windows',
    icon: '🖥️',
    description: 'Compatible con Windows 10/11 (64-bit)',
    version: 'v0.10.0 Alpha',
    size: '~250 MB',
    link: 'https://www.mediafire.com/file/5orodrm1ey10oeb/NeoCaohTCG-windows-Alpha_-_v0.10.0..zip/file',
    status: 'available'
  },
  {
    os: 'macOS',
    icon: '🍎',
    description: 'Compatible con macOS 11+ (Intel & Apple Silicon)',
    version: 'v0.10.0 Alpha',
    size: '~280 MB',
    link: 'https://www.mediafire.com/file/5orodrm1ey10oeb/NeoCaohTCG-windows-Alpha_-_v0.10.0..zip/file',
    status: 'coming-soon'
  },
  {
    os: 'Linux',
    icon: '🐧',
    description: 'Compatible con Ubuntu 20.04+ y distros similares',
    version: 'v0.10.0 Alpha',
    size: '~260 MB',
    link: 'https://www.mediafire.com/file/5orodrm1ey10oeb/NeoCaohTCG-windows-Alpha_-_v0.10.0..zip/file',
    status: 'coming-soon'
  }
])

const systemRequirements = ref({
  minimum: [
    'Sistema Operativo: Windows 10 64-bit / macOS 11+ / Ubuntu 20.04+',
    'Procesador: Intel Core i3-6100 / AMD FX-6300 o equivalente',
    'Memoria: 4 GB RAM',
    'Gráficos: DirectX 11 compatible',
    'Red: Conexión de banda ancha a Internet',
    'Almacenamiento: 1 GB de espacio disponible'
  ],
  recommended: [
    'Sistema Operativo: Windows 11 / macOS 12+ / Ubuntu 22.04+',
    'Procesador: Intel Core i5-8400 / AMD Ryzen 5 2600 o superior',
    'Memoria: 8 GB RAM',
    'Gráficos: NVIDIA GTX 1060 / AMD RX 580 o superior',
    'Red: Conexión de banda ancha estable',
    'Almacenamiento: 2 GB de espacio disponible'
  ]
})
</script>

<template>
  <div class="min-h-screen bg-ink text-white">
    <!-- Hero Section -->
    <section class="relative px-[5vw] py-24 bg-gradient-to-br from-ink via-ink2 to-ink overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 opacity-[0.03]">
        <div class="orb orb-1 absolute rounded-full" style="width:500px;height:500px;background:rgba(245,200,66,0.8);top:5%;right:-10%;filter:blur(100px)" />
        <div class="orb orb-2 absolute rounded-full" style="width:400px;height:400px;background:rgba(232,35,10,0.6);bottom:5%;left:-5%;filter:blur(80px)" />
      </div>

      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <div class="sec-label inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-6">
          <span class="w-6 h-px bg-gold"></span>
          Descarga
          <span class="w-6 h-px bg-gold"></span>
        </div>
        <h1 class="font-display font-extrabold leading-[0.9] mb-6" style="font-size: clamp(2.5rem, 6vw, 4.5rem)">
          Descarga <span class="text-scarlet">NeoCaoh</span>
        </h1>
        <p class="text-lg text-offwhite/70 max-w-2xl mx-auto leading-relaxed mb-8">
          Comienza tu aventura en el mundo del TCG Pokémon. Disponible para todas las plataformas principales.
        </p>
        <div class="bg-gradient-to-r from-scarlet/10 to-gold/10 border border-scarlet/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span class="text-ink text-sm font-bold">α</span>
            </div>
            <div class="text-left">
              <h3 class="text-lg font-bold text-gold mb-2">Versión Alpha</h3>
              <p class="text-offwhite/90 text-sm leading-relaxed">
                Esta es una versión temprana de desarrollo. Puedes encontrar bugs o funcionalidades incompletas.
                Tu feedback es invaluable para mejorar el juego.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Download Cards -->
    <section class="px-[5vw] md:px-[5vw] px-[4vw] py-16 md:py-16 py-12 max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 gap-6 mb-20 md:mb-20 mb-16">
        <div v-for="download in downloads" :key="download.os"
             class="download-card group relative bg-gradient-to-br from-panel/80 to-ink2/80 border border-white/10 rounded-2xl p-8 md:p-8 p-6 backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:scale-[1.02]">

          <!-- OS Icon -->
          <div class="text-6xl md:text-6xl text-5xl mb-6 md:mb-6 mb-4 group-hover:scale-110 transition-transform duration-300">
            {{ download.icon }}
          </div>

          <!-- OS Name -->
          <h3 class="font-display font-extrabold text-2xl md:text-2xl text-xl text-white mb-3 md:mb-3 mb-2">{{ download.os }}</h3>

          <!-- Description -->
          <p class="text-muted text-sm md:text-sm text-xs mb-4 md:mb-4 mb-3 leading-relaxed">{{ download.description }}</p>

          <!-- Version & Size -->
          <div class="flex justify-between items-center mb-6 md:mb-6 mb-4 text-sm md:text-sm text-xs">
            <span class="bg-violet2/20 text-violet2 px-3 py-1 md:px-3 md:py-1 px-2 py-1 rounded-full font-mono">{{ download.version }}</span>
            <span class="text-muted">{{ download.size }}</span>
          </div>

          <!-- Download Button -->
          <template v-if="download.status === 'available'">
            <a :href="download.link" target="_blank" rel="noopener noreferrer"
               class="btn-primary w-full flex items-center justify-center group-hover:bg-gold group-hover:text-ink transition-all duration-300 text-sm md:text-base py-3 md:py-3 py-2">
              <svg class="w-5 h-5 md:w-5 md:h-5 w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Descargar
            </a>
          </template>
          <template v-else>
            <button disabled class="btn-outline w-full flex items-center justify-center opacity-50 cursor-not-allowed text-sm md:text-base py-3 md:py-3 py-2">
              <svg class="w-5 h-5 md:w-5 md:h-5 w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              Próximamente
            </button>
          </template>
        </div>
      </div>

      <!-- Installation Guide -->
      <div class="bg-gradient-to-r from-ink2/80 to-panel/80 border border-white/5 rounded-2xl p-8 md:p-8 p-6 mb-16 md:mb-16 mb-12">
        <h2 class="font-display font-extrabold text-3xl md:text-3xl text-2xl text-white mb-8 md:mb-8 mb-6 text-center">
          Guía de <span class="text-gold">Instalación</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 gap-6">
          <div class="text-center group">
            <div class="w-16 h-16 md:w-16 md:h-16 w-14 h-14 bg-scarlet/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-4 mb-3 group-hover:bg-scarlet/30 transition-colors duration-300">
              <span class="text-2xl md:text-2xl text-xl">1️⃣</span>
            </div>
            <h3 class="font-bold text-lg md:text-lg text-base text-white mb-2 md:mb-2 mb-1">Descarga</h3>
            <p class="text-muted text-sm md:text-sm text-xs leading-relaxed">Haz clic en el botón de descarga de tu sistema operativo y espera a que se complete.</p>
          </div>

          <div class="text-center group">
            <div class="w-16 h-16 md:w-16 md:h-16 w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-4 mb-3 group-hover:bg-gold/30 transition-colors duration-300">
              <span class="text-2xl md:text-2xl text-xl">2️⃣</span>
            </div>
            <h3 class="font-bold text-lg md:text-lg text-base text-white mb-2 md:mb-2 mb-1">Extrae</h3>
            <p class="text-muted text-sm md:text-sm text-xs leading-relaxed">Descomprime el archivo ZIP en la ubicación que prefieras usando WinRAR, 7-Zip o similar.</p>
          </div>

          <div class="text-center group">
            <div class="w-16 h-16 md:w-16 md:h-16 w-14 h-14 bg-violet2/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-4 mb-3 group-hover:bg-violet2/30 transition-colors duration-300">
              <span class="text-2xl md:text-2xl text-xl">3️⃣</span>
            </div>
            <h3 class="font-bold text-lg md:text-lg text-base text-white mb-2 md:mb-2 mb-1">Ejecuta</h3>
            <p class="text-muted text-sm md:text-sm text-xs leading-relaxed">Ejecuta NeoCaoh.exe y comienza a jugar. ¡No requiere instalación adicional!</p>
          </div>
        </div>
      </div>

      <!-- System Requirements -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-gradient-to-br from-panel/40 to-ink2/40 border border-white/5 rounded-2xl p-8">
          <h3 class="font-display font-bold text-xl text-white mb-6 flex items-center gap-3">
            <span class="w-2 h-2 bg-gold rounded-full"></span>
            Requisitos Mínimos
          </h3>
          <ul class="space-y-3">
            <li v-for="req in systemRequirements.minimum" :key="req" class="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span class="w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0"></span>
              {{ req }}
            </li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-panel/40 to-ink2/40 border border-white/5 rounded-2xl p-8">
          <h3 class="font-display font-bold text-xl text-white mb-6 flex items-center gap-3">
            <span class="w-2 h-2 bg-scarlet rounded-full"></span>
            Requisitos Recomendados
          </h3>
          <ul class="space-y-3">
            <li v-for="req in systemRequirements.recommended" :key="req" class="flex items-start gap-3 text-sm text-muted leading-relaxed">
              <span class="w-1 h-1 bg-scarlet rounded-full mt-2 flex-shrink-0"></span>
              {{ req }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Support Section -->
      <div class="bg-gradient-to-r from-violet2/10 to-sky/10 border border-violet2/20 rounded-2xl p-8 mt-16 text-center">
        <h3 class="font-display font-bold text-2xl text-white mb-4">¿Necesitas Ayuda?</h3>
        <p class="text-offwhite/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Si tienes problemas con la descarga o instalación, únete a nuestro Discord donde la comunidad
          y el equipo de desarrollo estarán encantados de ayudarte.
        </p>

        <!-- Discord Button -->
        <div class="mb-8 flex justify-center">
          <a
            href="https://discord.gg/BNpF4XQEkX"
            target="_blank"
            rel="noopener noreferrer"
            class="discord-button group relative"
          >
            <div class="discord-glow"></div>
            <div class="discord-content">
              <div class="discord-icon-wrapper">
                <svg class="discord-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"
                  />
                </svg>
              </div>
              <div class="discord-text">
                <span class="discord-main">¿Necesitas Ayuda?</span>
                <span class="discord-sub">¡Únete al Discord!</span>
              </div>
            </div>
            <div class="discord-pulse"></div>
          </a>
        </div>

        <!-- Terms Button - Centered and More Beautiful -->
        <div class="pt-6 border-t border-white/10">
          <NuxtLink to="/terminos"
                    class="terms-button group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden">
            <div class="terms-glow absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative flex items-center gap-3 text-white/80 group-hover:text-white transition-colors duration-300">
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span class="font-medium text-sm">Ver Términos y Condiciones</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sec-label {
  animation: fadeIn 0.6s ease forwards;
}

.orb-1 {
  animation: orbDrift 15s ease-in-out infinite;
}

.orb-2 {
  animation: orbDrift 12s ease-in-out 3s infinite reverse;
}

.download-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(245,200,66,0.1) 0%, transparent 50%, rgba(232,35,10,0.1) 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.download-card:hover::before {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes orbDrift {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -40px);
  }
}

/* Discord Button Styles */
.discord-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 12px;
  text-decoration: none;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.discord-button:hover {
  transform: translateY(-6px) scale(1.05);
  filter: brightness(1.1);
}

.discord-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(
    135deg,
    #5865f2 0%,
    #7289da 25%,
    #5865f2 50%,
    #4752c4 75%,
    #5865f2 100%
  );
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.4s ease;
  filter: blur(8px);
  animation: discordGlowRotate 3s linear infinite;
}

.discord-button:hover .discord-glow {
  opacity: 0.6;
}

.discord-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: linear-gradient(
    135deg,
    rgba(88, 101, 242, 0.9) 0%,
    rgba(114, 137, 218, 0.9) 100%
  );
  border: 1px solid rgba(114, 137, 218, 0.3);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.discord-button:hover .discord-content {
  background: linear-gradient(
    135deg,
    #5865f2 0%,
    #7289da 100%
  );
  border-color: rgba(114, 137, 218, 0.6);
  box-shadow:
    0 20px 40px rgba(88, 101, 242, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.discord-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.discord-button:hover .discord-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1) rotate(5deg);
}

.discord-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.discord-button:hover .discord-icon {
  transform: scale(1.1);
}

.discord-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.discord-main {
  font-weight: 600;
  line-height: 1.2;
  transition: transform 0.3s ease;
}

.discord-sub {
  font-size: 0.75rem;
  opacity: 0.8;
  font-weight: 400;
  line-height: 1.2;
  transition: all 0.3s ease;
}

.discord-button:hover .discord-main {
  transform: translateX(2px);
}

.discord-button:hover .discord-sub {
  opacity: 1;
  transform: translateX(2px);
}

.discord-pulse {
  position: absolute;
  inset: -8px;
  border: 2px solid rgba(88, 101, 242, 0.4);
  border-radius: 20px;
  opacity: 0;
  animation: discordPulse 2s ease-out infinite;
}

.discord-button:hover .discord-pulse {
  animation-play-state: running;
}

@keyframes discordGlowRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes discordPulse {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

/* Terms Button Styles */
.terms-button {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.terms-button:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.terms-glow {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(168, 85, 247, 0.1) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  filter: blur(8px);
}

.terms-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    transparent,
    rgba(168, 85, 247, 0.05)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.terms-button:hover::before {
  opacity: 1;
}
</style>