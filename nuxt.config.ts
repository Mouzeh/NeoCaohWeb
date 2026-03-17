export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],

  content: {
    highlight: {
      theme: "one-dark-pro",
    },
    markdown: {
      anchorLinks: false,
    },
  },

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

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },

  vite: {
    ssr: {
      external: ['@clack/core', '@clack/prompts']
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/contacto", "/celebi", "/terminos", "/descargar", "/blog", "/cookies"],
      failOnError: false,
    },
  },

  ssr: false,
  compatibilityDate: "2024-11-01",
});
