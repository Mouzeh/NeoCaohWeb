<script setup lang="ts">
const cards = [
  {
    name: "Typhlosion",
    type: "Fuego · Stage 2",
    hp: "150",
    image: "/frames/cartas/typhlosion-neo-genesis-es-18.jpg",
    color: "text-orange-400",
  },
  {
    name: "Feraligatr",
    type: "Agua · Stage 2",
    hp: "120",
    image: "/frames/cartas/feraligatr-neo-genesis-es-4.jpg",
    color: "text-blue-400",
  },
  {
    name: "Bayleef",
    type: "Planta · Stage 1",
    hp: "60",
    image: "/frames/cartas/bayleef-neo-genesis-es-28.jpg",
    color: "text-green-400",
  },
  {
    name: "Ampharos",
    type: "Eléctrico · Stage 2",
    hp: "90",
    image: "/frames/cartas/ampharos-neo-genesis-es-1.jpg",
    color: "text-yellow-400",
  },
  {
    name: "Donphan",
    type: "Lucha · Stage 1",
    hp: "90",
    image: "/frames/cartas/donphan-neo-genesis-es-21.jpg",
    color: "text-amber-600",
  },
  {
    name: "Xatu",
    type: "Psíquico · Stage 1",
    hp: "70",
    image: "/frames/cartas/xatu-neo-genesis-es-52.jpg",
    color: "text-purple-400",
  },
];

let isHovered = ref(false);
let hoveredCard = ref(-1);
let animationTime = ref(0);

// Función para calcular el estilo del abanico horizontal
const getCardStyle = (index: number) => {
  const totalCards = cards.length;

  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Efecto especial para la carta con hover
  const extraScale = hoveredCard.value === index ? (isMobile ? 1.1 : 1.15) : 1;
  const extraTranslateY = hoveredCard.value === index ? (isMobile ? -8 : -15) : 0;
  const extraShadow =
    hoveredCard.value === index
      ? isMobile
        ? "0 15px 30px rgba(0,0,0,0.5), 0 0 20px rgba(245,200,66,0.3)"
        : "0 25px 50px rgba(0,0,0,0.6), 0 0 30px rgba(245,200,66,0.4)"
      : "";
  const zIndex = hoveredCard.value === index ? 100 : 10 + index;

  // Configuración responsive
  const config = isMobile ? {
    cardSpacing: 30,  // Espaciado más pequeño en móvil
    maxRotation: 8,   // Menos rotación en móvil
    centerX: 150,     // 300px / 2
    centerY: 125,     // 250px / 2
    cardWidth: 45,    // 90px / 2
    cardHeight: 63    // 126px / 2
  } : {
    cardSpacing: 60,
    maxRotation: 10,
    centerX: 300,     // 600px / 2
    centerY: 200,     // 400px / 2
    cardWidth: 90,    // 180px / 2
    cardHeight: 126   // 252px / 2
  };

  // Calcular posición de cada carta
  const centerCardIndex = (totalCards - 1) / 2;

  // Posición X: distribuir horizontalmente con espaciado
  const offsetFromCenter = index - centerCardIndex;
  const x = config.centerX + (offsetFromCenter * config.cardSpacing) - config.cardWidth;

  // Rotación: rotar las cartas de los extremos
  const rotationFactor = offsetFromCenter / centerCardIndex;
  const rotation = rotationFactor * config.maxRotation;

  // Posición Y: curva sutil para el abanico
  const distanceFromCenter = Math.abs(offsetFromCenter);
  const curve = Math.pow(distanceFromCenter / (totalCards / 2), 2) * (isMobile ? 8 : 15);
  const y = config.centerY - config.cardHeight + curve;

  // Animación sutil
  const time = animationTime.value * 0.001;
  const animatedRotation = rotation + Math.sin(time + index) * (isMobile ? 0.5 : 1);
  const animatedY = y + Math.sin(time * 0.5 + index * 0.3) * (isMobile ? 1 : 2);

  // Hover: expandir abanico
  const hoverMultiplier = isHovered.value ? (isMobile ? 1.2 : 1.3) : 1;
  const finalX = config.centerX + (x - config.centerX) * hoverMultiplier;

  return {
    left: `${finalX}px`,
    top: `${animatedY + extraTranslateY}px`,
    transform: `rotate(${animatedRotation}deg) scale(${extraScale})`,
    zIndex: zIndex,
    transformOrigin: "center bottom",
    boxShadow: extraShadow || (isMobile ? `0 5px 15px rgba(0,0,0,0.3)` : `0 10px 20px rgba(0,0,0,0.4)`),
    transition: hoveredCard.value === index ? 'all 0.3s ease' : 'transform 0.1s ease'
  };
};

// Animación continua
onMounted(() => {
  const animate = () => {
    animationTime.value = Date.now();
    requestAnimationFrame(animate);
  };
  animate();
});
</script>

