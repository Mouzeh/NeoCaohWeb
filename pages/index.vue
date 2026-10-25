<script setup lang="ts">
import { SITE } from "~/data/site";

// Datos estructurados: sitio, organización y juego
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${SITE.url}/#website`,
            url: `${SITE.url}/`,
            name: "NeoCaoh",
            inLanguage: "es",
            publisher: { "@id": `${SITE.url}/#org` },
          },
          {
            "@type": "Organization",
            "@id": `${SITE.url}/#org`,
            name: "NeoCaoh",
            url: `${SITE.url}/`,
            logo: `${SITE.url}/icon-512.png`,
            email: SITE.email,
            sameAs: [SITE.facebook, SITE.discord],
          },
          {
            "@type": "VideoGame",
            name: "NeoCaoh",
            alternateName: "NeoCaoh — Simulador Pokémon TCG",
            url: `${SITE.url}/`,
            image: `${SITE.url}/og-image.jpg`,
            description:
              "Simulador gratuito de Pokémon TCG para la comunidad hispana. Arma tu mazo con las expansiones Neo y juega online contra entrenadores de todo el mundo.",
            inLanguage: "es",
            genre: ["Juego de cartas coleccionables", "Estrategia"],
            gamePlatform: ["Windows", "macOS", "Linux", "Android", "Navegador web"],
            playMode: "MultiPlayer",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            publisher: { "@id": `${SITE.url}/#org` },
          },
        ],
      }),
    },
  ],
});

const { activate } = useReveal();
const showLoader = ref(true);
const isFirstVisit = ref(true);
const heroIntroReady = useState("hero-intro-ready", () => false);

onMounted(() => {
  // Check if user has visited before
  const hasVisited = localStorage.getItem("neocaoh-visited");
  if (hasVisited) {
    isFirstVisit.value = false;
    showLoader.value = false;
    heroIntroReady.value = true;
    activate();
  }
});

const onLoaderComplete = () => {
  showLoader.value = false;
  heroIntroReady.value = true;
  localStorage.setItem("neocaoh-visited", "true");
  activate();
};
</script>

<template>
  <div>
    <!-- Initial Loader (only on first visit) -->
    <InitialLoader
      v-if="isFirstVisit && showLoader"
      @loaded="onLoaderComplete"
    />

    <!-- Main Content -->
    <div
      class="transition-opacity duration-700"
      :class="{ 'opacity-0': showLoader }"
    >
      <HomeHeroScroll />
      <HomeTypesBar />
      <HomeStatsStrip />
      <HomeFeaturesGrid />
      <HomeStorySection />
      <HomeCardsTeaser />
      <HomeNewsSection />
      <HomeCtaSection />
    </div>
  </div>
</template>
