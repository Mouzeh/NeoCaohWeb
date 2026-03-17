<script setup lang="ts">
useSeoMeta({ title: 'Noticias — NeoCaoh', description: 'Últimas noticias y actualizaciones de NeoCaoh' })

const { activate } = useReveal()

const { data: posts } = await useAsyncData('all-posts', () =>
  queryContent('blog').sort({ date: -1 }).find()
)

const featured = computed(() => posts.value?.[0])
const rest     = computed(() => posts.value?.slice(1) ?? [])

onMounted(() => activate())
</script>

<template>
  <div class="min-h-screen bg-ink pt-28 px-[5vw] pb-24">
    <!-- Header -->
    <div class="mb-16 reveal">
      <div class="sec-label">Blog</div>
      <h1 class="font-display font-extrabold text-white leading-[0.92]"
          style="font-size: clamp(3rem, 7vw, 6rem)">
        Noticias &<br><span class="text-lime">Updates</span>
      </h1>
    </div>

    <!-- Featured post -->
    <div v-if="featured" class="mb-10 reveal">
      <BlogPostCard :post="featured" :featured="true" />
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogPostCard
        v-for="post in rest"
        :key="post._path"
        :post="post"
        class="reveal"
      />
    </div>

    <p v-if="!posts?.length" class="text-muted text-center py-20">
      Aún no hay posts. ¡Vuelve pronto!
    </p>
  </div>
</template>
