<script setup lang="ts">
// Marco de las páginas de cuenta (entrar, registro): panel índigo con cartas
// reales del juego a un lado y el formulario sobre fondo oscuro al otro.
// En móvil el panel queda arriba como cabecera compacta, sin las cartas.
const props = defineProps<{
  big: string;
  title: string[];
  description: string;
  cards: [string, string, string];
}>();

const root = ref<HTMLElement | null>(null);
const pending = usePageIntro(root, (tl, q) => {
  // Las cartas se reparten en abanico desde abajo: el único gesto de la página
  tl.fromTo(
    q(".auth-card"),
    { autoAlpha: 0, y: 80, rotation: 0 },
    {
      autoAlpha: 1,
      y: 0,
      rotation: (i: number) => [-11, 0, 11][i],
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08,
    },
    0.15,
  );
});
</script>

<template>
  <div
    ref="root"
    class="min-h-screen bg-night text-white grid grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
    :class="{ 'intro-pending': pending }"
  >
    <aside
      class="auth-brand relative overflow-hidden bg-indigo px-6 sm:px-10 lg:px-14 xl:px-20 pt-28 pb-[calc(8vw+2.5rem)] lg:pt-36 lg:pb-16 flex flex-col"
    >
      <span class="stripes absolute left-0 bottom-0 w-[45%] h-[40%] text-white/[0.05]" aria-hidden="true" />
      <span
        class="absolute -right-[2vw] top-24 lg:top-auto lg:bottom-8 font-display font-black italic uppercase leading-none text-white/[0.05] whitespace-nowrap select-none pointer-events-none text-[34vw] lg:text-[15vw]"
        aria-hidden="true"
        >{{ props.big }}</span
      >

      <div class="relative">
        <h1
          class="font-display font-black italic uppercase leading-[0.88]"
          style="font-size: clamp(2.8rem, 5.6vw, 5.4rem)"
        >
          <span
            v-for="(line, i) in props.title"
            :key="line"
            class="ix-line block overflow-hidden pr-[0.08em]"
            :class="i === props.title.length - 1 ? 'text-aqua' : ''"
          >
            <span class="block">{{ line }}</span>
          </span>
        </h1>
        <p class="ix-fade mt-4 lg:mt-6 max-w-[400px] text-white/75 text-base lg:text-lg leading-relaxed">
          {{ props.description }}
        </p>
      </div>

      <!-- Abanico de cartas -->
      <div class="relative hidden lg:flex flex-1 items-center justify-center min-h-[340px] mt-10" aria-hidden="true">
        <div class="relative w-[clamp(170px,14vw,230px)] aspect-[63/88]">
          <!-- El envoltorio fija la posición; GSAP solo mueve/rota la carta -->
          <div class="absolute inset-0 -translate-x-[58%]">
            <img
              :src="props.cards[0]"
              alt=""
              class="auth-card ix-hide w-full h-full rounded-[4.5%] object-cover shadow-2xl shadow-night/50 origin-bottom"
              style="transform: rotate(-11deg)"
            />
          </div>
          <div class="absolute inset-0 -translate-y-[6%]">
            <div class="auth-card ix-hide w-full h-full">
              <CardTilt :max="10" class="w-full h-full">
                <img
                  :src="props.cards[1]"
                  alt=""
                  class="w-full h-full rounded-[4.5%] object-cover shadow-2xl shadow-night/60"
                />
              </CardTilt>
            </div>
          </div>
          <div class="absolute inset-0 translate-x-[58%]">
            <img
              :src="props.cards[2]"
              alt=""
              class="auth-card ix-hide w-full h-full rounded-[4.5%] object-cover shadow-2xl shadow-night/50 origin-bottom"
              style="transform: rotate(11deg)"
            />
          </div>
        </div>
      </div>

      <p class="ix-fade relative hidden lg:block text-sm text-white/60">
        La misma cuenta sirve en la web, en PC y en Android.
      </p>
    </aside>

    <section class="flex justify-center items-start lg:items-center px-5 sm:px-10 pt-6 pb-20 lg:pt-32 lg:pb-16">
      <div class="ix-fade w-full max-w-[440px]">
        <slot />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Corte diagonal: abajo en móvil (como PageHero), a la derecha en escritorio */
.auth-brand {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8vw), 0 100%);
}
@media (min-width: 1024px) {
  .auth-brand {
    clip-path: polygon(0 0, 100% 0, calc(100% - 5vw) 100%, 0 100%);
  }
}
</style>
