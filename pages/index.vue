<script setup lang="ts">
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
