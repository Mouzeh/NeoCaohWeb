<script setup lang="ts">
const isEnglish = ref(true)

const toggleLanguage = () => {
  isEnglish.value = !isEnglish.value
}

const content = computed(() => ({
  es: {
    title: "Términos y",
    titleHighlight: "Condiciones",
    subtitle: "Condiciones de uso del simulador NeoCaoh - Plataforma de conexión para jugadores de Pokémon TCG",
    lastUpdated: "Última actualización:",
    importantNotice: "AVISO IMPORTANTE - SOLO SIMULADOR",
    importantText: "NeoCaoh es únicamente una plataforma de simulación digital que permite a jugadores conectarse y practicar. Para utilizar este servicio, DEBES poseer físicamente todas las cartas de Pokémon TCG que uses en el simulador, adquiridas de manera legal a través de distribuidores oficiales. Este simulador no sustituye la compra de cartas físicas ni otorga derechos sobre ningún contenido de Pokémon.",
    backToHome: "Volver al Inicio",
    sections: {
      nature: {
        title: "1. Naturaleza del Servicio",
        content: "NeoCaoh es una plataforma de simulación digital gratuita diseñada exclusivamente para:",
        points: [
          "Conectar jugadores que posean cartas físicas de Pokémon TCG legalmente adquiridas",
          "Facilitar partidas de práctica y entrenamiento",
          "Proporcionar herramientas de construcción de mazos para cartas que ya posees",
          "Crear un espacio de comunidad para entusiastas del TCG"
        ],
        note: "Este simulador NO permite obtener, intercambiar o adquirir cartas digitales. Solo simula el gameplay de cartas que ya posees físicamente."
      },
      eligibility: {
        title: "2. Requisitos de Elegibilidad",
        content: "Para usar NeoCaoh, debes:",
        points: [
          "Ser mayor de 13 años o contar con autorización parental",
          "Poseer físicamente todas las cartas que uses en el simulador",
          "Haber adquirido dichas cartas a través de canales oficiales y legales",
          "Aceptar estos términos y condiciones",
          "Respetar las normas de la comunidad y fair play"
        ]
      },
      ip: {
        title: "3. Propiedad Intelectual",
        content: "Pokémon, Pokémon Trading Card Game, y todos los nombres, marcas, personajes e imágenes relacionadas son propiedad de The Pokémon Company, Nintendo, Game Freak y Creatures Inc.",
        subcontent: "NeoCaoh es un proyecto de fans sin fines de lucro que:",
        points: [
          "No reclama ningún derecho sobre la propiedad intelectual de Pokémon",
          "No monetiza ni comercializa contenido de Pokémon",
          "Opera bajo principios de uso justo para fines educativos y de entretenimiento",
          "Requiere que los usuarios posean legalmente las cartas físicas"
        ]
      },
      conduct: {
        title: "4. Conducta del Usuario",
        content: "Al usar NeoCaoh, te comprometes a:",
        points: [
          "Solo simular cartas que posees físicamente",
          "Mantener un comportamiento respetuoso con otros usuarios",
          "No usar el servicio para actividades comerciales no autorizadas",
          "No intentar hackear, explotar o dañar la plataforma",
          "Reportar bugs o problemas técnicos de manera constructiva",
          "No hacer trampa o usar herramientas externas no permitidas"
        ]
      },
      liability: {
        title: "5. Limitación de Responsabilidad",
        content: "NeoCaoh se proporciona \"tal como está\" sin garantías de ningún tipo. No nos hacemos responsables de:",
        points: [
          "Interrupciones del servicio o mantenimiento",
          "Pérdida de datos de partidas o estadísticas",
          "Problemas de conectividad entre usuarios",
          "Disputas entre jugadores",
          "Uso indebido de la plataforma por terceros"
        ]
      },
      privacy: {
        title: "6. Privacidad y Datos",
        content: "Respetamos tu privacidad y solo recopilamos datos mínimos necesarios para el funcionamiento:",
        points: [
          "Información básica de cuenta (nombre de usuario, email)",
          "Estadísticas de partidas para rankings",
          "Datos técnicos para mejorar la experiencia"
        ],
        note: "No vendemos ni compartimos datos personales con terceros."
      },
      modifications: {
        title: "7. Modificaciones y Terminación",
        content: "Nos reservamos el derecho de:",
        points: [
          "Modificar estos términos con previo aviso",
          "Suspender o terminar cuentas que violen las normas",
          "Discontinuar el servicio si fuera necesario",
          "Actualizar funcionalidades y características"
        ]
      },
      contact: {
        title: "8. Contacto y Soporte",
        content: "Para consultas, reportes o soporte técnico:",
        points: [
          "Discord: Únete a nuestra comunidad oficial",
          "GitHub: Reporta issues técnicos en nuestro repositorio",
          "Email: contacto@neotcg.cl"
        ]
      },
      acknowledgment: {
        title: "Reconocimiento y Aceptación",
        content: "Al usar NeoCaoh, reconoces que has leído, entendido y aceptado estos términos. Confirmas que posees legalmente todas las cartas físicas que planeas usar en el simulador y que entiendes que esta es únicamente una plataforma de práctica y conexión entre jugadores."
      }
    }
  },
  en: {
    title: "Terms and",
    titleHighlight: "Conditions",
    subtitle: "Terms of use for NeoCaoh simulator - Connection platform for Pokémon TCG players",
    lastUpdated: "Last updated:",
    importantNotice: "IMPORTANT NOTICE - SIMULATOR ONLY",
    importantText: "NeoCaoh is solely a digital simulation platform that allows players to connect and practice. To use this service, you MUST physically own all Pokémon TCG cards that you use in the simulator, acquired legally through official distributors. This simulator does not replace the purchase of physical cards nor grants rights to any Pokémon content.",
    backToHome: "Back to Home",
    sections: {
      nature: {
        title: "1. Nature of Service",
        content: "NeoCaoh is a free digital simulation platform designed exclusively for:",
        points: [
          "Connecting players who own Pokémon TCG physical cards legally acquired",
          "Facilitating practice and training matches",
          "Providing deck building tools for cards you already own",
          "Creating a community space for TCG enthusiasts"
        ],
        note: "This simulator does NOT allow obtaining, trading or acquiring digital cards. It only simulates gameplay of cards you physically own."
      },
      eligibility: {
        title: "2. Eligibility Requirements",
        content: "To use NeoCaoh, you must:",
        points: [
          "Be over 13 years old or have parental authorization",
          "Physically own all cards you use in the simulator",
          "Have acquired such cards through official and legal channels",
          "Accept these terms and conditions",
          "Respect community rules and fair play"
        ]
      },
      ip: {
        title: "3. Intellectual Property",
        content: "Pokémon, Pokémon Trading Card Game, and all related names, trademarks, characters and images are property of The Pokémon Company, Nintendo, Game Freak and Creatures Inc.",
        subcontent: "NeoCaoh is a non-profit fan project that:",
        points: [
          "Claims no rights over Pokémon intellectual property",
          "Does not monetize or commercialize Pokémon content",
          "Operates under fair use principles for educational and entertainment purposes",
          "Requires users to legally own physical cards"
        ]
      },
      conduct: {
        title: "4. User Conduct",
        content: "By using NeoCaoh, you commit to:",
        points: [
          "Only simulate cards you physically own",
          "Maintain respectful behavior with other users",
          "Not use the service for unauthorized commercial activities",
          "Not attempt to hack, exploit or damage the platform",
          "Report bugs or technical issues constructively",
          "Not cheat or use unauthorized external tools"
        ]
      },
      liability: {
        title: "5. Limitation of Liability",
        content: "NeoCaoh is provided \"as is\" without warranties of any kind. We are not responsible for:",
        points: [
          "Service interruptions or maintenance",
          "Loss of match data or statistics",
          "Connectivity problems between users",
          "Disputes between players",
          "Misuse of the platform by third parties"
        ]
      },
      privacy: {
        title: "6. Privacy and Data",
        content: "We respect your privacy and only collect minimal data necessary for operation:",
        points: [
          "Basic account information (username, email)",
          "Match statistics for rankings",
          "Technical data to improve experience"
        ],
        note: "We do not sell or share personal data with third parties."
      },
      modifications: {
        title: "7. Modifications and Termination",
        content: "We reserve the right to:",
        points: [
          "Modify these terms with prior notice",
          "Suspend or terminate accounts that violate rules",
          "Discontinue the service if necessary",
          "Update features and functionalities"
        ]
      },
      contact: {
        title: "8. Contact and Support",
        content: "For inquiries, reports or technical support:",
        points: [
          "Discord: Join our official community",
          "GitHub: Report technical issues in our repository",
          "Email: contacto@neotcg.cl"
        ]
      },
      acknowledgment: {
        title: "Acknowledgment and Acceptance",
        content: "By using NeoCaoh, you acknowledge that you have read, understood and accepted these terms. You confirm that you legally own all physical cards you plan to use in the simulator and understand that this is solely a practice and connection platform between players."
      }
    }
  }
}))

