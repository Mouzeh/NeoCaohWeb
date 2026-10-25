<script setup lang="ts">
import gsap from 'gsap'

useSeoMeta({ title: 'Noticias — NeoCaoh', description: 'Últimas noticias y actualizaciones de NeoCaoh' })

const { data: posts } = await useAsyncData('all-posts', () =>
  queryContent('blog').sort({ date: -1 }).find()
)

const featured = computed(() => posts.value?.[0])
const rest     = computed(() => posts.value?.slice(1) ?? [])

const root = ref<HTMLElement | null>(null)

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from('.post-item', {
      y: 70,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: { trigger: root.value, start: 'top 85%' },
    })
  })
}, root)
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero
      sub="Blog"
      big="news"
      :title="['Noticias', 'y updates']"
      description="Expansiones nuevas, versiones del juego y todo lo que pasa en la comunidad."
    />

    <section ref="root" class="px-6 md:px-[6vw] pt-16 pb-28">
      <div class="max-w-[1300px] mx-auto">
        <div v-if="featured" class="post-item mb-6">
          <BlogPostCard :post="featured" featured />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogPostCard
            v-for="post in rest"
            :key="post._path"
            :post="post"
            class="post-item"
          />
        </div>

        <p v-if="!posts?.length" class="text-white/50 text-center py-20">
          Aún no hay posts. ¡Vuelve pronto!
        </p>
      </div>
    </section>
  </div>
</template>
