<script setup lang="ts">
defineProps<{
  post: {
    _path: string
    title: string
    description?: string
    date: string
    tag?: string
    image?: string
  }
  featured?: boolean
}>()

// Fecha "YYYY-MM-DD" a mediodía local para evitar el desfase por zona horaria
const formatDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
</script>

<template>
  <NuxtLink
    :to="post._path"
    class="group grid no-underline rounded-[26px] overflow-hidden bg-panel transition-transform duration-500 hover:-translate-y-2"
    :class="featured ? 'lg:grid-cols-[1.35fr_1fr]' : ''"
  >
    <!-- Portada -->
    <div
      class="relative overflow-hidden bg-indigo"
      :class="featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[420px]' : 'aspect-[16/10]'"
    >
      <span class="stripes absolute inset-y-0 left-0 w-1/3 text-white/[0.06]" aria-hidden="true" />
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        class="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.06]"
        :class="post.image.includes('imagenes del juego') ? '!object-cover !p-0' : ''"
        loading="lazy"
      />
      <span v-else class="absolute inset-0 grid place-items-center text-white/40">
        <AppIcon name="news" class="w-14 h-14" />
      </span>
      <span
        v-if="post.tag"
        class="absolute top-4 left-4 px-3 py-1 rounded-full bg-night text-white font-display font-bold uppercase tracking-[0.18em] text-[0.7rem]"
      >
        {{ post.tag }}
      </span>
    </div>

    <!-- Texto -->
    <div class="flex flex-col p-6 md:p-8" :class="featured ? 'lg:justify-center lg:p-12' : ''">
      <p class="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-aqua">
        {{ formatDate(post.date) }}
      </p>
      <h3
        class="font-display font-black italic uppercase leading-[0.95] text-white mt-3 transition-colors group-hover:text-aqua"
        :class="featured ? 'text-[2.4rem] md:text-[3.2rem]' : 'text-[1.7rem]'"
      >
        {{ post.title }}
      </h3>
      <p v-if="post.description" class="mt-4 text-white/60 leading-relaxed" :class="featured ? '' : 'text-sm line-clamp-2'">
        {{ post.description }}
      </p>
      <span
        class="inline-flex items-center gap-2 mt-6 font-display font-bold uppercase tracking-[0.15em] text-sm text-white/80 group-hover:text-aqua transition-colors"
      >
        Leer más
        <AppIcon name="arrow-right" class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </NuxtLink>
</template>
