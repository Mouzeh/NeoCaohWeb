<script setup lang="ts">
import type { CardInfo } from "~/composables/useCommunityDecks";
import { cardOf, groupDeck, loadCatalog } from "~/composables/useCommunityDecks";

usePageSeo({
  title: "Publicar mazo — NeoCaoh",
  description: "Comparte uno de tus mazos de NeoCaoh con la comunidad.",
  noindex: true,
});

const account = useAccount();
const router = useRouter();
const decksApi = useCommunityDecks();

watchEffect(() => {
  if (account.ready.value && !account.player.value) router.replace("/entrar?volver=/mazos/publicar");
});

const catalog = ref<Record<string, CardInfo> | null>(null);
const catalogReady = ref(false);
const slots = ref<{ slot: number; name: string; cards: string[] }[]>([]);
const loading = ref(true);
const selected = ref<number | null>(null);
const name = ref("");
const description = ref("");
const busy = ref(false);
const error = ref("");
const existing = ref("");

onMounted(() =>
  loadCatalog()
    .then((c) => (catalog.value = c))
    .catch(() => {})
    .finally(() => (catalogReady.value = true)),
);
watch(
  () => account.player.value?.id,
  async (id) => {
    if (!id) return;
    loading.value = true;
    try {
      slots.value = (await decksApi.mySlots()).filter((d) => d.cards.length).sort((a, b) => a.slot - b.slot);
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  },
  { immediate: true },
);

const current = computed(() => slots.value.find((s) => s.slot === selected.value) ?? null);
const groups = computed(() => (current.value ? groupDeck(catalog.value, current.value.cards) : []));
const preview = (cards: string[]) => {
  if (!catalogReady.value) return [];
  const g = groupDeck(catalog.value, cards)[0];
  return g ? [...g.items].sort((a, b) => b.card.stage - a.card.stage || b.n - a.n).slice(0, 3).map((e) => e.card) : [];
};

function pick(s: { slot: number; name: string; cards: string[] }) {
  selected.value = s.slot;
  name.value = s.name;
  error.value = "";
  existing.value = "";
}

async function publish() {
  if (!current.value) return;
  if (current.value.cards.length !== 60) {
    error.value = "El mazo debe tener exactamente 60 cartas. Termínalo en el juego primero.";
    return;
  }
  busy.value = true;
  error.value = "";
  existing.value = "";
  try {
    const r = await decksApi.publish({ slot: current.value.slot, name: name.value.trim(), description: description.value.trim() });
    router.push(`/mazos/${r.code}`);
  } catch (e: any) {
    error.value = e.message;
    if (e.status === 409 && e.data?.code) existing.value = e.data.code;
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero sub="Comunidad" big="share" :title="['Publicar', 'mi mazo']" description="Elige uno de tus mazos guardados, ponle nombre y cuenta cómo se juega." />

    <section class="px-4 md:px-[6vw] pt-12 pb-28">
      <div class="max-w-[1100px] mx-auto">
        <div v-if="loading" class="text-white/60">Cargando tus mazos…</div>

        <div v-else-if="!slots.length" class="rounded-[28px] bg-panel p-10 text-center">
          <p class="font-display font-black italic uppercase text-3xl">No tienes mazos guardados</p>
          <p class="mt-2 text-white/60">Arma uno de 60 cartas en el juego y vuelve aquí.</p>
          <NuxtLink to="/play" class="btn-primary mt-6"><AppIcon name="play" class="w-4 h-4" /> Jugar</NuxtLink>
        </div>

        <div v-else class="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <!-- 1. Elegir slot -->
          <div>
            <h2 class="sec-head-sub text-aqua text-sm mb-4"><span class="stripes w-8 h-5 text-aqua" />1 · Elige el mazo</h2>
            <div class="grid gap-3">
              <button
                v-for="s in slots"
                :key="s.slot"
                type="button"
                class="flex items-center gap-4 rounded-[20px] p-4 text-left ring-1 transition-colors"
                :class="selected === s.slot ? 'bg-aqua/10 ring-aqua' : 'bg-panel ring-white/[0.06] hover:ring-white/25'"
                @click="pick(s)"
              >
                <div class="flex -space-x-6 shrink-0">
                  <img
                    v-for="c in preview(s.cards)"
                    :key="c.id"
                    :src="c.img"
                    :alt="c.name"
                    loading="lazy"
                    class="w-12 aspect-[63/88] rounded-[4px] bg-night object-cover shadow-lg"
                  />
                </div>
                <div class="min-w-0">
                  <p class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/50">Slot {{ s.slot }}</p>
                  <p class="font-display font-black italic uppercase text-xl truncate">{{ s.name }}</p>
                  <p class="text-xs" :class="s.cards.length === 60 ? 'text-white/50' : 'text-[#FF9AAC]'">
                    {{ s.cards.length }} / 60 cartas
                  </p>
                </div>
              </button>
            </div>
          </div>

          <!-- 2. Detalles -->
          <div>
            <h2 class="sec-head-sub text-aqua text-sm mb-4"><span class="stripes w-8 h-5 text-aqua" />2 · Cuéntale a la comunidad</h2>
            <form class="rounded-[24px] bg-panel p-6 space-y-4" @submit.prevent="publish">
              <div>
                <label for="pub-name" class="auth-label">Nombre del mazo</label>
                <input id="pub-name" v-model="name" maxlength="40" required class="auth-field" :disabled="!current" placeholder="Ej. Scizor Control" />
              </div>
              <div>
                <label for="pub-desc" class="auth-label">Estrategia (opcional)</label>
                <textarea
                  id="pub-desc"
                  v-model="description"
                  maxlength="1500"
                  rows="6"
                  class="auth-field !h-auto py-3"
                  :disabled="!current"
                  placeholder="Cómo se juega, contra qué rinde, qué cambiarías…"
                />
                <p class="mt-1 text-right font-mono text-[0.65rem] text-white/35">{{ description.length }}/1500</p>
              </div>
              <p v-if="error" class="auth-error" role="alert">
                <AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />
                <span>{{ error }} <NuxtLink v-if="existing" :to="`/mazos/${existing}`" class="underline">Verlo</NuxtLink></span>
              </p>
              <button type="submit" class="btn-primary w-full" :disabled="!current || busy">
                {{ busy ? "Publicando…" : current ? "Publicar mazo" : "Elige un mazo primero" }}
              </button>
              <p class="text-xs text-white/45">Cualquiera podrá ver la lista de cartas. Puedes borrarlo cuando quieras.</p>
            </form>

            <div v-if="current" class="mt-6">
              <div v-for="g in groups" :key="g.key" class="mb-4">
                <p class="text-sm text-white/55 mb-2">{{ g.label }} · {{ g.total }}</p>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="e in g.items" :key="e.card.id" class="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs">
                    <b class="text-aqua">{{ e.n }}</b> {{ cardOf(catalog, e.card.id).name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
