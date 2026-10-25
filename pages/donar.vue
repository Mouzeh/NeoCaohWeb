<script setup lang="ts">
useSeoMeta({
  title: "Donar — NeoCaoh",
  description:
    "Apoya a NeoCaoh con una donación vía Cuenta RUT (Chile) o PayPal (internacional).",
});
</script>

<template>
  <div class="bg-night text-white">
    <PageHero
      sub="Apoya el proyecto"
      big="support"
      :title="['Mantén viva', 'la mesa']"
      description="NeoCaoh es gratis y lo hacemos por amor al juego. Si quieres ayudarnos a pagar servidores y seguir creciendo, cualquier aporte suma."
    />
    <DonateSection />
  </div>
</template>
