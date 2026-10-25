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

const optional = [
  {
    key: 'functional' as const,
    icon: 'gear' as const,
    name: 'Funcionales',
    hint: 'Mejoran la experiencia',
    desc: 'Recuerdan tus preferencias de interfaz, configuraciones de juego y personalización.',
  },
  {
    key: 'analytics' as const,
    icon: 'chart' as const,
    name: 'De análisis',
    hint: 'Nos ayudan a mejorar',
    desc: 'Información anónima sobre cómo usas el sitio. No incluyen datos personales identificables.',
  },
]

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
  <!-- Banner -->
  <Transition name="cookie-slide" appear>
    <div v-if="showBanner" class="fixed bottom-0 inset-x-0 z-[900] p-3 md:p-5 pointer-events-none">
      <div
        class="pointer-events-auto max-w-[860px] mx-auto flex flex-col sm:flex-row sm:items-center gap-4 rounded-[22px] bg-night/95 backdrop-blur-md border border-white/10 p-4 pl-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
      >
        <div class="flex items-center gap-3 flex-1">
          <span class="w-10 h-10 rounded-xl bg-indigo text-aqua grid place-items-center shrink-0">
            <AppIcon name="cookie" class="w-5 h-5" />
          </span>
          <p class="text-sm text-white/80 leading-relaxed">
            Usamos cookies para mejorar tu experiencia.
            <NuxtLink to="/cookies" class="text-aqua underline underline-offset-2">Más información</NuxtLink>
          </p>
        </div>
        <div class="flex gap-2 shrink-0">
          <button
            type="button"
            class="h-10 px-4 rounded-full border border-white/20 font-display font-bold uppercase tracking-[0.1em] text-[0.8rem] text-white/80 hover:text-white hover:border-white/50 transition-colors"
            @click="showSettings = true"
          >
            Configurar
          </button>
          <button
            type="button"
            class="h-10 px-5 rounded-full bg-aqua text-night font-display font-extrabold uppercase tracking-[0.1em] text-[0.8rem] hover:bg-white transition-colors"
            @click="acceptAll"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Modal de configuración -->
  <Transition name="modal-fade">
    <div v-if="showSettings" class="fixed inset-0 z-[950] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-night/80 backdrop-blur-sm" @click="showSettings = false" />

      <div
        class="modal relative w-full max-w-[620px] max-h-[90vh] overflow-y-auto rounded-[28px] bg-panel border border-white/10 p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div class="flex items-start justify-between gap-4 mb-6">
          <h2 id="cookie-title" class="font-display font-black italic uppercase text-4xl leading-none text-white">
            Configurar cookies
          </h2>
          <button
            type="button"
            class="w-10 h-10 rounded-full bg-white/[0.07] hover:bg-white/15 grid place-items-center shrink-0 transition-colors"
            aria-label="Cerrar"
            @click="showSettings = false"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <div class="space-y-3">
          <!-- Esenciales -->
          <div class="rounded-2xl bg-white/[0.04] p-5">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-xl bg-aqua/15 text-aqua grid place-items-center">
                  <AppIcon name="check" class="w-5 h-5" />
                </span>
                <div>
                  <h3 class="font-display font-bold uppercase tracking-[0.06em] text-white">Esenciales</h3>
                  <p class="text-xs text-white/45">Siempre activas</p>
                </div>
              </div>
              <span class="w-12 h-7 rounded-full bg-aqua/60 flex items-center justify-end p-1" aria-hidden="true">
                <span class="w-5 h-5 rounded-full bg-white" />
              </span>
            </div>
            <p class="mt-3 text-sm text-white/55">
              Necesarias para el funcionamiento básico del sitio: navegación y preferencias básicas.
            </p>
          </div>

          <!-- Opcionales -->
          <div v-for="c in optional" :key="c.key" class="rounded-2xl bg-white/[0.04] p-5">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="w-10 h-10 rounded-xl bg-indigo/40 text-aqua grid place-items-center">
                  <AppIcon :name="c.icon" class="w-5 h-5" />
                </span>
                <div>
                  <h3 class="font-display font-bold uppercase tracking-[0.06em] text-white">{{ c.name }}</h3>
                  <p class="text-xs text-white/45">{{ c.hint }}</p>
                </div>
              </div>
              <label class="relative inline-flex cursor-pointer">
                <input v-model="preferences[c.key]" type="checkbox" class="peer sr-only" />
                <span
                  class="w-12 h-7 rounded-full bg-white/15 p-1 flex transition-colors peer-checked:bg-aqua peer-focus-visible:ring-2 peer-focus-visible:ring-aqua"
                >
                  <span
                    class="w-5 h-5 rounded-full bg-white transition-transform duration-200"
                    :class="preferences[c.key] ? 'translate-x-5' : ''"
                  />
                </span>
                <span class="sr-only">Activar cookies {{ c.name }}</span>
              </label>
            </div>
            <p class="mt-3 text-sm text-white/55">{{ c.desc }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-7">
          <button type="button" class="btn-outline !px-4 !py-3 !text-[0.8rem]" @click="rejectOptional">Rechazar opcionales</button>
          <button type="button" class="btn-indigo !px-4 !py-3 !text-[0.8rem]" @click="acceptSelected">Guardar</button>
          <button type="button" class="btn-primary !px-4 !py-3 !text-[0.8rem]" @click="acceptAll">Aceptar todas</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
}
.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(110%);
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
.modal-fade-enter-active .modal,
.modal-fade-leave-active .modal {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-fade-enter-from .modal,
.modal-fade-leave-to .modal {
  transform: translateY(24px) scale(0.97);
}
</style>
