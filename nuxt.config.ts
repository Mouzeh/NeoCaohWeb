export default defineNuxtConfig({
  // Habilita las herramientas de desarrollo
  devtools: { enabled: true },

  // Módulos instalados
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],

  // IMPORTANTE: Habilitamos SSR para que las APIs de Upstash funcionen en Vercel
  ssr: true,

  // Configuración de Nuxt Content (Blog)
  content: {
    highlight: {
      theme: "one-dark-pro",
    },
    markdown: {
      anchorLinks: false,
    },
  },

  // Configuración del Head (SEO y Fuentes)
  app: {
    head: {
      title: "NeoCaoh — Pokémon TCG Simulator",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "NeoCaoh es el simulador Pokémon TCG de la comunidad hispana. Gratis, competitivo.",
        },
        { property: "og:title", content: "NeoCaoh — Pokémon TCG Simulator" },
        {
          property: "og:description",
          content: "Construye tu mazo, desafía al mundo.",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap",
        },
      ],
    },
  },

  // Variables de entorno
  runtimeConfig: {
    // Variables privadas (solo disponibles en el servidor/APIs)
    kvRestApiUrl: process.env.KV_REST_API_URL,
    kvRestApiToken: process.env.KV_REST_API_TOKEN,

    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },

  // Vite y correcciones de compatibilidad
  vite: {
    ssr: {
      noExternal: ["@clack/core", "@clack/prompts"],
    },
  },

  // Optimizamos Nitro para Vercel (quitamos el prerender forzado que congela la página)
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },

  // Fecha de compatibilidad
  compatibilityDate: "2024-11-01",
});