const currentContent = computed(() => isEnglish.value ? content.value.en : content.value.es)
</script>

<template>
  <div class="min-h-screen bg-ink text-white">
    <!-- Language Toggle -->
    <div class="fixed top-20 right-6 z-50">
      <button
        @click="toggleLanguage"
        class="bg-gradient-to-r from-panel/90 to-ink2/90 border-2 border-gold/20 rounded-full px-5 py-3 text-sm font-mono tracking-wide text-white hover:text-gold hover:border-gold/50 hover:scale-105 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl"
      >
        <span class="flex items-center gap-2">
          {{ isEnglish ? '🇪🇸 Español' : '🇺🇸 English' }}
          <svg class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-180': !isEnglish }" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </div>

    <!-- Hero Section -->
    <section class="relative px-[5vw] py-24 bg-gradient-to-br from-ink via-ink2 to-ink overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 opacity-[0.03]">
        <div class="orb orb-1 absolute rounded-full" style="width:400px;height:400px;background:rgba(245,200,66,0.8);top:10%;left:-10%;filter:blur(80px)" />
        <div class="orb orb-2 absolute rounded-full" style="width:300px;height:300px;background:rgba(232,35,10,0.6);bottom:10%;right:-5%;filter:blur(60px)" />
      </div>

      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <div class="sec-label inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-6">
          <span class="w-6 h-px bg-gold"></span>
          Legal
          <span class="w-6 h-px bg-gold"></span>
        </div>
        <h1 class="font-display font-extrabold leading-[0.9] mb-6" style="font-size: clamp(2.5rem, 6vw, 4.5rem)">
          {{ currentContent.title }} <span class="text-scarlet">{{ currentContent.titleHighlight }}</span>
        </h1>
        <p class="text-lg text-offwhite/70 max-w-2xl mx-auto leading-relaxed">
          {{ currentContent.subtitle }}
        </p>
        <div class="mt-8 text-sm text-muted font-mono tracking-wider">
          {{ currentContent.lastUpdated }} {{ new Date().toLocaleDateString(isEnglish ? 'en-US' : 'es-ES') }}
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="px-[5vw] py-16 max-w-5xl mx-auto">
      <div class="prose prose-lg prose-invert max-w-none">
        <!-- Important Notice -->
        <div class="bg-gradient-to-r from-scarlet/10 to-gold/10 border border-scarlet/20 rounded-2xl p-8 mb-12">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 bg-scarlet rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span class="text-white text-lg">⚠</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-scarlet mb-3 m-0">{{ currentContent.importantNotice }}</h3>
              <p class="text-offwhite/90 leading-relaxed m-0" v-html="currentContent.importantText.replace('DEBES', '<strong>DEBES</strong>').replace('MUST', '<strong>MUST</strong>')">
              </p>
            </div>
          </div>
        </div>

        <!-- Terms Content -->
        <div class="space-y-12">
          <!-- Nature of Service -->
          <article>
            <h2 class="text-2xl font-bold text-gold mb-6 border-b border-white/10 pb-3">{{ currentContent.sections.nature.title }}</h2>
            <div class="space-y-4 text-offwhite/80 leading-relaxed">
              <p v-html="currentContent.sections.nature.content.replace('simulación digital gratuita', '<strong>simulación digital gratuita</strong>').replace('free digital simulation', '<strong>free digital simulation</strong>')"></p>
              <ul class="list-disc pl-6 space-y-2">
                <li v-for="point in currentContent.sections.nature.points" :key="point">{{ point }}</li>
              </ul>
              <p class="bg-ink2/50 p-4 rounded-lg border-l-4 border-gold">
                <strong>{{ isEnglish ? 'Important:' : 'Importante:' }}</strong> {{ currentContent.sections.nature.note }}
              </p>
            </div>
          </article>

          <!-- Eligibility -->
          <article>
            <h2 class="text-2xl font-bold text-gold mb-6 border-b border-white/10 pb-3">{{ currentContent.sections.eligibility.title }}</h2>
            <div class="space-y-4 text-offwhite/80 leading-relaxed">
              <p>{{ currentContent.sections.eligibility.content }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li v-for="point in currentContent.sections.eligibility.points" :key="point" v-html="point.replace('Poseer físicamente', '<strong>Poseer físicamente</strong>').replace('Physically own', '<strong>Physically own</strong>')"></li>
              </ul>
            </div>
          </article>

          <!-- Intellectual Property -->
          <article>
            <h2 class="text-2xl font-bold text-gold mb-6 border-b border-white/10 pb-3">{{ currentContent.sections.ip.title }}</h2>
            <div class="space-y-4 text-offwhite/80 leading-relaxed">
              <p v-html="currentContent.sections.ip.content.replace('The Pokémon Company, Nintendo, Game Freak y Creatures Inc.', '<strong>The Pokémon Company, Nintendo, Game Freak y Creatures Inc.</strong>').replace('The Pokémon Company, Nintendo, Game Freak and Creatures Inc.', '<strong>The Pokémon Company, Nintendo, Game Freak and Creatures Inc.</strong>')"></p>
              <p v-html="currentContent.sections.ip.subcontent.replace('sin fines de lucro', '<strong>sin fines de lucro</strong>').replace('non-profit', '<strong>non-profit</strong>')"></p>
              <ul class="list-disc pl-6 space-y-2">
                <li v-for="point in currentContent.sections.ip.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </article>

          <!-- User Conduct -->
          <article>
            <h2 class="text-2xl font-bold text-gold mb-6 border-b border-white/10 pb-3">{{ currentContent.sections.conduct.title }}</h2>
            <div class="space-y-4 text-offwhite/80 leading-relaxed">
              <p>{{ currentContent.sections.conduct.content }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li v-for="point in currentContent.sections.conduct.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </article>

          <!-- Limitation of Liability -->
          <article>
            <h2 class="text-2xl font-bold text-gold mb-6 border-b border-white/10 pb-3">{{ currentContent.sections.liability.title }}</h2>
            <div class="space-y-4 text-offwhite/80 leading-relaxed">
              <p>{{ currentContent.sections.liability.content }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li v-for="point in currentContent.sections.liability.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </article>

          <!-- Privacy and Data -->
          <article>
            <h2 class="text-2xl font-bold text-gold mb-6 border-b border-white/10 pb-3">{{ currentContent.sections.privacy.title }}</h2>
            <div class="space-y-4 text-offwhite/80 leading-relaxed">
              <p>{{ currentContent.sections.privacy.content }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li v-for="point in currentContent.sections.privacy.points" :key="point">{{ point }}</li>
              </ul>
              <p>{{ currentContent.sections.privacy.note }}</p>
            </div>
          </article>

          <!-- Modifications and Termination -->
          <article>
            <h2 class="text-2xl font-bold text-gold mb-6 border-b border-white/10 pb-3">{{ currentContent.sections.modifications.title }}</h2>
            <div class="space-y-4 text-offwhite/80 leading-relaxed">
              <p>{{ currentContent.sections.modifications.content }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li v-for="point in currentContent.sections.modifications.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </article>

          <!-- Contact and Support -->
          <article>
            <h2 class="text-2xl font-bold text-gold mb-6 border-b border-white/10 pb-3">{{ currentContent.sections.contact.title }}</h2>
            <div class="space-y-4 text-offwhite/80 leading-relaxed">
              <p>{{ currentContent.sections.contact.content }}</p>
              <ul class="list-disc pl-6 space-y-2">
                <li v-for="point in currentContent.sections.contact.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </article>

          <!-- Final Notice -->
          <div class="bg-gradient-to-r from-violet2/10 to-sky/10 border border-violet2/20 rounded-2xl p-8 mt-16">
            <div class="text-center">
              <h3 class="text-xl font-bold text-violet2 mb-4">{{ currentContent.sections.acknowledgment.title }}</h3>
              <p class="text-offwhite/90 leading-relaxed">
                {{ currentContent.sections.acknowledgment.content }}
              </p>
              <div class="mt-6">
                <NuxtLink to="/" class="btn-primary inline-flex items-center gap-2">
                  <span>←</span> {{ currentContent.backToHome }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

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
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -40px);
  }
}

.prose h2 {
  color: #F5C842;
}

.prose h3 {
  color: #E8230A;
}

.prose strong {
  color: #F5C842;
}

.prose ul li::marker {
  color: #F5C842;
}
</style>