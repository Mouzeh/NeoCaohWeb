<script setup lang="ts">
useSeoMeta({
  title: 'Política de Cookies - NeoCaoh',
  description: 'Información sobre el uso de cookies en NeoCaoh, el simulador TCG Pokémon'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-12 px-[5vw]">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="font-display font-extrabold text-4xl md:text-5xl tracking-[0.06em] text-white mb-4">
          Política de <span class="text-scarlet">Cookies</span>
        </h1>
        <p class="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Información sobre cómo utilizamos las cookies para mejorar tu experiencia en NeoCaoh
        </p>
      </div>

      <!-- Content -->
      <div class="space-y-12">
        <!-- What are cookies -->
        <section class="bg-panel border border-white/10 rounded-xl p-8">
          <h2 class="font-display font-bold text-2xl text-white mb-4 flex items-center gap-3">
            <span class="w-8 h-8 bg-scarlet rounded-lg flex items-center justify-center text-sm">🍪</span>
            ¿Qué son las cookies?
          </h2>
          <p class="text-muted leading-relaxed">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.
            Nos ayudan a recordar tus preferencias y mejorar tu experiencia de navegación en NeoCaoh.
          </p>
        </section>

        <!-- Types of cookies we use -->
        <section class="bg-panel border border-white/10 rounded-xl p-8">
          <h2 class="font-display font-bold text-2xl text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-sm">⚙️</span>
            Tipos de cookies que utilizamos
          </h2>

          <div class="grid gap-6">
            <!-- Essential cookies -->
            <div class="border border-white/5 rounded-lg p-6">
              <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                Cookies Esenciales
              </h3>
              <p class="text-muted mb-3">
                Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.
              </p>
              <ul class="text-sm text-muted/80 space-y-1 ml-4">
                <li>• Configuración de cookies aceptadas</li>
                <li>• Estado de primera visita al sitio</li>
                <li>• Preferencias de idioma</li>
              </ul>
            </div>

            <!-- Functional cookies -->
            <div class="border border-white/5 rounded-lg p-6">
              <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                Cookies Funcionales
              </h3>
              <p class="text-muted mb-3">
                Mejoran la funcionalidad y personalización del sitio.
              </p>
              <ul class="text-sm text-muted/80 space-y-1 ml-4">
                <li>• Preferencias de tema (modo claro/oscuro)</li>
                <li>• Configuración de la interfaz de usuario</li>
                <li>• Datos de sesión del simulador</li>
              </ul>
            </div>

            <!-- Analytics cookies -->
            <div class="border border-white/5 rounded-lg p-6">
              <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
                Cookies de Análisis
              </h3>
              <p class="text-muted mb-3">
                Nos ayudan a entender cómo los usuarios interactúan con el sitio.
              </p>
              <ul class="text-sm text-muted/80 space-y-1 ml-4">
                <li>• Estadísticas de uso anónimas</li>
                <li>• Páginas más visitadas</li>
                <li>• Tiempo de permanencia en el sitio</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Cookie management -->
        <section class="bg-panel border border-white/10 rounded-xl p-8">
          <h2 class="font-display font-bold text-2xl text-white mb-4 flex items-center gap-3">
            <span class="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-sm">🔧</span>
            Gestión de cookies
          </h2>
          <p class="text-muted leading-relaxed mb-6">
            Puedes controlar y gestionar las cookies de diferentes maneras:
          </p>

          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 bg-scarlet/20 rounded-full flex items-center justify-center mt-0.5">
                <span class="text-scarlet text-sm">1</span>
              </div>
              <div>
                <p class="text-white font-medium mb-1">En este sitio web</p>
                <p class="text-sm text-muted">Puedes cambiar tus preferencias de cookies en cualquier momento haciendo clic en "Configurar cookies" en el pie de página.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-6 h-6 bg-scarlet/20 rounded-full flex items-center justify-center mt-0.5">
                <span class="text-scarlet text-sm">2</span>
              </div>
              <div>
                <p class="text-white font-medium mb-1">En tu navegador</p>
                <p class="text-sm text-muted">Puedes configurar tu navegador para bloquear o eliminar cookies. Consulta la ayuda de tu navegador para más información.</p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10">
            <button class="bg-scarlet hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Configurar Cookies
            </button>
          </div>
        </section>

        <!-- Contact -->
        <section class="bg-panel border border-white/10 rounded-xl p-8">
          <h2 class="font-display font-bold text-2xl text-white mb-4 flex items-center gap-3">
            <span class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">💬</span>
            ¿Tienes preguntas?
          </h2>
          <p class="text-muted leading-relaxed mb-4">
            Si tienes alguna pregunta sobre nuestra política de cookies, no dudes en contactarnos.
          </p>
          <div class="flex gap-4">
            <NuxtLink to="/contacto"
                      class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors no-underline">
              Contactar
            </NuxtLink>
            <NuxtLink to="/terminos"
                      class="border border-white/20 hover:bg-white/5 text-white px-6 py-3 rounded-lg font-medium transition-colors no-underline">
              Términos y Condiciones
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>