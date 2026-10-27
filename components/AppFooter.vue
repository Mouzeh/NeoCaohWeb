<script setup lang="ts">
import { SITE } from '~/data/site'

const configureCookies = () => {
  if (process.client && (window as any).showCookieSettings) {
    (window as any).showCookieSettings()
  }
}

const cols = [
  {
    head: 'Juego',
    links: [
      { label: 'Jugar en web', to: '/play' },
      { label: 'Cartas',       to: '/cartas' },
      { label: 'Ranking',      to: '/ranking' },
      { label: 'Descargar',    to: '/descargar' },
      { label: 'Noticias',     to: '/blog' },
    ],
  },
  {
    head: 'Comunidad',
    links: [
      { label: 'Instagram', to: SITE.instagram, external: true },
      { label: 'Facebook',  to: SITE.facebook, external: true },
      { label: 'Discord',   to: SITE.discord, external: true },
      { label: 'WhatsApp',  to: SITE.whatsapp, external: true },
    ],
  },
  {
    head: 'Proyecto',
    links: [
      { label: 'Donar',     to: '/donar' },
      { label: 'Contacto',  to: '/contacto' },
      { label: 'Términos',  to: '/terminos' },
      { label: 'Cookies',   to: '/cookies' },
    ],
  },
]
</script>

<template>
  <footer class="relative bg-night text-white pt-24 px-6 md:px-[6vw] overflow-hidden">
    <div class="relative grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 max-w-[1300px] mx-auto">
      <!-- Marca -->
      <div class="col-span-2 md:col-span-1">
        <span class="flex items-center gap-2 font-display font-black italic text-2xl tracking-[0.04em] mb-4">
          <span class="sparkle w-5 h-5 bg-aqua" aria-hidden="true" />
          NEO<span class="text-aqua">CAOH</span>
        </span>
        <p class="text-sm text-white/55 leading-relaxed max-w-[300px]">
          El simulador TCG Pokémon de la comunidad hispana. Gratuito,
          competitivo y siempre en evolución.
        </p>
        <NuxtLink to="/play" class="btn-primary mt-8 !py-3 !px-6"><AppIcon name="play" class="w-4 h-4" /> Jugar ahora</NuxtLink>
      </div>

      <!-- Columnas -->
      <div v-for="col in cols" :key="col.head">
        <div class="flex items-center gap-2 font-display font-bold text-[0.68rem] tracking-[0.3em] uppercase text-aqua mb-5">
          <span class="stripes w-5 h-3 text-aqua" aria-hidden="true" />
          {{ col.head }}
        </div>
        <ul class="space-y-3 list-none">
          <li v-for="link in col.links" :key="link.label">
            <a v-if="link.external"
               :href="link.to"
               target="_blank"
               rel="noopener noreferrer"
               class="font-display font-bold text-[0.9rem] text-white/65 no-underline transition-colors hover:text-white">
              {{ link.label }}
            </a>
            <NuxtLink v-else
              :to="link.to"
              class="font-display font-bold text-[0.9rem] text-white/65 no-underline transition-colors hover:text-white"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Wordmark gigante -->
    <div
      class="relative mt-20 font-display font-black italic leading-[0.78] tracking-[-0.02em] text-center select-none whitespace-nowrap text-white/[0.06]"
      style="font-size: 27vw"
      aria-hidden="true"
    >
      NEOCAOH
    </div>

    <!-- Barra inferior -->
    <div class="relative py-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-3 max-w-[1300px] mx-auto">
      <div class="flex items-center gap-4">
        <span class="font-mono text-[0.65rem] tracking-wide text-white/40">
          © {{ new Date().getFullYear() }} NeoCaoh — Proyecto comunitario fan-made
        </span>
        <button @click="configureCookies"
                class="font-mono text-[0.65rem] tracking-wide text-white/50 hover:text-aqua transition-colors underline">
          Configurar cookies
        </button>
      </div>
      <span class="font-mono text-[0.65rem] tracking-wide text-white/40">
        Pokémon es marca de Nintendo / Game Freak. Sin fines de lucro.
      </span>
    </div>
  </footer>
</template>
