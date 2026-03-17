<template>
  <section class="px-[5vw] py-40 text-center bg-ink2 relative overflow-hidden">
    <!-- Orbs -->
    <div
      class="absolute rounded-full pointer-events-none blur-[100px]"
      style="
        width: 700px;
        height: 700px;
        background: rgba(92, 26, 143, 0.35);
        top: -200px;
        left: 50%;
        transform: translateX(-50%);
      "
    />
    <div
      class="absolute rounded-full pointer-events-none blur-[100px]"
      style="
        width: 380px;
        height: 380px;
        background: rgba(232, 35, 10, 0.2);
        bottom: -80px;
        left: 18%;
      "
    />
    <div
      class="absolute rounded-full pointer-events-none blur-[100px]"
      style="
        width: 340px;
        height: 340px;
        background: rgba(245, 200, 66, 0.1);
        bottom: -60px;
        right: 18%;
      "
    />

    <div class="relative z-10">
      <div
        class="font-mono text-[0.68rem] tracking-[0.35em] uppercase text-gold flex items-center justify-center gap-4 mb-6 reveal"
      >
        <span class="block w-10 h-px bg-gold" />
        Completamente Gratis
        <span class="block w-10 h-px bg-gold" />
      </div>

      <h2
        class="font-display font-extrabold leading-[0.9] reveal"
        style="font-size: clamp(3rem, 8vw, 7rem)"
      >
        <span class="block text-white">¿Quieres</span>
        <span class="block text-scarlet">Jugar?</span>
      </h2>

      <p
        class="text-muted max-w-[440px] mx-auto mt-6 mb-10 leading-[1.8] reveal"
      >
        Descarga en menos de un minuto. Disponible para Windows, macOS y Linux.
        Solo tú, tu mazo y tu rival.
      </p>

      <div class="flex gap-4 justify-center flex-wrap reveal">
        <NuxtLink to="/descargar" class="btn-gold">Descargar Gratis</NuxtLink>
        <NuxtLink to="/terminos" class="btn-outline">Ver Términos</NuxtLink>
      </div>
    </div>
  </section>
</template>
