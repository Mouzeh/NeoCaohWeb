<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent('blog', route.params.slug as string).findOne()
)

if (!post.value) throw createError({ statusCode: 404, message: 'Post no encontrado' })

useSeoMeta({
  title:       `${post.value.title} — NeoCaoh`,
  description: post.value.description,
})
</script>

<template>
  <article class="min-h-screen bg-ink pt-28 pb-24">
    <!-- Hero -->
    <div class="px-[5vw] mb-16">
      <NuxtLink to="/blog" class="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-muted no-underline hover:text-white transition-colors">
        ← Volver al Blog
      </NuxtLink>

      <div class="mt-8 max-w-3xl">
        <span v-if="post.tag"
              class="inline-block font-mono text-[0.62rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded mb-5"
              :class="{
                'bg-scarlet text-white':  post.tag === 'Torneo',
                'bg-violet2 text-white':  post.tag === 'Update',
                'bg-sky text-ink':        post.tag === 'Comunidad',
              }">
          {{ post.tag }}
        </span>

        <h1 class="font-display font-extrabold text-white leading-[0.92] mb-4"
            style="font-size: clamp(2.4rem, 6vw, 5rem)">
          {{ post.title }}
        </h1>

        <p class="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted">
          {{ new Date(post.date).toLocaleDateString('es-CL', { weekday:'long', day:'2-digit', month:'long', year:'numeric' }) }}
        </p>
      </div>
    </div>

    <!-- Divider -->
    <div class="border-t border-white/[0.06] mb-16" />

    <!-- Content -->
    <div class="px-[5vw]">
      <div class="max-w-3xl prose-neocaoh">
        <ContentRenderer :value="post" />
      </div>
    </div>
  </article>
</template>
