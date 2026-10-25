<script setup lang="ts">
import gsap from "gsap";
import { SITE } from "~/data/site";

useHead({ title: "Descargar — NeoCaoh" });

const NuxtLinkComp = resolveComponent("NuxtLink");

type OsKey = "web" | "windows" | "mac" | "linux" | "android";

// 1. Datos dinámicos de la nube (links y versión)
const apiData = ref<Record<string, string> | null>(null);

const fetchDownloads = async () => {
  try {
    const data = await $fetch<Record<string, string>>("/api/downloads");
    if (data) apiData.value = data;
  } catch (error) {
    console.error("Error al cargar descargas:", error);
  }
};

// 2. Sistema del visitante (para destacar su descarga)
const detected = ref<OsKey | null>(null);

onMounted(() => {
  fetchDownloads();
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) detected.value = "android";
  else if (/iPhone|iPad/i.test(ua)) detected.value = "web";
  else if (/Win/i.test(ua)) detected.value = "windows";
  else if (/Mac/i.test(ua)) detected.value = "mac";
  else if (/Linux/i.test(ua)) detected.value = "linux";
});

// 3. Plataformas: diseño + datos reales
const platforms = computed(() => {
  const links = apiData.value || {
    windows:
      "https://www.mediafire.com/file/5orodrm1ey10oeb/NeoCaohTCG-windows-Alpha_-_v0.10.0..zip/file",
    mac: "",
    linux: "",
    version: "v0.10.0 Alpha",
  };
  const version = links.version || "v0.11.1 Alpha";

  return [
    {
      key: "web" as OsKey,
      os: "Navegador",
      description: "Juega al instante, sin instalar nada. Chrome, Edge o Firefox.",
      version,
      size: "Sin descarga",
      link: "/play",
      internal: true,
      cta: "Jugar ahora",
    },
    {
      key: "windows" as OsKey,
      os: "Windows",
      description: "Windows 10 / 11 de 64 bits.",
      version,
      size: "~250 MB",
      link: links.windows,
      cta: "Descargar",
    },
    {
      key: "mac" as OsKey,
      os: "macOS",
      description: "macOS 11 o superior. Intel y Apple Silicon.",
      version,
      size: "~280 MB",
      link: links.mac,
      cta: "Descargar",
    },
    {
      key: "linux" as OsKey,
      os: "Linux",
      description: "Ubuntu 20.04+ y distribuciones similares.",
      version,
      size: "~260 MB",
      link: links.linux,
      cta: "Descargar",
    },
    {
      key: "android" as OsKey,
      os: "Android",
      description: "Teléfonos y tablets Android. Instala el APK y juega desde tu móvil.",
      version,
      size: "APK",
      link: links.android,
      cta: "Descargar APK",
    },
  ];
});

const primary = computed(
  () =>
    platforms.value.find((p) => p.key === detected.value && p.link) ??
    platforms.value[0],
);

const steps = [
  {
    icon: "download",
    title: "Descarga",
    text: "Pulsa el botón de tu sistema operativo y espera a que termine la descarga.",
  },
  {
    icon: "unzip",
    title: "Extrae",
    text: "Descomprime el ZIP donde prefieras. En Android, abre el APK y permite instalar desde esa fuente.",
  },
  {
    icon: "play",
    title: "Juega",
    text: "Abre NeoCaoh y entra a la mesa. No requiere instalación adicional.",
  },
];

const requirements = [
  {
    icon: "os",
    label: "Sistema",
    min: "Windows 10 64-bit / macOS 11 / Ubuntu 20.04",
    rec: "Windows 11 / macOS 12 / Ubuntu 22.04",
  },
  {
    icon: "cpu",
    label: "Procesador",
    min: "Intel Core i3-6100 / AMD FX-6300",
    rec: "Intel Core i5-8400 / AMD Ryzen 5 2600",
  },
  { icon: "ram", label: "Memoria", min: "4 GB RAM", rec: "8 GB RAM" },
  {
    icon: "gpu",
    label: "Gráficos",
    min: "Compatible con DirectX 11",
    rec: "NVIDIA GTX 1060 / AMD RX 580",
  },
  { icon: "disk", label: "Almacenamiento", min: "1 GB libre", rec: "2 GB libres" },
  {
    icon: "net",
    label: "Red",
    min: "Conexión de banda ancha",
    rec: "Banda ancha estable",
  },
];

