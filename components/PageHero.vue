<script setup lang="ts">
// Cabecera común de páginas internas: panel índigo con corte diagonal,
// encabezado bilingüe y título grande en itálica.
const props = withDefaults(
  defineProps<{
    sub: string;
    big: string;
    title?: string[];
    accent?: number;
    description?: string;
  }>(),
  { accent: 1 },
);

const root = ref<HTMLElement | null>(null);
const pending = usePageIntro(root);
</script>

<template>
  <section
    ref="root"
    class="page-hero relative bg-indigo text-white overflow-hidden pt-36 md:pt-44 pb-[calc(6vw+4.5rem)] px-6 md:px-[6vw]"
    :class="{ 'intro-pending': pending }"
  >
    <span class="stripes absolute left-0 bottom-0 w-[32%] h-[55%] text-white/[0.05]" aria-hidden="true" />
    <span
      class="absolute right-[-3vw] top-24 font-display font-black italic uppercase leading-none text-white/[0.05] whitespace-nowrap select-none pointer-events-none"
      style="font-size: 20vw"
      aria-hidden="true"
      >{{ props.big }}</span
    >
    <span class="sparkle absolute w-9 h-9 bg-aqua right-[12%] top-[34%] hidden md:block" aria-hidden="true" />
    <span class="sparkle absolute w-4 h-4 bg-white/70 right-[22%] top-[58%] hidden md:block" aria-hidden="true" />

    <div class="relative max-w-[1300px] mx-auto">
      <span class="ix-fade sec-head-sub text-aqua">
        <span class="stripes w-8 h-5 text-aqua" />
        {{ props.sub }}
      </span>

      <h1
        v-if="props.title"
        class="font-display font-black italic uppercase leading-[0.88] mt-4"
        style="font-size: clamp(3.2rem, 8.5vw, 8rem)"
      >
        <span
          v-for="(line, i) in props.title"
          :key="line"
          class="ix-line block overflow-hidden pr-[0.08em]"
          :class="i === props.accent ? 'text-aqua' : ''"
        >
          <span class="block">{{ line }}</span>
        </span>
      </h1>

      <p v-if="props.description" class="ix-fade mt-6 max-w-[540px] text-white/75 text-lg leading-relaxed">
        {{ props.description }}
      </p>

      <div v-if="$slots.default" class="ix-fade mt-8">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%);
}
</style>
