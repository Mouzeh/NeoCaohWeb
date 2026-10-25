<script setup lang="ts">
import gsap from 'gsap'

const { data: posts } = await useAsyncData('latest-posts', () =>
  queryContent('blog')
    .sort({ date: -1 })
    .limit(3)
    .find()
)

const root = ref<HTMLElement | null>(null)

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from('.news-head > *', {
      y: 60,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: root.value, start: 'top 75%' },
    })
    gsap.from('.news-item', {
      y: 80,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.news-grid', start: 'top 85%' },
    })
  })
}, root)
</script>

<template>
  <section id="news" ref="root" class="relative bg-night px-6 md:px-[6vw] pb-28 pt-8">
    <div class="max-w-[1300px] mx-auto">
      <div class="news-head flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 border-t border-white/10 pt-20">
        <div class="sec-head">
          <span class="sec-head-sub text-aqua">
            <span class="stripes w-8 h-5 text-aqua" />
            Noticias
          </span>
          <h2 class="sec-head-big text-white">news</h2>
        </div>
        <NuxtLink to="/blog" class="btn-outline self-start md:self-auto">
          Ver todas
          <AppIcon name="arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="news-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        <BlogPostCard
          v-for="post in posts"
          :key="post._path"
          :post="post"
          class="news-item"
        />
      </div>
    </div>
  </section>
</template>