// 4. Animaciones
const root = ref<HTMLElement | null>(null);
const heroRef = ref<HTMLElement | null>(null);
const introPending = usePageIntro(heroRef, (tl, q) => {
  tl.fromTo(
    q(".dl-shot"),
    { x: 120, rotate: 8, autoAlpha: 0 },
    { x: 0, rotate: 0, autoAlpha: 1, duration: 1.4, stagger: 0.15, ease: "power4.out" },
    0.2,
  );
});

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.to(".dl-shot-a", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: ".dl-hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".dl-shot-b", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: ".dl-hero", start: "top top", end: "bottom top", scrub: true },
    });

    gsap.from(".pf-card", {
      y: 80,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: { trigger: ".pf-grid", start: "top 85%" },
    });

    gsap.from(".step", {
      y: 60,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".steps", start: "top 75%" },
    });
    gsap.from(".steps-line", {
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: { trigger: ".steps", start: "top 75%", end: "bottom 60%", scrub: true },
    });

    gsap.from(".req-row", {
      x: -40,
      autoAlpha: 0,
      duration: 0.7,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: { trigger: ".req-table", start: "top 80%" },
    });

    gsap.from(".help-fade", {
      y: 40,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".help", start: "top 70%" },
    });
  });
}, root);
</script>

<template>
  <div ref="root" class="bg-night text-white">
    <!-- ═══ Hero ═══ -->
    <section
      ref="heroRef"
      :class="{ 'intro-pending': introPending }"
      class="dl-hero relative bg-indigo overflow-hidden pt-36 md:pt-40 pb-[calc(7vw+5rem)] px-6 md:px-[6vw]"
    >
      <span class="stripes absolute left-0 bottom-0 w-[35%] h-[45%] text-white/[0.05]" aria-hidden="true" />
      <span class="sparkle absolute w-10 h-10 bg-aqua left-[46%] top-[22%] hidden lg:block" aria-hidden="true" />
      <span class="sparkle absolute w-5 h-5 bg-white/70 left-[8%] top-[24%]" aria-hidden="true" />

      <div class="relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center max-w-[1300px] mx-auto">
        <div>
          <p class="ix-fade eyebrow-wide text-white/60 mb-5">Descarga · Gratis</p>
          <h1
            class="font-display font-black italic uppercase leading-[0.86]"
            style="font-size: clamp(3.6rem, 9vw, 8.5rem)"
          >
            <span class="ix-line block overflow-hidden pr-[0.08em]"><span class="block">Lleva el</span></span>
            <span class="ix-line block overflow-hidden pr-[0.08em] text-aqua"><span class="block">juego contigo</span></span>
          </h1>

          <p
            class="ix-fade inline-block mt-6 -ml-1 bg-night font-display font-bold italic uppercase tracking-[0.12em] px-5 py-1.5 -skew-x-12"
          >
            <span class="flex items-center gap-2 skew-x-12">
              <span class="w-2 h-2 rounded-full bg-aqua animate-pulse" />
              Versión Alpha · {{ platforms[1].version }}
            </span>
          </p>

          <p class="ix-fade mt-6 max-w-[460px] text-white/75 leading-relaxed">
            Es una versión temprana: puede haber bugs o funciones incompletas.
            Tu feedback en Discord nos ayuda a mejorarla.
          </p>

          <div class="ix-fade flex flex-wrap items-center gap-3 mt-9">
            <component
              :is="primary.internal ? NuxtLinkComp : 'a'"
              :to="primary.internal ? primary.link : undefined"
              :href="primary.internal ? undefined : primary.link"
              :target="primary.internal ? undefined : '_blank'"
              :rel="primary.internal ? undefined : 'noopener noreferrer'"
              class="btn-primary"
            >
              <OsIcon :os="primary.key" class="w-5 h-5" />
              {{ primary.key === "web" ? "Jugar en navegador" : `Descargar para ${primary.os}` }}
            </component>
            <a href="#plataformas" class="btn-outline">Otras plataformas</a>
          </div>
        </div>

        <!-- Capturas -->
        <div class="relative h-[300px] sm:h-[420px] lg:h-[520px]" aria-hidden="true">
          <img
            src="/imagenes del juego/mesas.png"
            alt=""
            class="ix-hide dl-shot dl-shot-a absolute right-0 top-0 w-[88%] rounded-[22px] border-4 border-night shadow-[0_40px_80px_-30px_rgba(16,13,38,0.8)] rotate-[3deg]"
          />
          <img
            src="/imagenes del juego/creacion de deck.png"
            alt=""
            class="ix-hide dl-shot dl-shot-b absolute left-0 bottom-0 w-[70%] rounded-[18px] border-4 border-aqua shadow-[0_40px_80px_-30px_rgba(16,13,38,0.8)] -rotate-[4deg]"
          />
        </div>
      </div>
    </section>

    <!-- ═══ Plataformas ═══ -->
    <section
      id="plataformas"
      class="pf relative -mt-[7vw] pt-[calc(7vw+5rem)] pb-28 px-6 md:px-[6vw] bg-night scroll-mt-10"
    >
      <div class="max-w-[1300px] mx-auto">
        <div class="sec-head mb-14">
          <span class="sec-head-sub text-aqua">
            <span class="stripes w-8 h-5 text-aqua" />
            Plataformas
          </span>
          <h2 class="sec-head-big">download</h2>
        </div>

        <div class="pf-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          <article
            v-for="p in platforms"
            :key="p.key"
            class="pf-card group relative flex flex-col rounded-[26px] p-7 transition-[transform,background-color] duration-500 hover:-translate-y-2"
            :class="[
              p.key === 'web' ? 'bg-aqua text-night' : 'bg-panel text-white',
              detected === p.key ? 'ring-[3px] ring-aqua ring-offset-4 ring-offset-night' : '',
            ]"
          >
            <span
              v-if="detected === p.key"
              class="absolute -top-3 right-6 px-3 py-1 rounded-full bg-white text-night font-display font-bold uppercase tracking-[0.15em] text-[0.7rem]"
            >
              Tu sistema
            </span>

            <div class="flex items-start justify-between">
              <span
                class="w-16 h-16 rounded-2xl grid place-items-center transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"
                :class="p.key === 'web' ? 'bg-night text-aqua' : 'bg-white/[0.07] text-white'"
              >
                <OsIcon :os="p.key" class="w-8 h-8" style="--os-belly: var(--panel)" />
              </span>
              <span
                class="font-mono text-[0.68rem] tracking-[0.15em] px-2.5 py-1 rounded-full"
                :class="p.key === 'web' ? 'bg-night/10' : 'bg-white/[0.07] text-white/60'"
              >
                {{ p.version }}
              </span>
            </div>

            <h3 class="font-display font-black italic uppercase text-[2.4rem] leading-none mt-8">
              {{ p.os }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed" :class="p.key === 'web' ? 'text-night/70' : 'text-white/55'">
              {{ p.description }}
            </p>

            <div class="mt-auto pt-8">
              <p
                class="flex items-center gap-2 font-display font-bold uppercase tracking-[0.18em] text-[0.72rem] mb-4"
                :class="p.key === 'web' ? 'text-night/60' : 'text-white/40'"
              >
                <span class="stripes w-4 h-3" />
                {{ p.size }}
              </p>

              <NuxtLink v-if="p.internal" :to="p.link" class="btn-dark w-full">
                <span class="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-current" />
                {{ p.cta }}
              </NuxtLink>
              <a
                v-else-if="p.link"
                :href="p.link"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary w-full"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
                {{ p.cta }}
              </a>
              <span
                v-else
                class="btn-base w-full border-2 border-dashed border-white/20 text-white/45 cursor-not-allowed hover:!translate-y-0"
              >
                Próximamente
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══ Instalación ═══ -->
    <section class="steps relative bg-paper text-night px-6 md:px-[6vw] py-28 overflow-hidden">
      <span
        class="absolute right-[-2vw] top-6 font-display font-black italic uppercase text-[18vw] leading-none text-white/70 select-none pointer-events-none"
        aria-hidden="true"
        >INSTALL</span
      >
      <div class="relative max-w-[1300px] mx-auto">
        <div class="sec-head mb-16">
          <span class="sec-head-sub text-indigo">
            <span class="stripes w-8 h-5 text-indigo" />
            Instalación
          </span>
          <h2 class="sec-head-big">3 pasos</h2>
        </div>

        <div class="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <span
            class="steps-line hidden md:block absolute left-[10%] right-[10%] top-[44px] h-[3px] bg-indigo/25"
            aria-hidden="true"
          />
          <div v-for="(s, i) in steps" :key="s.title" class="step relative">
            <div class="flex items-center gap-4">
              <span
                class="relative z-[1] w-[88px] h-[88px] rounded-full bg-indigo text-white grid place-items-center shadow-[0_20px_40px_-15px_rgba(85,65,212,0.7)]"
              >
                <svg v-if="s.icon === 'download'" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 3v12M7 10l5 5 5-5" />
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                <svg v-else-if="s.icon === 'unzip'" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M12 10v2M12 14v2" />
                </svg>
                <svg v-else class="w-9 h-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                </svg>
              </span>
              <span class="font-display font-black italic text-[4.5rem] leading-none text-indigo/20">
                0{{ i + 1 }}
              </span>
            </div>
            <h3 class="font-display font-black italic uppercase text-4xl mt-6">{{ s.title }}</h3>
            <p class="mt-3 text-night/65 leading-relaxed max-w-[320px]">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Requisitos ═══ -->
    <section class="relative bg-night px-6 md:px-[6vw] py-28">
      <div class="max-w-[1300px] mx-auto">
        <div class="sec-head mb-14">
          <span class="sec-head-sub text-aqua">
            <span class="stripes w-8 h-5 text-aqua" />
            Requisitos
          </span>
          <h2 class="sec-head-big">specs</h2>
        </div>

        <div class="req-table rounded-[26px] bg-panel overflow-hidden">
          <div
            class="hidden md:grid grid-cols-[1fr_1.3fr_1.3fr] px-8 py-5 border-b border-white/10 font-display font-bold uppercase tracking-[0.25em] text-[0.75rem] text-white/45"
          >
            <span>Componente</span>
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-white/40" />Mínimo</span>
            <span class="flex items-center gap-2 text-aqua"><span class="w-2 h-2 rounded-full bg-aqua" />Recomendado</span>
          </div>
          <div
            v-for="r in requirements"
            :key="r.label"
            class="req-row grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1.3fr] gap-2 md:gap-0 px-6 md:px-8 py-5 border-b border-white/[0.06] last:border-b-0 transition-colors hover:bg-white/[0.03]"
          >
            <span class="flex items-center gap-3 font-display font-black italic uppercase text-xl">
              <span class="w-10 h-10 rounded-xl bg-indigo/40 text-aqua grid place-items-center shrink-0">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <template v-if="r.icon === 'os'">
                    <rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" />
                  </template>
                  <template v-else-if="r.icon === 'cpu'">
                    <rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" />
                    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
                  </template>
                  <template v-else-if="r.icon === 'ram'">
                    <rect x="2" y="7" width="20" height="10" rx="1.5" /><path d="M6 11v2M10 11v2M14 11v2M18 11v2M5 17v3M19 17v3" />
                  </template>
                  <template v-else-if="r.icon === 'gpu'">
                    <rect x="2" y="6" width="20" height="11" rx="2" /><circle cx="9" cy="11.5" r="3" /><path d="M15 9.5h4M15 13.5h4M5 17v3" />
                  </template>
                  <template v-else-if="r.icon === 'disk'">
                    <ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
                  </template>
                  <template v-else>
                    <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="19.5" r="1" fill="currentColor" />
                  </template>
                </svg>
              </span>
              {{ r.label }}
            </span>
            <span class="flex items-center text-white/65 text-[0.95rem] md:pr-6">
              <span class="md:hidden font-display font-bold uppercase tracking-[0.2em] text-[0.65rem] text-white/35 w-28 shrink-0">Mínimo</span>
              {{ r.min }}
            </span>
            <span class="flex items-center text-white text-[0.95rem]">
              <span class="md:hidden font-display font-bold uppercase tracking-[0.2em] text-[0.65rem] text-aqua w-28 shrink-0">Recomendado</span>
              {{ r.rec }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Ayuda ═══ -->
    <section
      class="help relative bg-aqua text-night px-6 md:px-[6vw] pt-[calc(6vw+5rem)] pb-24 -mt-[6vw] overflow-hidden"
    >
      <span class="stripes absolute right-0 top-0 w-[28%] h-full text-night/[0.06]" aria-hidden="true" />
      <div class="relative max-w-[1300px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div>
          <p class="help-fade eyebrow-wide text-night/60 mb-5">Soporte</p>
          <h2
            class="help-fade font-display font-black italic uppercase leading-[0.86]"
            style="font-size: clamp(3rem, 8vw, 7rem)"
          >
            ¿Necesitas<br /><span class="text-indigo">ayuda?</span>
          </h2>
          <p class="help-fade mt-6 max-w-[460px] text-night/70 leading-relaxed">
            Si algo falla al descargar o instalar, la comunidad y el equipo de
            desarrollo te ayudan en Discord.
          </p>
        </div>
        <div class="help-fade flex flex-wrap gap-3 lg:max-w-[560px] lg:justify-end">
          <a :href="SITE.discord" target="_blank" rel="noopener noreferrer" class="btn-dark !pl-3">
            <span class="w-10 h-10 rounded-full bg-[#5865F2] grid place-items-center text-white">
              <AppIcon name="discord" class="w-5 h-5" />
            </span>
            Unirme al Discord
          </a>
          <a :href="SITE.whatsapp" target="_blank" rel="noopener noreferrer" class="btn-dark !pl-3">
            <span class="w-10 h-10 rounded-full bg-[#25D366] grid place-items-center text-white">
              <AppIcon name="whatsapp" class="w-5 h-5" />
            </span>
            Grupo de WhatsApp
          </a>
          <NuxtLink to="/terminos" class="btn-outline-dark">Términos y condiciones</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pf {
  clip-path: polygon(0 7vw, 100% 0, 100% 100%, 0 100%);
}
.help {
  clip-path: polygon(0 0, 100% 6vw, 100% 100%, 0 100%);
}
</style>
