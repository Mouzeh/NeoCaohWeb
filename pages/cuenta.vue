<script setup lang="ts">
usePageSeo({
  title: "Mi cuenta — NeoCaoh",
  description: "Tu perfil de entrenador en NeoCaoh.",
});
useHead({ meta: [{ name: "robots", content: "noindex" }] });

const account = useAccount();
const router = useRouter();
const player = account.player;

// Sin sesión → a entrar (una vez que se intentó restaurar la guardada)
watchEffect(() => {
  if (account.ready.value && !player.value) router.replace("/entrar");
});

const stats = computed(() => {
  const p = player.value;
  if (!p) return [];
  const cards = Object.values(p.inventory ?? {}).reduce((a, n) => a + n, 0);
  return [
    { label: "ELO", value: p.elo },
    { label: "Rango", value: p.rank },
    { label: "Monedas", value: p.coins },
    { label: "Gemas", value: p.gems ?? 0 },
    { label: "Pase de batalla", value: `Nv. ${p.bp_level}` },
    { label: "Cartas", value: cards },
    { label: "Mazos", value: Object.keys(p.decks ?? {}).length },
    { label: "Medallas", value: p.medals?.length ?? 0 },
  ];
});

// Cambio de contraseña
const pw = ref({ current: "", next: "" });
const pwError = ref("");
const pwInfo = ref("");
const pwLoading = ref(false);

async function changePassword() {
  pwError.value = "";
  pwInfo.value = "";
  if (pw.value.next.length < 4) {
    pwError.value = "La contraseña debe tener al menos 4 caracteres";
    return;
  }
  pwLoading.value = true;
  try {
    await account.changePassword(pw.value.current, pw.value.next);
    pw.value = { current: "", next: "" };
    pwInfo.value = "Contraseña cambiada. Úsala también en el juego.";
  } catch (e: any) {
    pwError.value = e.message;
  } finally {
    pwLoading.value = false;
  }
}

function logout() {
  account.logout();
  router.push("/");
}
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero sub="Cuenta" big="trainer" :title="['Mi', 'cuenta']" />

    <section class="px-4 md:px-[6vw] pt-16 pb-28">
      <div v-if="!player" class="max-w-[1000px] mx-auto text-center text-white/60">Cargando…</div>

      <div v-else class="max-w-[1000px] mx-auto grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <!-- Perfil -->
        <div class="rounded-[28px] bg-panel p-7 md:p-10">
          <span class="sec-head-sub text-aqua text-sm"><span class="stripes w-8 h-5 text-aqua" />Entrenador</span>
          <h2 class="mt-3 font-display font-black italic uppercase text-5xl md:text-6xl leading-none break-words">
            {{ player.username }}
          </h2>

          <dl class="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div v-for="s in stats" :key="s.label" class="rounded-2xl bg-white/[0.05] p-4">
              <dt class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">{{ s.label }}</dt>
              <dd class="mt-1 font-display font-black italic text-2xl">{{ s.value }}</dd>
            </div>
          </dl>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/play" class="btn-primary"><AppIcon name="play" class="w-4 h-4" /> Jugar</NuxtLink>
            <button type="button" class="btn-outline" @click="logout">Cerrar sesión</button>
          </div>
        </div>

        <!-- Contraseña -->
        <div class="rounded-[28px] bg-paper text-night p-7 md:p-8">
          <h2 class="font-display font-black italic uppercase text-3xl leading-none">Cambiar contraseña</h2>
          <form class="mt-6 space-y-4" @submit.prevent="changePassword">
            <label class="block">
              <span class="auth-label">Contraseña actual</span>
              <input v-model="pw.current" type="password" required autocomplete="current-password" class="auth-field" />
            </label>
            <label class="block">
              <span class="auth-label">Nueva contraseña</span>
              <input v-model="pw.next" type="password" required minlength="4" autocomplete="new-password" class="auth-field" />
            </label>
            <p v-if="pwError" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ pwError }}</p>
            <p v-if="pwInfo" class="flex items-center gap-2 text-sm text-night/70"><AppIcon name="check" class="w-4 h-4 text-indigo" />{{ pwInfo }}</p>
            <button type="submit" class="btn-dark w-full" :disabled="pwLoading">{{ pwLoading ? "Guardando…" : "Guardar" }}</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
