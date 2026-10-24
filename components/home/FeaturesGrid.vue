<script setup lang="ts">
import gsap from "gsap";

const features = [
  {
    n: "01",
    image: "/imagenes del juego/mesas.png",
    title: "Partidas en tiempo real",
    desc: "Motor fiel a las reglas oficiales. Juega contra rivales de todo el mundo con detección automática de errores y árbitro digital.",
  },
  {
    n: "02",
    image: "/imagenes del juego/creacion de deck.png",
    title: "Constructor de mazos",
    desc: "Editor visual con más de 220 cartas. Valida tu mazo al instante con filtros avanzados.",
  },
  {
    n: "03",
    image: "/imagenes del juego/Ranking.png",
    title: "Rankings globales",
    desc: "Clasificación competitiva. Sube de rango enfrentando a los mejores jugadores de la comunidad hispana.",
  },
  {
    n: "04",
    image: "/imagenes del juego/Deck Activo.png",
    title: "Gestión de mazos",
    desc: "Organiza tus mazos activos, guarda configuraciones y accede rápido a tus estrategias favoritas.",
  },
  {
    n: "05",
    image: "/imagenes del juego/Gym.png",
    title: "Líderes de gimnasio",
    desc: "Batallas de gimnasio contra jugadores reales. Gana medallas y desbloquea recompensas exclusivas.",
  },
  {
    n: "06",
    image: "/imagenes del juego/GTS.png",
    title: "Intercambio global",
    desc: "Intercambio seguro. Comparte cartas con la comunidad y completa tu colección.",
  },
];

const root = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from(".feat-head > *", {
      y: 60,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: { trigger: root.value, start: "top 75%" },
    });
  });

  // Desktop: la pista se desplaza en horizontal mientras la sección está fijada
  mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
    const el = track.value!;
    const distance = () => el.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(el, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: root.value,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    gsap.to(".feat-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: root.value,
        start: "top top",
        end: () => "+=" + distance(),
        scrub: true,
      },
    });

    gsap.utils.toArray<HTMLElement>(".feat-panel").forEach((panel) => {
      gsap.fromTo(
        panel.querySelector(".feat-img"),
        { xPercent: -6, scale: 1.15 },
        {
          xPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
    });
  });

  // Móvil / tablet: cada panel aparece al entrar
  mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
    gsap.utils.toArray<HTMLElement>(".feat-panel").forEach((panel) => {
      gsap.from(panel, {
        y: 60,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 85%" },
      });
    });
  });
}, root);
</script>

<template>
  <section
    id="features"
    ref="root"
    class="relative bg-paper text-night overflow-hidden lg:h-[100svh] lg:flex lg:flex-col"
  >
    <div
      ref="track"
      class="relative flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-[5vw] px-6 lg:px-[6vw] py-24 lg:py-0 lg:h-full lg:w-max"
    >
      <!-- Encabezado -->
      <div class="feat-head lg:w-[34vw] shrink-0 relative">
        <div class="sec-head">
          <span class="sec-head-sub text-indigo">
            <span class="stripes w-8 h-5 text-indigo" />
            Características
          </span>
          <h2 class="sec-head-big text-night">features</h2>
        </div>
        <p class="mt-8 max-w-[380px] text-night/70 leading-relaxed">
          Todo lo que necesitas para jugar el TCG retro como en los viejos
          tiempos, pero online y con tu comunidad.
        </p>
        <p
          class="hidden lg:flex items-center gap-3 mt-12 font-display font-bold text-[0.7rem] tracking-[0.3em] uppercase text-night/50"
        >
          Sigue bajando
          <span class="text-indigo text-lg">→</span>
        </p>
      </div>

      <!-- Paneles -->
      <article
        v-for="f in features"
        :key="f.n"
        class="feat-panel group relative shrink-0 lg:w-[min(64vw,880px)]"
      >
        <div class="flex items-end gap-4 mb-5">
          <span
            class="font-display font-black italic leading-[0.8] text-indigo"
            style="font-size: clamp(3.5rem, 7vw, 6.5rem)"
            >{{ f.n }}</span
          >
          <h3
            class="font-display font-black italic uppercase tracking-[0.04em] text-night text-3xl md:text-[2.6rem] leading-[0.95] pb-1"
          >
            {{ f.title }}
          </h3>
        </div>
        <div
          class="feat-frame relative aspect-[16/9] overflow-hidden rounded-[28px] bg-night"
        >
          <img
            :src="f.image"
            :alt="f.title"
            class="feat-img absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div
            class="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-night/90 via-night/40 to-transparent"
          >
            <p class="max-w-[520px] text-white/85 text-[0.95rem] leading-relaxed">
              {{ f.desc }}
            </p>
          </div>
          <span
            class="absolute top-5 right-5 w-11 h-11 rounded-full bg-aqua grid place-items-center transition-transform duration-500 group-hover:rotate-90"
            aria-hidden="true"
          >
            <span class="sparkle w-5 h-5 bg-night" />
          </span>
        </div>
      </article>
    </div>

    <!-- Barra de progreso -->
    <div
      class="hidden lg:block absolute left-[6vw] right-[6vw] bottom-[calc(6vw+1.5rem)] h-[3px] bg-night/10 rounded-full overflow-hidden"
      aria-hidden="true"
    >
      <div class="feat-progress h-full bg-indigo origin-left scale-x-0" />
    </div>
  </section>
</template>
