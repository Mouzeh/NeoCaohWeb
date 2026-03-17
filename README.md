# NeoCaoh — Pokémon TCG Simulator

Sitio web + blog del simulador NeoCaoh, construido con **Nuxt 3**, **Nuxt Content**, **Tailwind CSS** y **Nuxt Auth**.

---

## Setup rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env
# → Editar .env con tus credenciales OAuth

# 3. Dev server
npm run dev
# → http://localhost:3000
```

---

## Estructura del proyecto

```
neocaoh/
├── assets/css/         # main.css (Tailwind + variables CSS)
├── components/
│   ├── layout/         # Nav.vue, Footer.vue
│   ├── home/           # HeroScroll, TypesBar, StatsStrip, FeaturesGrid, StorySection, NewsSection, CtaSection
│   └── blog/           # PostCard.vue
├── composables/
│   ├── useReveal.ts    # IntersectionObserver para animaciones de entrada
│   └── useScrollFrames.ts  # Animación scroll-driven con canvas
├── content/blog/       # Posts en Markdown (.md)
├── layouts/            # default.vue
├── pages/
│   ├── index.vue       # Landing page
│   ├── blog/
│   │   ├── index.vue   # Listado de posts
│   │   └── [slug].vue  # Post individual
│   └── login.vue       # Login con OAuth
├── public/frames/      # ← PON AQUÍ tus frames del Sneasel (frame_0040.jpg … frame_0192.jpg)
└── server/api/auth/    # Handler de NextAuth
```

---

## Animación del Sneasel

1. Copia tu carpeta de frames a `public/frames/`
2. Los archivos deben llamarse `frame_0040.jpg` … `frame_0192.jpg`
3. La animación se activa automáticamente al hacer scroll

Para cambiar los frames, edita `components/home/HeroScroll.vue`:
```ts
startFrame: 40,   // primer frame
endFrame:   192,  // último frame
framePath: (n) => `/frames/frame_${n}.jpg`,
```

---

## Agregar un post al blog

Crea un archivo `.md` en `content/blog/`:

```md
---
title: "Título del post"
description: "Descripción corta para la card"
date: "2026-04-01"
tag: "Torneo"        # Torneo | Update | Comunidad
emoji: "🏆"          # Emoji para la thumbnail
---

Contenido en **Markdown**...
```

El post aparece automáticamente en `/blog` y en la sección de noticias del home.

---

## Auth — Providers OAuth

Edita `server/api/auth/[...].ts` para activar los providers que quieras.

Proveedores disponibles en next-auth: GitHub, Discord, Google, Twitter/X y más.

Configura las credenciales en `.env`:
```
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
DISCORD_CLIENT_ID=...
DISCORD_CLIENT_SECRET=...
```

---

## Deploy

```bash
# Build estático (sin SSR)
npm run generate

# O con SSR (Node server)
npm run build
node .output/server/index.mjs
```

Compatible con Vercel, Netlify y cualquier hosting Node.
