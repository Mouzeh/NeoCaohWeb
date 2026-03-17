<script setup lang="ts">
defineProps<{
  post: {
    _path: string
    title: string
    description?: string
    date: string
    tag?: string
    emoji?: string
  }
  featured?: boolean
}>()

const tagClass = (tag?: string) => ({
  'Torneo':    'bg-scarlet text-white',
  'Update':    'bg-violet2 text-white',
  'Comunidad': 'bg-sky text-ink',
}[tag ?? ''] ?? 'bg-panel text-offwhite')
</script>

<template>
  <NuxtLink :to="post._path" class="news-card group block no-underline">
    <!-- Thumb -->
    <div class="relative overflow-hidden bg-ink2 flex items-center justify-center"
         :class="featured ? 'aspect-video' : 'aspect-[4/3]'">
      <div class="absolute inset-0"
           style="background-image: radial-gradient(rgba(123,47,190,0.3) 1px, transparent 1px); background-size: 20px 20px" />
      <div class="absolute inset-0"
           style="background: radial-gradient(circle at 50% 90%, rgba(232,35,10,0.22), transparent 55%)" />
      <span class="relative z-10" :class="featured ? 'text-[2.8rem]' : 'text-[2rem]'">
        {{ post.emoji ?? '📰' }}
      </span>
      <span v-if="post.tag"
            class="absolute top-2.5 left-2.5 z-20 font-mono text-[0.58rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded"
            :class="tagClass(post.tag)">
        {{ post.tag }}
      </span>
    </div>

    <!-- Body -->
    <div class="p-6">
      <p class="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-muted mb-2">
        {{ new Date(post.date).toLocaleDateString('es-CL', { day:'2-digit', month:'short', year:'numeric' }) }}
      </p>
      <h3 class="font-display font-bold text-white leading-snug mb-2 group-hover:text-gold transition-colors"
          :class="featured ? 'text-[1.1rem]' : 'text-[0.92rem]'">
        {{ post.title }}
      </h3>
      <p v-if="featured && post.description" class="text-sm text-muted leading-[1.7]">
        {{ post.description }}
      </p>
    </div>
  </NuxtLink>
</template>
