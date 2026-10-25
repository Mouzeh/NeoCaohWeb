<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent('blog', route.params.slug as string).findOne()
)

if (!post.value) throw createError({ statusCode: 404, message: 'Post no encontrado' })

useSeoMeta({
  title:       `${post.value.title} — NeoCaoh`,
  description: post.value.description,
  ogImage:     post.value.image,
})

const { data: others } = await useAsyncData(`post-others-${route.params.slug}`, () =>
  queryContent('blog')
    .where({ _path: { $ne: post.value!._path } })
    .sort({ date: -1 })
    .limit(2)
    .find()
)

const date = computed(() =>
  new Date(`${post.value!.date}T12:00:00`).toLocaleDateString('es-CL', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  })
)

const heroRef = ref<HTMLElement | null>(null)
const pending = usePageIntro(heroRef, (tl, q) => {
  tl.fromTo(
    q('.post-cover'),
    { y: 60, rotate: 3, autoAlpha: 0 },
    { y: 0, rotate: 0, autoAlpha: 1, duration: 1.2, ease: 'power4.out' },
    0.2,
  )
})
</script>

<template>
  <article class="bg-night text-white min-h-screen">
    <!-- Cabecera -->
    <header
      ref="heroRef"
      class="post-hero relative bg-indigo overflow-hidden pt-32 md:pt-40 pb-[calc(6vw+4rem)] px-6 md:px-[6vw]"
      :class="{ 'intro-pending': pending }"
    >
      <span class="stripes absolute left-0 bottom-0 w-[30%] h-[50%] text-white/[0.05]" aria-hidden="true" />
      <div class="relative max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div>
          <NuxtLink
            to="/blog"
            class="ix-fade inline-flex items-center gap-2 font-display font-bold uppercase tracking-[0.2em] text-sm text-white/70 no-underline hover:text-white transition-colors"
          >
            <AppIcon name="arrow-left" class="w-4 h-4" />
            Volver al blog
          </NuxtLink>

          <div class="ix-fade flex flex-wrap items-center gap-3 mt-8">
            <span
              v-if="post!.tag"
              class="px-3 py-1 rounded-full bg-night font-display font-bold uppercase tracking-[0.18em] text-[0.72rem]"
            >
              {{ post!.tag }}
            </span>
            <span class="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-white/70">{{ date }}</span>
          </div>

          <h1
            class="ix-line overflow-hidden font-display font-black italic uppercase leading-[0.9] mt-5"
            style="font-size: clamp(2.6rem, 6vw, 5.6rem)"
          >
            <span class="block pr-[0.06em]">{{ post!.title }}</span>
          </h1>
          <p v-if="post!.description" class="ix-fade mt-6 max-w-[600px] text-white/75 text-lg leading-relaxed">
            {{ post!.description }}
          </p>
        </div>

        <div v-if="post!.image" class="post-cover ix-hide relative hidden lg:block">
          <img
            :src="post!.image"
            :alt="post!.title"
            class="w-full max-h-[420px] object-contain drop-shadow-[0_40px_50px_rgba(16,13,38,0.6)]"
            :class="post!.image.includes('imagenes del juego') ? 'rounded-[22px] border-4 border-night object-cover' : ''"
          />
        </div>
      </div>
    </header>

    <!-- Contenido -->
    <div class="px-6 md:px-[6vw] pt-16 pb-24">
      <div class="post-body prose prose-lg prose-neocaoh max-w-[760px] mx-auto">
        <ContentRenderer :value="post!" />
      </div>
    </div>

    <!-- Más noticias -->
    <section v-if="others?.length" class="px-6 md:px-[6vw] pb-28">
      <div class="max-w-[1300px] mx-auto">
        <div class="flex items-center justify-between gap-6 mb-8 border-t border-white/10 pt-12">
          <h2 class="font-display font-black italic uppercase text-4xl md:text-5xl">Más noticias</h2>
          <NuxtLink to="/blog" class="btn-outline !py-3 !px-6">
            Ver todas
            <AppIcon name="arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BlogPostCard v-for="p in others" :key="p._path" :post="p" />
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.post-hero {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%);
}
</style>
