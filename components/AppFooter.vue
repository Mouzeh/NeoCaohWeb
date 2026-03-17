<script setup lang="ts">
const configureCookies = () => {
  if (process.client && (window as any).showCookieSettings) {
    (window as any).showCookieSettings()
  }
}

const cols = [
  {
    head: 'Juego',
    links: [
      { label: 'Descargar', to: '/descargar' },
    ],
  },
  {
    head: 'Comunidad',
    links: [
      { label: 'Facebook',  to: 'https://www.facebook.com/profile.php?id=61586292251689', external: true },
      { label: 'Discord',   to: 'https://discord.gg/', external: true },
      { label: 'Instagram', to: '#', external: true },
    ],
  },
  {
    head: 'Proyecto',
    links: [
      { label: 'Acerca de', to: '/acerca' },
      { label: 'Contacto',  to: '/contacto' },
      { label: 'Términos',  to: '/terminos' },
      { label: 'Cookies',   to: '/cookies' },
    ],
  },
]
</script>

<template>
  <footer class="bg-ink border-t border-white/5 pt-20 pb-0 px-[5vw]">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-16">

      <!-- Brand -->
      <div>
        <span class="block font-display font-extrabold text-3xl tracking-[0.06em] text-white mb-3">
          Neo<span class="text-scarlet">Caoh</span>
        </span>
        <p class="text-sm text-muted leading-relaxed max-w-[272px]">
          El simulador TCG Pokémon de la comunidad hispana. Gratuito, competitivo y siempre en evolución.
        </p>
        <div class="flex gap-2 mt-5">
          <a href="https://www.facebook.com/profile.php?id=61586292251689"
             target="_blank"
             rel="noopener noreferrer"
             class="w-9 h-9 rounded bg-panel border border-white/7 flex items-center justify-center text-sm no-underline transition-colors hover:bg-blue-600">
            📘
          </a>
          <a href="https://discord.gg/"
             target="_blank"
             rel="noopener noreferrer"
             class="w-9 h-9 rounded bg-panel border border-white/7 flex items-center justify-center text-sm no-underline transition-colors hover:bg-indigo-600">
            💬
          </a>
          <a href="#"
             target="_blank"
             rel="noopener noreferrer"
             class="w-9 h-9 rounded bg-panel border border-white/7 flex items-center justify-center text-sm no-underline transition-colors hover:bg-pink-600">
            📸
          </a>
        </div>
      </div>

      <!-- Link columns -->
      <div v-for="col in cols" :key="col.head">
        <div class="font-mono text-[0.62rem] tracking-[0.28em] uppercase text-gold mb-5">
          {{ col.head }}
        </div>
        <ul class="space-y-2.5 list-none">
          <li v-for="link in col.links" :key="link.to">
            <a v-if="link.external"
               :href="link.to"
               target="_blank"
               rel="noopener noreferrer"
               class="text-[0.87rem] text-muted no-underline transition-colors hover:text-white">
              {{ link.label }}
            </a>
            <NuxtLink v-else
              :to="link.to"
              class="text-[0.87rem] text-muted no-underline transition-colors hover:text-white"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="mt-16 py-5 border-t border-white/5 flex flex-wrap justify-between items-center gap-3">
      <div class="flex items-center gap-4">
        <span class="font-mono text-[0.62rem] tracking-wide text-muted/40">
          © {{ new Date().getFullYear() }} NeoCaoh — Proyecto Comunitario Fan-Made
        </span>
        <button @click="configureCookies"
                class="font-mono text-[0.62rem] tracking-wide text-muted/60 hover:text-gold transition-colors underline">
          Configurar Cookies
        </button>
      </div>
      <span class="font-mono text-[0.62rem] tracking-wide text-muted/40">
        Pokémon es marca de Nintendo / Game Freak. Sin fines de lucro.
      </span>
    </div>
  </footer>
</template>
