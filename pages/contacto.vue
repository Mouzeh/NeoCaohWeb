<template>
  <div class="min-h-screen bg-ink text-white">
    <!-- Hero Section -->
    <section
      class="relative px-[5vw] py-24 bg-gradient-to-br from-ink via-ink2 to-ink overflow-hidden"
    >
      <!-- Background Effects -->
      <div class="absolute inset-0 opacity-[0.03]">
        <div
          class="orb orb-1 absolute rounded-full"
          style="
            width: 400px;
            height: 400px;
            background: rgba(245, 200, 66, 0.8);
            top: 10%;
            left: -10%;
            filter: blur(80px);
          "
        />
        <div
          class="orb orb-2 absolute rounded-full"
          style="
            width: 300px;
            height: 300px;
            background: rgba(232, 35, 10, 0.6);
            bottom: 10%;
            right: -5%;
            filter: blur(60px);
          "
        />
      </div>

      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <div
          class="sec-label inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-6"
        >
          <span class="w-6 h-px bg-gold"></span>
          Contacto
          <span class="w-6 h-px bg-gold"></span>
        </div>
        <h1
          class="font-display font-extrabold leading-[0.9] mb-6"
          style="font-size: clamp(2.5rem, 6vw, 4.5rem)"
        >
          Conecta con <span class="text-scarlet">Nosotros</span>
        </h1>
        <p class="text-lg text-offwhite/70 max-w-2xl mx-auto leading-relaxed">
          ¿Tienes preguntas, sugerencias o quieres formar parte de la comunidad?
          Estamos aquí para ayudarte.
        </p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="px-[5vw] py-16">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <!-- Contact Form -->
          <div class="order-2 lg:order-1">
            <div
              class="bg-gradient-to-br from-panel/50 to-ink2/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <h2 class="text-2xl font-bold text-gold mb-6">
                Envíanos un mensaje
              </h2>

              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      class="block text-sm font-medium text-offwhite/80 mb-2"
                      >Nombre</label
                    >
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-offwhite/80 mb-2"
                      >Email</label
                    >
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-offwhite/80 mb-2"
                    >Asunto</label
                  >
                  <select
                    v-model="form.subject"
                    required
                    class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="bug">Reporte de Bug</option>
                    <option value="colaboracion">Colaboración</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-offwhite/80 mb-2"
                    >Mensaje</label
                  >
                  <textarea
                    v-model="form.message"
                    required
                    rows="5"
                    class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="isSubmitting">Enviando...</span>
                  <span v-else>Enviar Mensaje</span>
                </button>

                <div
                  v-if="formMessage"
                  :class="[
                    'p-4 rounded-lg',
                    formMessage.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                      : 'bg-red-500/20 border border-red-500/30 text-red-300',
                  ]"
                >
                  {{ formMessage.text }}
                </div>
              </form>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="order-1 lg:order-2 space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-gold mb-6">
                Otras formas de contacto
              </h2>
              <p class="text-offwhite/70 leading-relaxed mb-8">
                Puedes contactarnos a través de cualquiera de estos canales.
                Respondemos lo más rápido posible.
              </p>
            </div>

            <!-- Contact Cards -->
            <div class="space-y-4">
              <!-- Discord -->
              <div class="contact-card group">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-violet2/20 to-violet2/10 border border-violet2/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <svg
                      class="w-6 h-6 text-violet2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.010c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.120.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-white">Discord</h3>
                    <p class="text-sm text-muted">Únete a nuestra comunidad</p>
                    <a
                      href="https://discord.gg/neocaoh"
                      class="text-violet2 hover:text-violet2/80 text-sm"
                      >discord.gg/neocaoh</a
                    >
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="contact-card group">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <svg
                      class="w-6 h-6 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-white">Email</h3>
                    <p class="text-sm text-muted">Contacto directo</p>
                    <a
                      href="mailto:contacto@neotcg.cl"
                      class="text-gold hover:text-gold/80 text-sm"
                      >contacto@neotcg.cl</a
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- FAQ Section -->
            <div class="mt-12">
              <h3 class="text-xl font-bold text-white mb-4">
                Preguntas Frecuentes
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex gap-3">
                  <span class="text-gold font-medium">Q:</span>
                  <div>
                    <p class="text-offwhite/80">
                      <strong>¿Cuándo estará lista la versión final?</strong>
                    </p>
                    <p class="text-muted">
                      Estamos trabajando en la versión Beta para mediados de
                      2026.
                    </p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="text-gold font-medium">Q:</span>
                  <div>
                    <p class="text-offwhite/80">
                      <strong>¿Puedo contribuir al proyecto?</strong>
                    </p>
                    <p class="text-muted">
                      ¡Por supuesto! Contactanos por Discord.
                    </p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="text-gold font-medium">Q:</span>
                  <div>
                    <p class="text-offwhite/80"><strong>¿Es gratis?</strong></p>
                    <p class="text-muted">
                      Sí, NeoCaoh es completamente gratuito y siempre lo será.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="mt-16 text-center">
          <div
            class="bg-gradient-to-r from-scarlet/10 to-gold/10 border border-scarlet/20 rounded-2xl p-8"
          >
            <h3 class="text-xl font-bold text-white mb-3">
              ¿Listo para jugar?
            </h3>
            <p class="text-offwhite/70 mb-6">
              Descarga NeoCaoh y únete a la comunidad de TCG más grande de habla
              hispana.
            </p>
            <NuxtLink to="/descargar" class="btn-primary">
              Descargar Ahora
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Contacto - NeoCaoh TCG",
  description:
    "Contacta con el equipo de NeoCaoh TCG. Soporte, sugerencias y colaboración.",
});

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const formMessage = ref(null);

const submitForm = async () => {
  isSubmitting.value = true;

  try {
    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // En un proyecto real, aquí enviarías el formulario a un endpoint
    console.log("Formulario enviado:", form.value);

    formMessage.value = {
      type: "success",
      text: "¡Mensaje enviado correctamente! Te responderemos pronto.",
    };

    // Limpiar formulario
    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      formMessage.value = null;
    }, 5000);
  } catch (error) {
    formMessage.value = {
      type: "error",
      text: "Error al enviar el mensaje. Intenta de nuevo.",
    };

    setTimeout(() => {
      formMessage.value = null;
    }, 5000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.sec-label {
  animation: fadeIn 0.6s ease forwards;
}

.orb-1 {
  animation: orbDrift 12s ease-in-out infinite;
}

.orb-2 {
  animation: orbDrift 10s ease-in-out 2s infinite reverse;
}

.contact-card {
  @apply p-6 bg-gradient-to-br from-panel/30 to-ink2/20 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes orbDrift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -40px);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-card {
    @apply p-4;
  }

  .grid.lg\\:grid-cols-2 {
    @apply gap-8;
  }
}
</style>
