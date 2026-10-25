<script setup lang="ts">
import { SITE } from "~/data/site";

// URL canónica (siempre con www y sin "/" final) y og:url por página
const route = useRoute();
const canonical = computed(() => SITE.url + (route.path === "/" ? "/" : route.path.replace(/\/$/, "")));
useHead({
  link: [{ rel: "canonical", href: canonical }],
  meta: [{ property: "og:url", content: canonical }],
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
