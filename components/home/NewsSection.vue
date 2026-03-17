<script setup lang="ts">
const { data: posts } = await useAsyncData('latest-posts', () =>
  queryContent('blog')
    .sort({ date: -1 })
    .limit(3)
    .find()
)

const tagClass = (tag: string) => ({
  'Torneo':    'bg-scarlet text-white',
  'Update':    'bg-violet2 text-white',
  'Comunidad': 'bg-sky text-ink',
}[tag] ?? 'bg-panel text-offwhite')
</script>

<template>
  <section id="news" class="px-[5vw] py-28 bg-ink">
    <!-- Header -->
    <div class="flex justify-between items-end mb-14 flex-wrap gap-6">
      <div>
        <div class="sec-label reveal">Últimas Noticias</div>
        <h2 class="font-display font-extrabold text-white leading-[0.95] reveal"
            style="font-size: clamp(2rem, 4vw, 3.8rem)">
          Lo que está<br><em class="not-italic text-lime">pasando</em>
        </h2>
      </div>
      <NuxtLink to="/blog" class="btn-outline reveal">Ver Todas →</NuxtLink>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr] gap-6">
      <article v-for="(post, i) in posts" :key="post._path"
               class="news-card reveal">
        <!-- Thumbnail -->
        <div class="relative overflow-hidden bg-ink2 flex items-center justify-center"
             :class="i === 0 ? 'aspect-video' : 'aspect-[4/3]'">
          <div class="absolute inset-0"
               style="background-image: radial-gradient(rgba(123,47,190,0.3) 1px, transparent 1px); background-size: 20px 20px" />
          <div class="absolute inset-0"
               style="background: radial-gradient(circle at 50% 90%, rgba(232,35,10,0.22), transparent 55%)" />
          <span class="relative z-10 text-[2.8rem]" :class="i !== 0 && 'text-[2rem]'">
            {{ post.emoji ?? '📰' }}
          </span>
          <span v-if="post.tag"
                class="absolute top-2.5 left-2.5 z-20 font-mono text-[0.58rem] tracking-[0.16em] uppercase px-2.5 py-1 rounded"
                :class="tagClass(post.tag)">
            {{ post.tag }}
          </span>
        </div>

        <!-- Body -->
        <div class="p-7">
          <p class="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted mb-2">
            {{ new Date(post.date).toLocaleDateString('es-CL', { day:'2-digit', month:'short', year:'numeric' }) }}
          </p>
          <h3 class="font-display font-bold text-white leading-snug mb-2"
              :class="i === 0 ? 'text-[1.1rem]' : 'text-[0.92rem]'">
            {{ post.title }}
          </h3>
          <p v-if="i === 0" class="text-sm text-muted leading-[1.7] mb-4">{{ post.description }}</p>
          <NuxtLink v-if="i === 0"
                    :to="post._path"
                    class="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-gold no-underline transition-all hover:tracking-[0.18em]">
            Leer más →
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>
