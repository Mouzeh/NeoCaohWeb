<script setup lang="ts">
defineProps<{
  title:    string
  date:     string
  excerpt?: string
  tag:      string
  slug:     string
  featured?: boolean
}>()

const tagColors: Record<string, string> = {
  torneo:    'bg-scarlet text-white',
  update:    'bg-violet2 text-white',
  comunidad: 'bg-sky text-ink',
  guia:      'bg-lime text-ink',
}
</script>

<template>
  <NuxtLink
    :to="`/blog/${slug}`"
    class="card-base block no-underline group overflow-hidden"
  >
    <!-- Thumbnail placeholder -->
    <div
      class="relative overflow-hidden"
      :class="featured ? 'aspect-video' : 'aspect-[4/3]'"
      style="background: #160e2e"
    >
      <!-- Dot pattern -->
      <div class="absolute inset-0"
           style="background-image: radial-gradient(rgba(123,47,190,0.3) 1px, transparent 1px);
                  background-size: 20px 20px" />
      <!-- Glow -->
      <div class="absolute inset-0"
           style="background: radial-gradient(circle at 50% 90%, rgba(232,35,10,0.22), transparent 55%)" />
      <!-- Icon -->
      <div class="absolute inset-0 flex items-center justify-center text-5xl"
           :class="featured ? 'text-5xl' : 'text-3xl'"
           style="filter: drop-shadow(0 0 14px rgba(255,255,255,0.2))">
        <slot name="icon">📰</slot>
      </div>
      <!-- Tag -->
      <span
        class="absolute top-3 left-3 font-mono text-[0.58rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded"
        :class="tagColors[tag] ?? 'bg-panel text-offwhite'"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Body -->
    <div class="p-6">
      <div class="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted mb-2">
        {{ date }}
      </div>
      <h3
        class="font-display font-bold text-white leading-snug mb-2 group-hover:text-gold transition-colors"
        :class="featured ? 'text-xl' : 'text-base'"
      >
        {{ title }}
      </h3>
      <p v-if="featured && excerpt" class="text-sm text-muted leading-relaxed mb-4">
        {{ excerpt }}
      </p>
      <span v-if="featured"
            class="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.12em]
                   uppercase text-gold transition-all group-hover:gap-2.5">
        Leer más →
      </span>
    </div>
  </NuxtLink>
</template>
