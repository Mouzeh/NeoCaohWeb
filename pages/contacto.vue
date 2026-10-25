<script setup lang="ts">
import gsap from "gsap";
import { SITE } from "~/data/site";

usePageSeo({
  title: "Contacto — NeoCaoh",
  description:
    "Contacta con el equipo de NeoCaoh TCG. Soporte, sugerencias y colaboración.",
});

const subjects = [
  { value: "soporte", label: "Soporte técnico" },
  { value: "sugerencia", label: "Sugerencia" },
  { value: "bug", label: "Reporte de bug" },
  { value: "colaboracion", label: "Colaboración" },
  { value: "otro", label: "Otro" },
];

const form = ref({ name: "", email: "", subject: "", message: "" });
const sent = ref(false);

// Abre el cliente de correo del usuario con el mensaje ya redactado
const submitForm = () => {
  const subjectLabel =
    subjects.find((s) => s.value === form.value.subject)?.label ?? "Contacto";
  const body = `${form.value.message}\n\n— ${form.value.name} (${form.value.email})`;
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `[NeoCaoh] ${subjectLabel}`,
  )}&body=${encodeURIComponent(body)}`;
  sent.value = true;
};

const channels = [
  {
    icon: "discord" as const,
    name: "Discord",
    detail: "Comunidad y soporte del equipo",
    href: SITE.discord,
    color: "bg-[#5865F2]",
  },
  {
    icon: "whatsapp" as const,
    name: "WhatsApp",
    detail: "Grupo de la comunidad",
    href: SITE.whatsapp,
    color: "bg-[#25D366]",
  },
  {
    icon: "mail" as const,
    name: "Email",
    detail: SITE.email,
    href: `mailto:${SITE.email}`,
    color: "bg-indigo",
  },
];

const faqs = [
  {
    q: "¿Cuándo estará lista la versión final?",
    a: "Estamos trabajando en la versión Beta para mediados de 2026.",
  },
  {
    q: "¿Puedo contribuir al proyecto?",
    a: "¡Por supuesto! Escríbenos por Discord o WhatsApp y te contamos cómo ayudar.",
  },
  {
    q: "¿NeoCaoh es gratuito?",
    a: "Sí, NeoCaoh es completamente gratuito y siempre lo será. Si quieres apoyarnos, puedes hacerlo desde la página de donaciones.",
  },
];
const openFaq = ref<number | null>(0);

const root = ref<HTMLElement | null>(null);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from(".ct-card", {
      y: 70,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: { trigger: root.value, start: "top 85%" },
    });
  });
}, root);
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero
      sub="Contacto"
      big="hello"
      :title="['Conecta', 'con nosotros']"
      description="¿Preguntas, sugerencias o quieres sumarte al proyecto? Escríbenos por el canal que prefieras."
    />

    <section ref="root" class="px-6 md:px-[6vw] pt-16 pb-28">
      <div class="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        <!-- Formulario -->
        <div class="ct-card rounded-[28px] bg-paper text-night p-7 md:p-10">
          <h2 class="font-display font-black italic uppercase text-4xl md:text-5xl leading-none">
            Envíanos un mensaje
          </h2>
          <p class="mt-3 text-night/60">Se abrirá tu app de correo con el mensaje listo para enviar.</p>

          <form class="mt-8 space-y-5" @submit.prevent="submitForm">
            <div class="grid md:grid-cols-2 gap-5">
              <label class="block">
                <span class="field-label">Nombre</span>
                <input v-model="form.name" type="text" required class="field" placeholder="Tu nombre" />
              </label>
              <label class="block">
                <span class="field-label">Email</span>
                <input v-model="form.email" type="email" required class="field" placeholder="tu@email.com" />
              </label>
            </div>

            <fieldset>
              <legend class="field-label">Asunto</legend>
              <div class="flex flex-wrap gap-2">
                <label
                  v-for="s in subjects"
                  :key="s.value"
                  class="cursor-pointer px-4 py-2 rounded-full border-2 font-display font-bold text-sm uppercase tracking-[0.08em] transition-colors"
                  :class="form.subject === s.value ? 'bg-night border-night text-white' : 'border-night/15 hover:border-night/40'"
                >
                  <input v-model="form.subject" type="radio" :value="s.value" class="sr-only" required />
                  {{ s.label }}
                </label>
              </div>
            </fieldset>

            <label class="block">
              <span class="field-label">Mensaje</span>
              <textarea
                v-model="form.message"
                required
                rows="5"
                class="field resize-y"
                placeholder="Escribe tu mensaje aquí..."
              />
            </label>

            <button type="submit" class="btn-dark w-full">
              <AppIcon name="mail" class="w-4 h-4" />
              Enviar mensaje
            </button>
            <p v-if="sent" class="flex items-center gap-2 text-sm text-night/70">
              <AppIcon name="check" class="w-4 h-4 text-indigo" />
              Abrimos tu correo. Si no se abrió, escríbenos a {{ SITE.email }}.
            </p>
          </form>
        </div>

        <div class="flex flex-col gap-6">
          <!-- Canales -->
          <div class="ct-card rounded-[28px] bg-panel p-7 md:p-8">
            <h2 class="font-display font-black italic uppercase text-3xl leading-none mb-6">Otros canales</h2>
            <div class="space-y-3">
              <a
                v-for="c in channels"
                :key="c.name"
                :href="c.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-4 p-3 pr-5 rounded-2xl bg-white/[0.04] no-underline transition-colors hover:bg-white/[0.09]"
              >
                <span class="w-12 h-12 rounded-xl grid place-items-center text-white shrink-0" :class="c.color">
                  <AppIcon :name="c.icon" class="w-6 h-6" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block font-display font-black italic uppercase text-xl text-white">{{ c.name }}</span>
                  <span class="block text-sm text-white/55 truncate">{{ c.detail }}</span>
                </span>
                <AppIcon name="arrow-right" class="w-5 h-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-aqua" />
              </a>
            </div>
          </div>

          <!-- FAQ -->
          <div class="ct-card rounded-[28px] bg-panel p-7 md:p-8">
            <h2 class="font-display font-black italic uppercase text-3xl leading-none mb-4">Preguntas frecuentes</h2>
            <div class="divide-y divide-white/10">
              <div v-for="(f, i) in faqs" :key="f.q">
                <button
                  type="button"
                  class="w-full flex items-center justify-between gap-4 py-4 text-left font-display font-bold text-lg"
                  :aria-expanded="openFaq === i"
                  @click="openFaq = openFaq === i ? null : i"
                >
                  {{ f.q }}
                  <span
                    class="w-8 h-8 rounded-full bg-white/[0.07] grid place-items-center shrink-0 transition-transform duration-300"
                    :class="openFaq === i ? 'rotate-45 bg-aqua text-night' : ''"
                    aria-hidden="true"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <div class="faq-body grid transition-[grid-template-rows] duration-300" :class="openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                  <p class="overflow-hidden text-white/60 leading-relaxed" :class="openFaq === i ? 'pb-4' : ''">{{ f.a }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.field-label {
  @apply block font-display font-bold uppercase tracking-[0.2em] text-[0.72rem] text-night/55 mb-2;
}
.field {
  @apply w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-transparent text-night placeholder-night/35
         transition-colors focus:outline-none focus:border-indigo;
}
</style>
