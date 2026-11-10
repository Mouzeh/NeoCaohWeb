<script setup lang="ts">
// Canjear códigos: la recompensa llega al BUZÓN del juego (sobre de la barra
// superior), donde el jugador la reclama. API: POST /api/mail/redeem
usePageSeo({
  title: "Canjear código — NeoCaoh",
  description: "Canjea códigos de regalo de NeoCaoh: las recompensas llegan al buzón del juego.",
});

type Reward = { type: string; amount: number; id?: string };

const account = useAccount();
const router = useRouter();
const route = useRoute();
const api = useRuntimeConfig().public.gameApi as string;

const code = ref(String(route.query.codigo ?? route.query.code ?? "").toUpperCase());
const busy = ref(false);
const error = ref("");
const done = ref<{ title: string; rewards: Reward[] } | null>(null);

watchEffect(() => {
  if (account.ready.value && !account.player.value) {
    const back = "/canjear" + (code.value ? `?codigo=${encodeURIComponent(code.value)}` : "");
    router.replace("/entrar?volver=" + encodeURIComponent(back));
  }
});

const PACKS: Record<string, string> = {
  typhlosion_pack: "Sobre Typhlosion",
  feraligatr_pack: "Sobre Feraligatr",
  meganium_pack: "Sobre Meganium",
  legendary_collection_pack: "Sobre Legendary Collection",
  energy_boost_pack: "Sobre Energy Boost",
  jungle_pack: "Sobre Jungla",
  fossil_pack: "Sobre Fósil",
  rocket_pack: "Sobre Team Rocket",
};

function rewardText(r: Reward): string {
  const n = r.amount.toLocaleString("es-CL");
  switch (r.type) {
    case "coins": return `${n} monedas`;
    case "gems": return `${n} gemas`;
    case "bp_xp": return `${n} XP del pase de batalla`;
    case "lucky_turns": return `${n} tiros de Lucky Box`;
    case "premium_pass": return "Pase Premium";
    case "pack": return `${n}× ${PACKS[r.id ?? ""] ?? r.id}`;
    case "card": return `${n}× carta ${r.id}`;
  }
  return r.type;
}

async function redeem() {
  const c = code.value.trim().toUpperCase();
  if (!c) return;
  busy.value = true;
  error.value = "";
  done.value = null;
  try {
    const r = await $fetch<{ title: string; rewards: Reward[] }>(`${api}/api/mail/redeem`, {
      method: "POST",
      body: { code: c },
      headers: { Authorization: `Bearer ${account.token()}` },
    });
    done.value = r;
    code.value = "";
  } catch (e: any) {
    const status = e?.response?.status ?? e?.statusCode;
    error.value =
      e?.data?.error ?? (status === 401 ? "Tu sesión expiró. Vuelve a entrar." : "No hay conexión con el servidor. Inténtalo de nuevo.");
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero sub="Regalos" big="code" :title="['Canjear', 'código']" description="Escribe tu código y la recompensa llegará al buzón del juego." />

    <section class="px-4 md:px-[6vw] pt-12 pb-28">
      <div class="max-w-[720px] mx-auto">
        <div v-if="!account.player.value" class="text-white/60 text-center">Cargando…</div>

        <div v-else class="rounded-[28px] bg-panel p-7 md:p-10">
          <span class="sec-head-sub text-aqua text-sm"><span class="stripes w-8 h-5 text-aqua" />Cuenta: {{ account.player.value.username }}</span>

          <form class="mt-6 space-y-4" @submit.prevent="redeem">
            <label for="code" class="auth-label">Código</label>
            <input
              id="code"
              v-model="code"
              class="w-full rounded-2xl bg-white/[0.06] px-5 py-4 font-mono text-2xl uppercase tracking-[0.15em] ring-1 ring-white/10 focus:ring-aqua outline-none"
              placeholder="NEO-XXXXXX"
              maxlength="32"
              autocomplete="off"
              autocapitalize="characters"
              spellcheck="false"
              @input="code = code.toUpperCase()"
            />
            <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
            <button type="submit" class="btn-primary w-full" :disabled="busy || !code.trim()">{{ busy ? "Canjeando…" : "Canjear" }}</button>
          </form>

          <div v-if="done" class="mt-8 rounded-2xl bg-aqua/10 ring-1 ring-aqua p-6" role="status">
            <p class="font-display font-black italic uppercase text-3xl leading-none">¡Listo! {{ done.title }}</p>
            <ul class="mt-4 space-y-1 text-white/85">
              <li v-for="(r, i) in done.rewards" :key="i" class="flex items-center gap-2">
                <AppIcon name="check" class="w-4 h-4 text-aqua shrink-0" />{{ rewardText(r) }}
              </li>
            </ul>
            <p class="mt-4 text-sm text-white/60">
              Abre el juego y toca el <strong>sobre</strong> de la barra superior para reclamarla. Tienes 30 días.
            </p>
            <NuxtLink to="/play" class="btn-primary mt-5"><AppIcon name="play" class="w-4 h-4" /> Ir al juego</NuxtLink>
          </div>

          <p class="mt-8 text-sm text-white/50">
            Cada código se puede canjear una vez por cuenta. Los códigos se publican en nuestras redes y en Discord.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
