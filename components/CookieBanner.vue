<script setup lang="ts">
const showBanner = ref(false)
const showSettings = ref(false)

// Cookie preferences
const preferences = ref({
  essential: true, // Always true, can't be disabled
  functional: true,
  analytics: true
})

onMounted(() => {
  // Check if user has already made a choice
  const hasConsent = localStorage.getItem('neocaoh-cookies-consent')
  if (!hasConsent) {
    showBanner.value = true
  } else {
    // Load saved preferences
    const savedPrefs = localStorage.getItem('neocaoh-cookies-preferences')
    if (savedPrefs) {
      const parsed = JSON.parse(savedPrefs)
      preferences.value = { ...preferences.value, ...parsed }
    }
  }
})

const acceptAll = () => {
  preferences.value = {
    essential: true,
    functional: true,
    analytics: true
  }
  savePreferences()
  showBanner.value = false
  showSettings.value = false
}

const acceptSelected = () => {
  savePreferences()
  showBanner.value = false
  showSettings.value = false
}

const rejectOptional = () => {
  preferences.value = {
    essential: true,
    functional: false,
    analytics: false
  }
  savePreferences()
  showBanner.value = false
  showSettings.value = false
}

const savePreferences = () => {
  localStorage.setItem('neocaoh-cookies-consent', 'true')
  localStorage.setItem('neocaoh-cookies-preferences', JSON.stringify(preferences.value))

  // Apply cookie preferences (you can extend this to actually control cookie usage)
  if (preferences.value.analytics) {
    // Enable analytics tracking
    console.log('Analytics cookies enabled')
  } else {
    // Disable analytics tracking
    console.log('Analytics cookies disabled')
  }
}

// Expose function to show settings (can be called from footer)
const showCookieSettings = () => {
  showSettings.value = true
}

// Make function available globally
if (process.client) {
  (window as any).showCookieSettings = showCookieSettings
}
</script>

<template>
  <!-- Cookie Banner -->
  <Transition name="cookie-slide" appear>
    <div v-if="showBanner"
         class="fixed bottom-0 left-0 right-0 z-[900] p-4 md:p-6">
      <div class="max-w-4xl mx-auto">
        <div class="bg-panel/90 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg">
          <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <!-- Content -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-lg">🍪</span>
                <div>
                  <p class="text-white text-sm leading-relaxed">
                    Utilizamos cookies para mejorar tu experiencia.
                    <NuxtLink to="/cookies" class="text-gold hover:text-yellow-300 underline">Más información</NuxtLink>
                  </p>
                </div>
              </div>

            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button @click="showSettings = true"
                      class="px-4 py-2 text-xs border border-white/20 rounded text-muted hover:text-white hover:bg-white/5 transition-colors">
                Configurar
              </button>
              <button @click="acceptAll"
                      class="px-4 py-2 text-xs bg-gold hover:bg-yellow-500 rounded text-ink font-medium transition-colors">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Cookie Settings Modal -->
  <Transition name="modal-fade">
    <div v-if="showSettings"
         class="fixed inset-0 z-[950] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"
           @click="showSettings = false"></div>

      <!-- Modal -->
      <div class="relative bg-panel border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-display font-bold text-2xl text-white">
            Configuración de Cookies
          </h2>
          <button @click="showSettings = false"
                  class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <span class="text-xl">×</span>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Essential Cookies -->
          <div class="border border-white/10 rounded-lg p-6">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-green-400 text-sm">✓</span>
                </div>
                <div>
                  <h3 class="font-bold text-white">Cookies Esenciales</h3>
                  <p class="text-xs text-muted">Siempre activas</p>
                </div>
              </div>
              <div class="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end p-1">
                <div class="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <p class="text-sm text-muted">
              Necesarias para el funcionamiento básico del sitio web. Incluyen navegación, acceso a áreas seguras y preferencias básicas.
            </p>
          </div>

          <!-- Functional Cookies -->
          <div class="border border-white/10 rounded-lg p-6">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-blue-400 text-sm">⚙️</span>
                </div>
                <div>
                  <h3 class="font-bold text-white">Cookies Funcionales</h3>
                  <p class="text-xs text-muted">Mejoran la experiencia</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="preferences.functional" class="sr-only">
                <div :class="[
                  'w-12 h-6 rounded-full transition-colors',
                  preferences.functional ? 'bg-blue-500' : 'bg-gray-600'
                ]">
                  <div :class="[
                    'w-4 h-4 bg-white rounded-full transition-transform duration-200',
                    preferences.functional ? 'translate-x-7' : 'translate-x-1',
                    'mt-1'
                  ]"></div>
                </div>
              </label>
            </div>
            <p class="text-sm text-muted">
              Permiten funcionalidades mejoradas como recordar tus preferencias de interfaz, configuraciones de juego y personalización.
            </p>
          </div>

          <!-- Analytics Cookies -->
          <div class="border border-white/10 rounded-lg p-6">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span class="text-orange-400 text-sm">📊</span>
                </div>
                <div>
                  <h3 class="font-bold text-white">Cookies de Análisis</h3>
                  <p class="text-xs text-muted">Nos ayudan a mejorar</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="preferences.analytics" class="sr-only">
                <div :class="[
                  'w-12 h-6 rounded-full transition-colors',
                  preferences.analytics ? 'bg-orange-500' : 'bg-gray-600'
                ]">
                  <div :class="[
                    'w-4 h-4 bg-white rounded-full transition-transform duration-200',
                    preferences.analytics ? 'translate-x-7' : 'translate-x-1',
                    'mt-1'
                  ]"></div>
                </div>
              </label>
            </div>
            <p class="text-sm text-muted">
              Recopilan información anónima sobre cómo usas el sitio para ayudarnos a mejorarlo. No incluyen datos personales identificables.
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3 mt-8">
          <button @click="rejectOptional"
                  class="flex-1 px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors font-medium">
            Rechazar Opcionales
          </button>
          <button @click="acceptSelected"
                  class="flex-1 px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-medium transition-colors">
            Guardar Preferencias
          </button>
          <button @click="acceptAll"
                  class="flex-1 px-6 py-3 bg-scarlet hover:bg-red-700 rounded-lg text-white font-medium transition-colors">
            Aceptar Todas
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: transform 0.4s ease-out, opacity 0.3s ease-out;
}

.cookie-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from .relative {
  transform: scale(0.95);
  opacity: 0;
}

.modal-fade-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>