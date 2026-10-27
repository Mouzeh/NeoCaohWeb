export default defineNuxtConfig({
  // Habilita las herramientas de desarrollo
  devtools: { enabled: true },

  // Módulos instalados
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],

  // Hoja principal (directivas de Tailwind + tokens y componentes propios)
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },

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
      htmlAttrs: { lang: "es" },
      title: "NeoCaoh — Simulador Pokémon TCG gratis en español",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#5541D4" },
        {
          name: "description",
          content:
            "NeoCaoh es el simulador Pokémon TCG gratis de la comunidad hispana. Juega online en español, arma tu mazo con las expansiones Neo y desafía a entrenadores de todo el mundo.",
        },
        // Vista previa al compartir (WhatsApp, Facebook, X, Discord)
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "NeoCaoh" },
        { property: "og:locale", content: "es_CL" },
        { property: "og:title", content: "NeoCaoh — Un nuevo comienzo" },
        {
          property: "og:description",
          content:
            "El simulador Pokémon TCG de la comunidad hispana. Construye tu mazo y desafía al mundo, gratis.",
        },
        { property: "og:image", content: "https://www.neotcg.cl/og-image.jpg" },
        { property: "og:image:secure_url", content: "https://www.neotcg.cl/og-image.jpg" },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "NeoCaoh — Un nuevo comienzo. El simulador de la comunidad hispana" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: "https://www.neotcg.cl/og-image.jpg" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap",
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
      // Servidor del juego: las cuentas de la web y del juego son las mismas
      gameApi: process.env.NUXT_PUBLIC_GAME_API || "https://caoh-tcg.fly.dev",
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
      routes: ["/sitemap.xml"],
      failOnError: false,
    },
  },

  // Fecha de compatibilidad
  compatibilityDate: "2024-11-01",
});