<template>
  <section
    id="story"
    class="px-[5vw] py-32 bg-ink2 grid grid-cols-1 md:grid-cols-2 gap-24 items-center relative overflow-hidden"
  >
    <!-- Orb -->
    <div
      class="absolute -top-1/5 -right-[8%] w-[500px] h-[500px] rounded-full bg-violet/20 blur-[80px] pointer-events-none"
    />

    <!-- Text -->
    <div>
      <span
        class="story-tag reveal inline-block font-mono text-[0.65rem] tracking-[0.2em] uppercase bg-violet2/20 border border-violet2/40 text-violet2 px-3 py-1 rounded mb-5"
      >
        Nuestro Proyecto
      </span>
      <h2
        class="font-display font-extrabold text-white leading-[0.95] mb-7 reveal"
        style="font-size: clamp(2.2rem, 4.5vw, 4rem)"
      >
        Hecho por<br />fans,<br /><span class="text-gold">para fans</span>
      </h2>
      <p class="text-[0.97rem] text-muted leading-[1.85] mb-4 reveal">
        Neo Caoh TCG nació del vacío que existía en la comunidad hispana: no
        había un lugar donde jugar TCG Pokémon retro competitivo.
      </p>
      <p class="text-[0.97rem] text-muted leading-[1.85] mb-8 reveal">
        Somos jugadores, devs y artistas que construimos esto con amor al juego.
        Completamente gratuito y siempre lo será.
      </p>
      <div class="flex gap-4 flex-wrap reveal">
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
              <span class="discord-main">Unirme al Discord</span>
              <span class="discord-sub">¡Únete a la comunidad!</span>
            </div>
          </div>
          <div class="discord-pulse"></div>
        </a>
      </div>
    </div>

    <!-- Cartas dinámicas -->
    <div
      class="cards-fan relative h-[400px] md:h-[500px] flex items-center justify-center reveal"
    >
      <!-- Edition Logos floating around cards -->
      <div class="absolute inset-0 pointer-events-none hidden md:block">
        <img
          src="/frames/logos/Neo Genesis.png"
          alt="Neo Genesis"
          class="edition-logo edition-logo-1 w-32 h-auto opacity-30"
        />
        <img
          src="/frames/logos/Neo Revelation.png"
          alt="Neo Revelation"
          class="edition-logo edition-logo-2 w-28 h-auto opacity-25"
        />
        <img
          src="/frames/logos/Neo Discovery.png"
          alt="Neo Discovery"
          class="edition-logo edition-logo-3 w-24 h-auto opacity-35"
        />
        <img
          src="/frames/logos/Neo Destiny.png"
          alt="Neo Destiny"
          class="edition-logo edition-logo-4 w-28 h-auto opacity-30"
        />
        <img
          src="/frames/logos/Legendary Collection.png"
          alt="Legendary Collection"
          class="edition-logo edition-logo-5 w-32 h-auto opacity-25"
        />
        <img
          src="/frames/logos/Southern Islands.png"
          alt="Southern Islands"
          class="edition-logo edition-logo-6 w-28 h-auto opacity-35"
        />
      </div>

      <div
        class="fan-container relative w-[300px] h-[250px] md:w-[600px] md:h-[400px] z-10"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div
          v-for="(card, index) in cards"
          :key="card.name"
          class="fan-card absolute transition-all duration-700 ease-out cursor-pointer"
          :style="getCardStyle(index)"
          @mouseenter="hoveredCard = index"
          @mouseleave="hoveredCard = -1"
        >
          <div
            class="card-container relative w-[90px] h-[126px] md:w-[180px] md:h-[252px] rounded-[8px] md:rounded-[12px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.4)] md:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-500 ease-out"
            :class="{ 'card-hover': hoveredCard === index }"
          >
            <img
              :src="card.image"
              :alt="card.name"
              class="w-full h-full object-cover transition-transform duration-700 ease-out"
            />
            <!-- Efecto de brillo -->
            <div
              class="shimmer absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
              :class="{ 'opacity-100': hoveredCard === index }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards-fan {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.fan-container {
  position: relative;
  transition: all 0.5s ease;
}

.fan-card {
  transform-origin: center bottom;
  position: absolute;
  will-change: transform;
  transition: box-shadow 0.4s ease, z-index 0.1s ease;
}

