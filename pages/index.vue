<script setup lang="ts">
const { activate } = useReveal();
const showLoader = ref(true);
const isFirstVisit = ref(true);

onMounted(() => {
  // Check if user has visited before
  const hasVisited = localStorage.getItem("neocaoh-visited");
  if (hasVisited) {
    isFirstVisit.value = false;
    showLoader.value = false;
    activate();
  }
});

const onLoaderComplete = () => {
  showLoader.value = false;
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
    <div :class="{ 'opacity-0': showLoader }">
      <HomeHeroScroll />
      <HomeTypesBar />
      <HomeStatsStrip />
      <HomeFeaturesGrid />
      <HomeStorySection />
      <HomeCtaSection />
    </div>
  </div>
</template>
