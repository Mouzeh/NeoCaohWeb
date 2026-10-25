<script setup lang="ts">
import gsap from "gsap";
import { SITE } from "~/data/site";

const rut = SITE.donations.rut;
const paypal = SITE.donations.paypal;

const rows = [
  { label: "Banco", value: rut.bank },
  { label: "Tipo de cuenta", value: rut.account },
  { label: "N° de cuenta", value: rut.number },
  { label: "RUT", value: rut.rut },
];

const copied = ref<string | null>(null);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

async function copy(key: string, text: string) {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = key;
    clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => (copied.value = null), 1800);
  } catch {
    copied.value = null;
  }
}

const allData = [
  `${rut.bank} — ${rut.account}`,
  `N° de cuenta: ${rut.number}`,
  `RUT: ${rut.rut}`,
].join("\n");

const root = ref<HTMLElement | null>(null);

useGsap((mm) => {
  mm.add(MOTION_OK, () => {
    gsap.from(".don-card", {
      y: 80,
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.15,
      ease: "power4.out",
      scrollTrigger: { trigger: root.value, start: "top 75%" },
    });
  });
}, root);
</script>

<template>
  <section ref="root" class="relative bg-night px-6 md:px-[6vw] py-24 md:py-28">
    <div class="max-w-[1300px] mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6">
        <!-- Cuenta RUT -->
        <article class="don-card relative rounded-[28px] bg-paper text-night p-7 md:p-10 overflow-hidden">
          <span class="stripes absolute right-0 top-0 w-28 h-full text-night/[0.05]" aria-hidden="true" />
          <div class="relative flex items-start justify-between gap-4">
            <div>
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-night text-white font-display font-bold uppercase tracking-[0.18em] text-[0.7rem]">
                <span class="w-1.5 h-1.5 rounded-full bg-aqua" />
                Desde Chile
              </span>
              <h3 class="font-display font-black italic uppercase text-[2.8rem] md:text-[3.4rem] leading-none mt-5">
                Cuenta RUT
              </h3>
              <p class="mt-2 text-night/60">Transferencia bancaria a BancoEstado.</p>
            </div>
            <span class="w-16 h-16 rounded-2xl bg-indigo text-white grid place-items-center shrink-0">
              <AppIcon name="bank" class="w-8 h-8" />
            </span>
          </div>

          <dl class="relative mt-8 divide-y divide-night/10 border-y border-night/10">
            <div v-for="r in rows" :key="r.label" class="flex items-center justify-between gap-4 py-4">
              <dt class="font-display font-bold uppercase tracking-[0.2em] text-[0.72rem] text-night/50">
                {{ r.label }}
              </dt>
              <dd class="flex items-center gap-3">
                <span class="font-display font-black italic text-xl md:text-2xl">{{ r.value }}</span>
                <button
                  type="button"
                  class="w-9 h-9 rounded-full grid place-items-center transition-colors"
                  :class="copied === r.label ? 'bg-aqua text-night' : 'bg-night/[0.06] hover:bg-night hover:text-white'"
                  :aria-label="`Copiar ${r.label}`"
                  @click="copy(r.label, r.value)"
                >
                  <AppIcon :name="copied === r.label ? 'check' : 'copy'" class="w-4 h-4" />
                </button>
              </dd>
            </div>
          </dl>

          <button type="button" class="btn-dark relative w-full mt-8" @click="copy('all', allData)">
            <AppIcon :name="copied === 'all' ? 'check' : 'copy'" class="w-4 h-4" />
            {{ copied === "all" ? "Datos copiados" : "Copiar todos los datos" }}
          </button>
        </article>

        <!-- PayPal -->
        <article class="don-card relative flex flex-col rounded-[28px] bg-indigo text-white p-7 md:p-10 overflow-hidden">
          <span class="sparkle absolute w-24 h-24 bg-aqua/20 -right-4 -bottom-4" aria-hidden="true" />
          <div class="relative flex items-start justify-between gap-4">
            <div>
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-night font-display font-bold uppercase tracking-[0.18em] text-[0.7rem]">
                <AppIcon name="globe" class="w-3.5 h-3.5" />
                Internacional
              </span>
              <h3 class="font-display font-black italic uppercase text-[2.8rem] md:text-[3.4rem] leading-none mt-5">
                PayPal
              </h3>
              <p class="mt-2 text-white/70">Desde cualquier país, con tarjeta o saldo PayPal.</p>
            </div>
            <span class="w-16 h-16 rounded-2xl bg-white text-[#003087] grid place-items-center shrink-0">
              <AppIcon name="paypal" class="w-8 h-8" />
            </span>
          </div>

          <div class="relative mt-8 py-4 border-y border-white/15 flex items-center justify-between gap-3">
            <span class="font-display font-bold uppercase tracking-[0.2em] text-[0.72rem] text-white/55">Cuenta</span>
            <span class="flex items-center gap-3 min-w-0">
              <span class="font-display font-bold text-lg truncate">{{ paypal.email }}</span>
              <button
                type="button"
                class="w-9 h-9 rounded-full grid place-items-center shrink-0 transition-colors"
                :class="copied === 'paypal' ? 'bg-aqua text-night' : 'bg-white/10 hover:bg-white hover:text-night'"
                aria-label="Copiar correo de PayPal"
                @click="copy('paypal', paypal.email)"
              >
                <AppIcon :name="copied === 'paypal' ? 'check' : 'copy'" class="w-4 h-4" />
              </button>
            </span>
          </div>

          <a
            :href="paypal.url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary relative w-full mt-auto"
          >
            <AppIcon name="heart" class="w-4 h-4" />
            Donar con PayPal
          </a>
        </article>
      </div>

      <p class="mt-8 text-sm text-white/45 max-w-[640px]">
        Las donaciones son voluntarias y se usan para cubrir servidores y
        hosting del proyecto. NeoCaoh es y seguirá siendo gratuito.
      </p>
    </div>
  </section>
</template>
