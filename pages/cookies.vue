<script setup lang="ts">
usePageSeo({
  title: 'Política de Cookies — NeoCaoh',
  description: 'Información sobre el uso de cookies en NeoCaoh, el simulador TCG Pokémon'
})

const types = [
  {
    name: 'Esenciales',
    tag: 'Siempre activas',
    desc: 'Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.',
    items: ['Configuración de cookies aceptadas', 'Estado de primera visita al sitio', 'Preferencias de idioma'],
    tone: 'bg-aqua text-night',
  },
  {
    name: 'Funcionales',
    tag: 'Opcionales',
    desc: 'Mejoran la funcionalidad y personalización del sitio.',
    items: ['Preferencias de tema', 'Configuración de la interfaz de usuario', 'Datos de sesión del simulador'],
    tone: 'bg-indigo text-white',
  },
  {
    name: 'De análisis',
    tag: 'Opcionales',
    desc: 'Nos ayudan a entender cómo los usuarios interactúan con el sitio.',
    items: ['Estadísticas de uso anónimas', 'Páginas más visitadas', 'Tiempo de permanencia en el sitio'],
    tone: 'bg-paper text-night',
  },
]

const configureCookies = () => {
  if (import.meta.client && (window as any).showCookieSettings) {
    (window as any).showCookieSettings()
  }
}
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero
      sub="Legal"
      big="cookies"
      :title="['Política', 'de cookies']"
      description="Cómo usamos las cookies para recordar tus preferencias y mejorar tu experiencia en NeoCaoh."
    />

    <section class="px-6 md:px-[6vw] pt-16 pb-28">
      <div class="max-w-[1100px] mx-auto space-y-16">
        <!-- Qué son -->
        <div class="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
          <span class="w-16 h-16 rounded-2xl bg-panel text-aqua grid place-items-center">
            <AppIcon name="cookie" class="w-8 h-8" />
          </span>
          <div>
            <h2 class="font-display font-black italic uppercase text-4xl leading-none">¿Qué son las cookies?</h2>
            <p class="mt-4 text-white/70 leading-relaxed max-w-[680px]">
              Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas un sitio web.
              Nos ayudan a recordar tus preferencias y mejorar tu experiencia de navegación en NeoCaoh.
            </p>
          </div>
        </div>

        <!-- Tipos -->
        <div>
          <h2 class="font-display font-black italic uppercase text-4xl leading-none mb-8">Tipos que utilizamos</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article v-for="t in types" :key="t.name" class="rounded-[26px] p-7" :class="t.tone">
              <span class="inline-block px-3 py-1 rounded-full bg-black/10 font-display font-bold uppercase tracking-[0.18em] text-[0.68rem]">
                {{ t.tag }}
              </span>
              <h3 class="font-display font-black italic uppercase text-3xl leading-none mt-5">{{ t.name }}</h3>
              <p class="mt-3 text-sm leading-relaxed opacity-75">{{ t.desc }}</p>
              <ul class="mt-5 space-y-2 list-none text-sm">
                <li v-for="item in t.items" :key="item" class="flex gap-2.5">
                  <AppIcon name="check" class="w-4 h-4 mt-0.5 shrink-0" />
                  {{ item }}
                </li>
              </ul>
            </article>
          </div>
        </div>

        <!-- Gestión -->
        <div class="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
          <span class="w-16 h-16 rounded-2xl bg-panel text-aqua grid place-items-center">
            <AppIcon name="gear" class="w-8 h-8" />
          </span>
          <div>
            <h2 class="font-display font-black italic uppercase text-4xl leading-none">Gestión de cookies</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              <div class="rounded-2xl bg-panel p-6">
                <span class="font-display font-black italic text-4xl text-aqua">01</span>
                <h3 class="font-display font-bold uppercase tracking-[0.06em] text-lg mt-2">En este sitio</h3>
                <p class="mt-2 text-sm text-white/60 leading-relaxed">
                  Cambia tus preferencias cuando quieras con "Configurar cookies" en el pie de página.
                </p>
              </div>
              <div class="rounded-2xl bg-panel p-6">
                <span class="font-display font-black italic text-4xl text-aqua">02</span>
                <h3 class="font-display font-bold uppercase tracking-[0.06em] text-lg mt-2">En tu navegador</h3>
                <p class="mt-2 text-sm text-white/60 leading-relaxed">
                  Puedes bloquear o eliminar cookies desde la configuración de tu navegador.
                </p>
              </div>
            </div>
            <button type="button" class="btn-primary mt-6" @click="configureCookies">
              <AppIcon name="gear" class="w-4 h-4" />
              Configurar cookies
            </button>
          </div>
        </div>

        <!-- Preguntas -->
        <div class="rounded-[26px] bg-indigo p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-start gap-4">
            <span class="w-12 h-12 rounded-2xl bg-night text-aqua grid place-items-center shrink-0">
              <AppIcon name="chat" class="w-6 h-6" />
            </span>
            <div>
              <h2 class="font-display font-black italic uppercase text-3xl leading-none">¿Tienes preguntas?</h2>
              <p class="mt-2 text-white/75">Si tienes dudas sobre nuestra política de cookies, escríbenos.</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/contacto" class="btn-dark">Contactar</NuxtLink>
            <NuxtLink to="/terminos" class="btn-outline">Términos</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
