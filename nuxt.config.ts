export default defineNuxtConfig({
  // Habilita las herramientas de desarrollo
  devtools: { enabled: true },

  // Módulos instalados
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],

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

  // Variables de entorno públicas
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },

  // CORRECCIÓN CRUCIAL: Vite y SSR
  vite: {
    ssr: {
      // Usamos noExternal para que Vite procese estos paquetes que dan error en Node 18
      noExternal: ["@clack/core", "@clack/prompts"],
    },
  },

  // Configuración de Nitro para el prerenderizado
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/contacto",
        "/celebi",
        "/terminos",
        "/descargar",
        "/blog",
        "/cookies",
      ],
      failOnError: false,
    },
  },

  // Deshabilitamos SSR para generar una SPA pura (mejor para despliegues sencillos en Netlify)
  ssr: false,

  // Fecha de compatibilidad requerida por Nuxt 3
  compatibilityDate: "2024-11-01",
});
