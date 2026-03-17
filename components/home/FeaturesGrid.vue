<script setup lang="ts">
const features = [
  {
    n: "01",
    image: "/imagenes del juego/mesas.png",
    title: "Partidas en Tiempo Real",
    color: "text-scarlet",
    desc: "Motor fiel a las reglas oficiales. Juega contra rivales de todo el mundo con detección automática de errores y árbitro digital.",
  },
  {
    n: "02",
    image: "/imagenes del juego/creacion de deck.png",
    title: "Constructor de Mazos",
    color: "text-gold",
    desc: "Editor visual con más de 222 cartas. Valida tu mazo para Standard o Expanded al instante con filtros avanzados.",
  },
  {
    n: "03",
    image: "/imagenes del juego/Ranking.png",
    title: "Rankings Globales",
    color: "text-violet2",
    desc: "Sistema de clasificación competitiva. Sube de rango enfrentando a los mejores jugadores de la comunidad hispana.",
  },
  {
    n: "04",
    image: "/imagenes del juego/Deck Activo.png",
    title: "Gestión de Mazos",
    color: "text-sky",
    desc: "Organiza tus mazos activos, guarda configuraciones y accede rápidamente a tus estrategias favoritas.",
  },
  {
    n: "05",
    image: "/imagenes del juego/Gym.png",
    title: "Enfrentamientos de Líder",
    color: "text-lime",
    desc: "Enfréntate a jugadores reales en batallas de gimnasio. Gana medallas, desbloquea recompensas exclusivas y demuestra tu dominio del TCG.",
  },
  {
    n: "06",
    image: "/imagenes del juego/GTS.png",
    title: "Intercambio Global",
    color: "text-[#FF7EB3]",
    desc: "Sistema de intercambio seguro. Comparte cartas con la comunidad y completa tu colección fácilmente.",
  },
];
</script>

<template>
  <section
    id="features"
    class="section-features px-[5vw] py-28 bg-ink relative overflow-hidden"
  >
    <!-- Ghost watermark -->
    <span
      class="absolute font-display font-extrabold text-[30vw] text-white/[0.015] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none leading-none select-none"
    >
      TCG
    </span>

    <div class="reveal mb-16">
      <div class="sec-label">Características</div>
      <h2
        class="font-display font-extrabold text-white leading-[0.95]"
        style="font-size: clamp(2rem, 5.5vw, 5rem)"
      >
        Descubre <br />
        <em class="not-italic text-lime">NEOTCG</em>
      </h2>
    </div>

    <div class="features-container">
      <div
        v-for="(f, index) in features"
        :key="f.n"
        class="feat-card-stack group cursor-pointer"
        :style="{ '--delay': `${index * 0.2}s`, '--index': index }"
      >
        <!-- Stack de cartas detrás -->
        <div class="card-stack">
          <div class="stack-card stack-1"></div>
          <div class="stack-card stack-2"></div>
          <div class="stack-card stack-3"></div>
        </div>

        <!-- Carta principal -->
        <div class="main-card">
          <div class="card-number">{{ f.n }}</div>
          <div class="image-container">
            <img :src="f.image" :alt="f.title" class="feature-image" />
            <div class="image-overlay"></div>
          </div>
          <div class="card-content">
            <h3 class="card-title" :class="f.color">{{ f.title }}</h3>
            <p class="card-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 4rem;
  padding: 2rem 0;
}

@media (max-width: 1200px) {
  .features-container {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .features-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 480px) {
  .features-container {
    gap: 2rem;
  }
}

.feat-card-stack {
  position: relative;
  height: 500px;
  perspective: 1000px;
  opacity: 0;
  transform: translateY(60px) rotateX(20deg);
  animation: cardReveal 1s ease calc(var(--delay) + 0.5s) forwards;
}

.card-stack {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.stack-card {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.01)
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.stack-1 {
  transform: translateZ(-20px) translateY(8px) rotate(-2deg);
  opacity: 0.7;
}

.stack-2 {
  transform: translateZ(-10px) translateY(4px) rotate(1deg);
  opacity: 0.8;
}

.stack-3 {
  transform: translateZ(-5px) translateY(2px) rotate(-0.5deg);
  opacity: 0.9;
}

.main-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.02)
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  backdrop-filter: blur(30px);
  padding: 2rem;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  overflow: hidden;
}