.card-container {
  position: relative;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(15px);
  transform-style: preserve-3d;
  transform-origin: center center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-container::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(
    145deg,
    rgba(245, 200, 66, 0.4),
    rgba(232, 35, 10, 0.3),
    rgba(245, 200, 66, 0.4)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: subtract;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-hover {
  transform: translateY(-30px) scale(1.2) !important;
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(245, 200, 66, 0.6),
    0 0 60px rgba(245, 200, 66, 0.4) !important;
  z-index: 100 !important;
}

.card-hover::before {
  opacity: 1;
}

.shimmer {
  animation: shimmerEffect 1.5s ease-in-out infinite;
}

@keyframes shimmerEffect {
  0% {
    transform: translateX(-100%) skewX(-12deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
    opacity: 0;
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

.reveal {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.reveal:nth-child(1) {
  animation-delay: 0.1s;
}
.reveal:nth-child(2) {
  animation-delay: 0.2s;
}
.reveal:nth-child(3) {
  animation-delay: 0.3s;
}
.reveal:nth-child(4) {
  animation-delay: 0.4s;
}
.reveal:nth-child(5) {
  animation-delay: 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación de entrada para las cartas del abanico */
.fan-card {
  opacity: 0;
  animation: fanCardFlyIn 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.fan-card:nth-child(1) {
  animation-delay: 0.1s;
}
.fan-card:nth-child(2) {
  animation-delay: 0.2s;
}
.fan-card:nth-child(3) {
  animation-delay: 0.3s;
}
.fan-card:nth-child(4) {
  animation-delay: 0.4s;
}
.fan-card:nth-child(5) {
  animation-delay: 0.5s;
}
.fan-card:nth-child(6) {
  animation-delay: 0.6s;
}

@keyframes fanCardFlyIn {
  0% {
    opacity: 0;
    transform: translateY(200px) translateX(-50px) rotate(-15deg) scale(0.6);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-10px) translateX(5px) rotate(2deg) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
  }
}

/* Hover suave para toda la imagen */
.fan-card img {
  filter: brightness(0.95) contrast(1.05);
  transition: filter 0.3s ease;
}

.card-hover img {
  filter: brightness(1.1) contrast(1.15);
}

/* Efecto de profundidad en el abanico */
.fan-container:hover .fan-card {
  transform-style: preserve-3d;
}

/* Animación de entrada ultra suave para las cartas */
.fan-card img {
  filter: brightness(0.95) contrast(1.05) saturate(1.1);
  transition: filter 0.5s ease;
}

/* Sombra especial para el abanico en mano */
.fan-card:nth-child(odd) .card-container {
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.4),
    0 5px 15px rgba(0, 0, 0, 0.3);
}

.fan-card:nth-child(even) .card-container {
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.45),
    0 6px 18px rgba(0, 0, 0, 0.35);
}

.card-hover img {
  filter: brightness(1.15) contrast(1.2) saturate(1.3);
}

/* Efecto de flotación suave */
.fan-container:hover .fan-card:not(.card-hover) {
  filter: brightness(0.85);
  transition: filter 0.3s ease;
}

/* Mejoras en el shimmer */
.shimmer {
  animation: shimmerFlow 2s ease-in-out infinite;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.15) 25%,
    rgba(245, 200, 66, 0.3) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 100%
  );
}

@keyframes shimmerFlow {
  0% {
    transform: translateX(-100%) skewX(-15deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
    opacity: 0;
  }
}

/* Edition Logos Styles */
.edition-logo {
  position: absolute;
  filter: brightness(0.8) contrast(1.2) saturate(1.1);
  transition: all 0.6s ease;
}

.edition-logo-1 {
  top: 10px;
  left: 40px;
  animation: logoFloat1 8s ease-in-out infinite;
}

.edition-logo-2 {
  top: 30px;
  right: 120px;
  animation: logoFloat2 10s ease-in-out infinite 1s;
}

.edition-logo-3 {
  top: 160px;
  left: 20px;
  animation: logoFloat3 12s ease-in-out infinite 2s;
}

.edition-logo-4 {
  top: 120px;
  right: 40px;
  animation: logoFloat4 9s ease-in-out infinite 1.5s;
}

.edition-logo-5 {
  top: 300px;
  left: 140px;
  animation: logoFloat5 11s ease-in-out infinite 3s;
}

.edition-logo-6 {
  top: 280px;
  right: 140px;
  animation: logoFloat6 7s ease-in-out infinite 0.5s;
}

@keyframes logoFloat1 {
  0%,
  100% {
    transform: translate(0, 0) rotate(-2deg) scale(0.95);
    opacity: 0.3;
  }
  50% {
    transform: translate(3px, -4px) rotate(2deg) scale(1.02);
    opacity: 0.35;
  }
}

@keyframes logoFloat2 {
  0%,
  100% {
    transform: translate(0, 0) rotate(1deg) scale(1);
    opacity: 0.25;
  }
  50% {
    transform: translate(-3px, 3px) rotate(-1deg) scale(0.98);
    opacity: 0.3;
  }
}

@keyframes logoFloat3 {
  0%,
  100% {
    transform: translate(0, 0) rotate(-1deg) scale(1.01);
    opacity: 0.35;
  }
  50% {
    transform: translate(4px, -2px) rotate(1deg) scale(0.99);
    opacity: 0.4;
  }
}

@keyframes logoFloat4 {
  0%,
  100% {
    transform: translate(0, 0) rotate(2deg) scale(0.98);
    opacity: 0.3;
  }
  50% {
    transform: translate(-4px, 2px) rotate(-2deg) scale(1.04);
    opacity: 0.35;
  }
}

@keyframes logoFloat5 {
  0%,
  100% {
    transform: translate(0, 0) rotate(-1deg) scale(1);
    opacity: 0.25;
  }
  50% {
    transform: translate(3px, -5px) rotate(2deg) scale(0.96);
    opacity: 0.3;
  }
}

@keyframes logoFloat6 {
  0%,
  100% {
    transform: translate(0, 0) rotate(1deg) scale(0.95);
    opacity: 0.35;
  }
  50% {
    transform: translate(-2px, 4px) rotate(-1deg) scale(1.02);
    opacity: 0.4;
  }
}
</style>
