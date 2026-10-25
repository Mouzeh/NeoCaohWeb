<script setup lang="ts">
const isEnglish = ref(false)

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

usePageSeo({
  title: 'Términos y condiciones — NeoCaoh',
  description: 'Términos y condiciones de uso de NeoCaoh, el simulador Pokémon TCG de la comunidad hispana.',
})

// Secciones numeradas (todas menos el reconocimiento final)
const sectionList = computed(() =>
  Object.entries(currentContent.value.sections)
    .filter(([key]) => key !== 'acknowledgment')
    .map(([key, sec]) => ({ key, ...(sec as any) }))
)
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero
      sub="Legal"
      big="terms"
      :title="[currentContent.title, currentContent.titleHighlight]"
      :description="currentContent.subtitle"
    >
      <button
        type="button"
        class="btn-outline !py-3 !px-6"
        @click="toggleLanguage"
      >
        <AppIcon name="language" class="w-4 h-4" />
        {{ isEnglish ? 'Ver en español' : 'Read in English' }}
      </button>
    </PageHero>

    <section class="px-6 md:px-[6vw] pt-16 pb-28">
      <div class="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        <!-- Índice -->
        <nav class="hidden lg:block" aria-label="Índice">
          <div class="sticky top-28">
            <p class="font-display font-bold uppercase tracking-[0.25em] text-[0.72rem] text-white/40 mb-4">
              {{ isEnglish ? 'Contents' : 'Índice' }}
            </p>
            <ul class="space-y-1 list-none">
              <li v-for="sec in sectionList" :key="sec.key">
                <a
                  :href="`#${sec.key}`"
                  class="block py-1.5 font-display font-bold text-white/60 no-underline hover:text-aqua transition-colors"
                >{{ sec.title }}</a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="max-w-[820px]">
          <!-- Aviso importante -->
          <div class="flex gap-5 rounded-[26px] bg-aqua text-night p-7 md:p-8 mb-14">
            <span class="w-12 h-12 rounded-2xl bg-night text-aqua grid place-items-center shrink-0">
              <AppIcon name="alert" class="w-6 h-6" />
            </span>
            <div>
              <h2 class="font-display font-black italic uppercase text-2xl md:text-3xl leading-none">
                {{ currentContent.importantNotice }}
              </h2>
              <p class="mt-3 leading-relaxed text-night/80">{{ currentContent.importantText }}</p>
            </div>
          </div>

          <!-- Secciones -->
          <article
            v-for="sec in sectionList"
            :id="sec.key"
            :key="sec.key"
            class="scroll-mt-28 py-10 border-t border-white/10 first:border-t-0 first:pt-0"
          >
            <h2 class="font-display font-black italic uppercase text-3xl md:text-4xl leading-none">
              {{ sec.title }}
            </h2>
            <div class="mt-5 space-y-4 text-white/70 leading-relaxed">
              <p v-if="sec.content">{{ sec.content }}</p>
              <p v-if="sec.subcontent">{{ sec.subcontent }}</p>
              <ul v-if="sec.points" class="space-y-2.5 list-none">
                <li v-for="point in sec.points" :key="point" class="flex gap-3">
                  <span class="mt-2 w-2 h-2 rotate-45 bg-aqua shrink-0" aria-hidden="true" />
                  <span>{{ point }}</span>
                </li>
              </ul>
              <p v-if="sec.note" class="rounded-2xl bg-panel p-5 border-l-4 border-aqua text-white/80">
                {{ sec.note }}
              </p>
            </div>
          </article>

          <!-- Reconocimiento -->
          <div class="rounded-[26px] bg-indigo p-7 md:p-9 mt-6">
            <h2 class="font-display font-black italic uppercase text-3xl leading-none">
              {{ currentContent.sections.acknowledgment.title }}
            </h2>
            <p class="mt-4 text-white/80 leading-relaxed">{{ currentContent.sections.acknowledgment.content }}</p>
          </div>

          <div class="flex flex-wrap gap-3 mt-12">
            <NuxtLink to="/" class="btn-outline">
              <AppIcon name="arrow-left" class="w-4 h-4" />
              {{ currentContent.backToHome }}
            </NuxtLink>
            <NuxtLink to="/cookies" class="btn-outline">
              <AppIcon name="cookie" class="w-4 h-4" />
              {{ isEnglish ? 'Cookie policy' : 'Política de cookies' }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
