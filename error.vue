<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const is404 = computed(() => props.error.statusCode === 404);

useSeoMeta({ title: is404.value ? "Página no encontrada — NeoCaoh" : "Error — NeoCaoh", robots: "noindex" });

const goHome = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout>
    <section class="relative min-h-[100svh] bg-indigo text-white overflow-hidden flex items-center px-6 md:px-[6vw] pt-28 pb-16">
      <span class="stripes absolute left-0 bottom-0 w-[35%] h-[50%] text-white/[0.05]" aria-hidden="true" />
      <span
        class="absolute right-[-4vw] bottom-[-6vw] font-display font-black italic leading-none text-white/[0.06] select-none pointer-events-none"
        style="font-size: 40vw"
        aria-hidden="true"
        >{{ error.statusCode }}</span
      >
      <div class="relative max-w-[1300px] mx-auto w-full">
        <span class="sec-head-sub text-aqua">
          <span class="stripes w-8 h-5 text-aqua" />
          Error {{ error.statusCode }}
        </span>
        <h1
          class="font-display font-black italic uppercase leading-[0.88] mt-4"
          style="font-size: clamp(3.2rem, 9vw, 8.5rem)"
        >
          <template v-if="is404">Esta carta<br /><span class="text-aqua">no existe</span></template>
          <template v-else>Algo salió<br /><span class="text-aqua">mal</span></template>
        </h1>
        <p class="mt-6 max-w-[480px] text-white/75 text-lg leading-relaxed">
          {{ is404 ? "La página que buscas no está en el mazo. Vuelve al inicio y sigue jugando." : error.message }}
        </p>
        <div class="flex flex-wrap gap-3 mt-9">
          <button type="button" class="btn-primary" @click="goHome">
            <AppIcon name="arrow-left" class="w-4 h-4" />
            Volver al inicio
          </button>
          <NuxtLink to="/cartas" class="btn-outline">Ver cartas</NuxtLink>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
