<script setup lang="ts">
usePageSeo({
  title: "Ranking y meta — NeoCaoh",
  description:
    "Top 10 de entrenadores por ELO y las cartas más usadas en los mazos de NeoCaoh, en vivo desde el servidor del juego.",
});
</script>

<template>
  <div class="bg-night text-white">
    <PageHero
      sub="En vivo desde el servidor"
      big="ranking"
      :title="['Quién manda', 'en la mesa']"
      description="Los mejores entrenadores por ELO y las cartas que más se están jugando este mes. Se actualiza cada minuto."
    />
    <LiveBoard />
  </div>
</template>