.feat-card-stack:hover .main-card {
  transform: translateZ(40px) rotateY(-5deg) rotateX(5deg);
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.feat-card-stack:hover .stack-1 {
  transform: translateZ(-30px) translateY(12px) rotate(-4deg);
}

.feat-card-stack:hover .stack-2 {
  transform: translateZ(-20px) translateY(8px) rotate(2deg);
}

.feat-card-stack:hover .stack-3 {
  transform: translateZ(-10px) translateY(4px) rotate(-1deg);
}

.card-number {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.1);
  line-height: 1;
  transition: all 0.4s ease;
}

.feat-card-stack:hover .card-number {
  color: rgba(245, 200, 66, 0.3);
  transform: scale(1.1);
}

.image-container {
  position: relative;
  width: 100%;
  height: 220px;
  margin-bottom: 2rem;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
}

.feature-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: brightness(0.9) contrast(1.1);
}

.feat-card-stack:hover .feature-image {
  transform: scale(1.15) rotate(2deg);
  filter: brightness(1.1) contrast(1.2);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(245, 200, 66, 0.15) 0%,
    transparent 30%,
    transparent 70%,
    rgba(232, 35, 10, 0.15) 100%
  );
  opacity: 0;
  transition: opacity 0.6s ease;
}

.feat-card-stack:hover .image-overlay {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 10;
}

.card-title {
  font-family: "Syne", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.4s ease;
  line-height: 1.2;
}

.feat-card-stack:hover .card-title {
  transform: translateY(-2px);
  text-shadow: 0 0 20px currentColor;
}

.card-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 0.95rem;
  transition: all 0.4s ease;
}

.feat-card-stack:hover .card-desc {
  color: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

@keyframes cardReveal {
  0% {
    opacity: 0;
    transform: translateY(60px) rotateX(20deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

.reveal {
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

.sec-label {
  font-family: "DM Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #f5c842;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sec-label::before {
  content: "";
  width: 24px;
  height: 2px;
  background: #f5c842;
}

/* Responsive */
@media (max-width: 1024px) {
  .section-features {
    padding: 4rem 4vw;
  }

  .feat-card-stack {
    height: 480px;
  }
}

@media (max-width: 768px) {
  .section-features {
    padding: 3rem 6vw;
  }

  .feat-card-stack {
    height: 420px;
  }

  .main-card {
    padding: 1.5rem;
  }

  .image-container {
    height: 160px;
    margin-bottom: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
    margin-bottom: 0.8rem;
  }

  .card-desc {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .card-number {
    font-size: 2.5rem;
    top: 1rem;
    right: 1rem;
  }

  /* Reducir efectos 3D en móvil */
  .feat-card-stack:hover .main-card {
    transform: translateZ(20px) rotateY(-2deg) rotateX(2deg);
  }

  .feat-card-stack:hover .stack-1 {
    transform: translateZ(-15px) translateY(6px) rotate(-2deg);
  }

  .feat-card-stack:hover .stack-2 {
    transform: translateZ(-10px) translateY(4px) rotate(1deg);
  }

  .feat-card-stack:hover .stack-3 {
    transform: translateZ(-5px) translateY(2px) rotate(-0.5deg);
  }
}

@media (max-width: 480px) {
  .section-features {
    padding: 2.5rem 5vw;
  }

  .feat-card-stack {
    height: 380px;
  }

  .main-card {
    padding: 1.25rem;
  }

  .image-container {
    height: 140px;
    margin-bottom: 1.25rem;
  }

  .card-title {
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
  }

  .card-desc {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .card-number {
    font-size: 2rem;
    top: 0.8rem;
    right: 0.8rem;
  }

  /* Simplificar animaciones en móvil pequeño */
  .feat-card-stack:hover .feature-image {
    transform: scale(1.05);
  }
}

@media (max-width: 360px) {
  .feat-card-stack {
    height: 350px;
  }

  .main-card {
    padding: 1rem;
  }

  .image-container {
    height: 120px;
    margin-bottom: 1rem;
  }

  .card-title {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }

  .card-desc {
    font-size: 0.8rem;
  }

  .card-number {
    font-size: 1.8rem;
    top: 0.6rem;
    right: 0.6rem;
  }
}
</style>
