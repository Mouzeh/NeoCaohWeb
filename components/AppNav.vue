<script setup lang="ts">
const links = [
  { label: "Home", to: "/" },
  { label: "Jugar", to: "/play" },
  { label: "Noticias", to: "/blog" },
  { label: "Descargar", to: "/descargar" },
];
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[800] flex items-center justify-between px-12 py-4"
    style="
      background: linear-gradient(
        to bottom,
        rgba(13, 10, 26, 0.98) 60%,
        transparent
      );
    "
  >
    <NuxtLink
      to="/"
      class="font-display font-extrabold text-[1.6rem] tracking-[0.06em] text-white no-underline"
    >
      Neo<span class="text-scarlet">Caoh</span>
    </NuxtLink>

    <ul class="hidden md:flex gap-9 list-none">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-muted no-underline transition-colors hover:text-white"
          :class="link.to === '/play' ? 'text-gold hover:text-yellow-300' : ''"
        >
          {{ link.label }}
          <span
            v-if="link.to === '/play'"
            class="ml-1.5 text-[0.55rem] bg-gold text-ink px-1.5 py-0.5 rounded-full font-bold align-middle"
          >
            NUEVO
          </span>
        </NuxtLink>
      </li>
    </ul>

    <div class="flex items-center gap-3">
      <NuxtLink
        to="/play"
        class="font-display font-bold text-[0.8rem] tracking-[0.1em] uppercase bg-gold text-ink px-5 py-2.5 rounded-md no-underline transition-all hover:bg-yellow-300"
      >
        ▶ Jugar en Web
      </NuxtLink>
      <NuxtLink
        to="/descargar"
        class="font-display font-bold text-[0.8rem] tracking-[0.1em] uppercase border border-white/20 text-white px-5 py-2.5 rounded-md no-underline transition-all hover:border-white/60"
      >
        Descargar
      </NuxtLink>
    </div>
  </nav>
</template>
