<script setup lang="ts">
// Logos de plataforma dibujados en SVG (heredan el color con currentColor)
defineProps<{ os: "web" | "windows" | "mac" | "linux" }>();
</script>

<template>
  <!-- Windows: cuatro paneles en perspectiva -->
  <svg v-if="os === 'windows'" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M2 4.6 10 3.5v8H2zM11 3.36 22 1.8v9.7H11zM2 12.5h8v8L2 19.4zM11 12.5h11v9.7l-11-1.56z" />
  </svg>

  <!-- macOS: manzana -->
  <svg v-else-if="os === 'mac'" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      d="M16.6 12.7c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.8-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.8 1.2 1.8 2.6 3.1 2.5 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.4-4.2z"
    />
    <path d="M14.2 5.3c.7-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z" />
  </svg>

  <!-- Linux: pingüino -->
  <svg v-else-if="os === 'linux'" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 1.5c-2.6 0-4.3 2.1-4.3 5 0 1.3.3 2.2-.5 3.6-1 1.7-2.9 4.2-2.9 7.1 0 1.3.4 2.3 1 3 .9 1 2.3 1.6 3.6 1.9 1 .2 2 .4 3.1.4s2.1-.2 3.1-.4c1.3-.3 2.7-.9 3.6-1.9.6-.7 1-1.7 1-3 0-2.9-1.9-5.4-2.9-7.1-.8-1.4-.5-2.3-.5-3.6 0-2.9-1.7-5-4.3-5z"
    />
    <ellipse cx="12" cy="15.6" rx="3.9" ry="5" fill="var(--os-belly, #fff)" opacity=".92" />
    <circle cx="10.4" cy="6.4" r="1.15" fill="#fff" />
    <circle cx="13.6" cy="6.4" r="1.15" fill="#fff" />
    <circle cx="10.6" cy="6.6" r=".55" fill="#100D26" />
    <circle cx="13.4" cy="6.6" r=".55" fill="#100D26" />
    <path d="M10.3 8.6c.5-.5 1-.7 1.7-.7s1.2.2 1.7.7c-.4.7-1 1.1-1.7 1.1s-1.3-.4-1.7-1.1z" fill="#F5B12C" />
    <path d="M5.2 20.2c.9-.9 2.5-1.1 3.3-.3.6.6.4 1.6-.4 2-.9.5-2.5.3-3-.4-.2-.4-.2-.9.1-1.3zM18.8 20.2c-.9-.9-2.5-1.1-3.3-.3-.6.6-.4 1.6.4 2 .9.5 2.5.3 3-.4.2-.4.2-.9-.1-1.3z" fill="#F5B12C" />
  </svg>

  <!-- Web: globo -->
  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5c-2.6-2.8-3.9-6-3.9-9.5S9.4 5.3 12 2.5z" />
  </svg>
</template>
