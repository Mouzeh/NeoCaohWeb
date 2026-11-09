<script setup lang="ts">
import type { CardInfo, DeckSummary } from "~/composables/useCommunityDecks";
import { TIER_COLOR, TYPE_META, loadCatalog } from "~/composables/useCommunityDecks";

usePageSeo({
  title: "Mazos de la comunidad — NeoCaoh",
  description:
    "Mazos armados por los jugadores de NeoCaoh: revisa sus cartas, valóralos y cópialos a tu cuenta con un clic para jugarlos en el simulador.",
});

const route = useRoute();
const router = useRouter();
const account = useAccount();
const decksApi = useCommunityDecks();

const SORTS = [
  { key: "top", label: "Mejor valorados" },
  { key: "liked", label: "Más gustados" },
  { key: "copied", label: "Más copiados" },
  { key: "recent", label: "Recientes" },
];
const VIEWS = [
  { key: "all", label: "Todos" },
  { key: "mine", label: "Mis mazos" },
  { key: "liked", label: "Favoritos" },
];

// Filtros en la URL (se pueden compartir)
const view = computed(() => String(route.query.ver || "all"));
const sort = computed(() => String(route.query.orden || "top"));
const type = computed(() => String(route.query.tipo || ""));
const tier = computed(() => String(route.query.tier || "").toUpperCase());
const TIERS = ["SS", "S", "A", "B", "C"];
const page = computed(() => Math.max(1, Number(route.query.p) || 1));
const search = ref(String(route.query.q || ""));

function setQuery(patch: Record<string, string | number | undefined>) {
  const q: Record<string, any> = { ...route.query, ...patch };
  if (!("p" in patch)) delete q.p;
  for (const k of Object.keys(q)) if (q[k] === "" || q[k] === undefined || q[k] === 1 && k === "p") delete q[k];
  router.replace({ query: q });
}

let searchTimer: ReturnType<typeof setTimeout> | undefined;
watch(search, (v) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => setQuery({ q: v.trim() || undefined }), 350);
});

const catalog = ref<Record<string, CardInfo> | null>(null);
// Las imágenes llevan ?v= del catálogo: no pintarlas antes o se bajan dos veces
const catalogReady = ref(false);
const decks = ref<DeckSummary[]>([]);
const total = ref(0);
const pageSize = ref(24);
const loading = ref(true);
const error = ref("");

async function load() {
  loading.value = true;
  error.value = "";
  try {
    if (view.value === "mine" || view.value === "liked") {
      if (!account.player.value) {
        decks.value = [];
        total.value = 0;
        return;
      }
      const r = view.value === "mine" ? await decksApi.mine() : await decksApi.liked();
      decks.value = r.decks;
      total.value = r.decks.length;
      pageSize.value = r.decks.length || 1;
    } else {
      const r = await decksApi.list({
        sort: sort.value,
        type: type.value || undefined,
        tier: tier.value || undefined,
        q: String(route.query.q || "") || undefined,
        page: page.value,
      });
      decks.value = r.decks;
      total.value = r.total;
      pageSize.value = r.page_size;
    }
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

const pages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)));

onMounted(() => {
  loadCatalog()
    .then((c) => (catalog.value = c))
    .catch(() => {})
    .finally(() => (catalogReady.value = true));
});
watch(
  () => [route.query, account.ready.value, account.player.value?.id],
  () => {
    if (account.ready.value) load();
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero
      sub="Comunidad"
      big="mazos"
      :title="['Mazos de', 'la comunidad']"
      description="Mira lo que arman los demás, valora sus mazos y llévatelos a tu cuenta con un clic."
    >
      <div class="flex flex-wrap gap-3">
        <NuxtLink :to="account.player.value ? '/mazos/publicar' : '/entrar?volver=/mazos/publicar'" class="btn-primary">
          <AppIcon name="plus" class="w-4 h-4" /> Publicar mi mazo
        </NuxtLink>
      </div>
    </PageHero>

    <section class="px-4 md:px-[6vw] pt-12 pb-28">
      <div class="max-w-[1300px] mx-auto">
        <!-- Vista: todos / míos / favoritos -->
        <div v-if="account.player.value" class="flex gap-2 mb-6" role="tablist">
          <button
            v-for="v in VIEWS"
            :key="v.key"
            type="button"
            role="tab"
            :aria-selected="view === v.key"
            class="px-4 py-2 rounded-full font-display font-bold uppercase tracking-[0.12em] text-sm transition-colors"
            :class="view === v.key ? 'bg-white text-night' : 'bg-white/[0.06] text-white/70 hover:bg-white/10'"
            @click="setQuery({ ver: v.key === 'all' ? undefined : v.key })"
          >
            {{ v.label }}
          </button>
        </div>

        <!-- Filtros -->
        <div v-if="view === 'all'" class="flex flex-col gap-4 mb-8">
          <div class="flex flex-col md:flex-row gap-3 md:items-center">
            <div class="relative md:w-80">
              <AppIcon name="search" class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                v-model="search"
                type="search"
                placeholder="Buscar mazo o jugador"
                aria-label="Buscar mazo o jugador"
                class="auth-field pl-11 h-12"
              />
            </div>
            <div class="flex flex-wrap gap-2 md:ml-auto" role="tablist" aria-label="Ordenar">
              <button
                v-for="s in SORTS"
                :key="s.key"
                type="button"
                role="tab"
                :aria-selected="sort === s.key"
                class="px-3.5 py-2 rounded-full text-sm font-medium transition-colors"
                :class="sort === s.key ? 'bg-aqua text-night' : 'bg-white/[0.05] text-white/65 hover:text-white'"
                @click="setQuery({ orden: s.key === 'top' ? undefined : s.key })"
              >
                {{ s.label }}
              </button>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2" aria-label="Filtrar por tier">
            <span class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45 mr-1">Tier</span>
            <button
              type="button"
              class="h-10 px-3.5 rounded-full text-sm transition-colors"
              :class="!tier ? 'bg-white text-night font-medium' : 'bg-white/[0.05] text-white/65 hover:text-white'"
              @click="setQuery({ tier: undefined })"
            >
              Todos
            </button>
            <button
              v-for="t in TIERS"
              :key="t"
              type="button"
              :aria-pressed="tier === t"
              class="h-10 min-w-12 px-3 rounded-full font-display font-black italic text-lg transition-[transform,opacity] hover:scale-105"
              :class="tier === t ? 'text-night ring-2 ring-white' : 'text-night opacity-55 hover:opacity-90'"
              :style="{ background: TIER_COLOR[t] }"
              @click="setQuery({ tier: tier === t ? undefined : t })"
            >
              {{ t }}
            </button>
          </div>
          <div class="flex flex-wrap gap-2" aria-label="Filtrar por tipo">
            <button
              type="button"
              class="h-10 px-3.5 rounded-full text-sm transition-colors"
              :class="!type ? 'bg-white text-night font-medium' : 'bg-white/[0.05] text-white/65 hover:text-white'"
              @click="setQuery({ tipo: undefined })"
            >
              Todos los tipos
            </button>
            <button
              v-for="(m, t) in TYPE_META"
              :key="t"
              type="button"
              :title="m.label"
              :aria-label="m.label"
              :aria-pressed="type === t"
              class="h-10 w-10 grid place-items-center rounded-full transition-[background-color,transform] hover:scale-105"
              :class="type === t ? 'bg-white/90 ring-2 ring-aqua' : 'bg-white/[0.05]'"
              @click="setQuery({ tipo: type === t ? undefined : t })"
            >
              <img :src="m.icon" alt="" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <p v-if="error" class="auth-error mb-6" role="alert">
          <AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}
        </p>

        <!-- Lista -->
        <div v-if="loading || !catalogReady" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true">
          <div v-for="i in 8" :key="i" class="h-[300px] rounded-[24px] bg-panel animate-pulse" />
        </div>

        <div v-else-if="!decks.length" class="rounded-[28px] bg-panel p-10 text-center">
          <AppIcon name="cards" class="w-10 h-10 mx-auto text-white/30" />
          <p class="mt-4 font-display font-black italic uppercase text-3xl">
            {{
              view === "mine"
                ? "Aún no publicas mazos"
                : view === "liked"
                  ? "Sin favoritos todavía"
                  : route.query.q || type || tier
                    ? "No hay mazos con ese filtro"
                    : "Sé el primero en publicar"
            }}
          </p>
          <p class="mt-2 text-white/55">
            {{
              view === "liked"
                ? "Dale me gusta a un mazo para guardarlo aquí."
                : "Publica uno de tus mazos desde aquí o desde el editor del juego."
            }}
          </p>
          <NuxtLink v-if="view !== 'liked'" :to="account.player.value ? '/mazos/publicar' : '/entrar?volver=/mazos/publicar'" class="btn-primary mt-6">
            <AppIcon name="plus" class="w-4 h-4" /> Publicar mi mazo
          </NuxtLink>
        </div>

        <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DeckTile v-for="d in decks" :key="d.code" :deck="d" :catalog="catalog" />
        </div>

        <!-- Paginación -->
        <nav v-if="view === 'all' && pages > 1" class="mt-10 flex items-center justify-center gap-3" aria-label="Páginas">
          <button
            type="button"
            class="btn-outline !px-5 !py-3"
            :disabled="page <= 1"
            @click="setQuery({ p: page - 1 })"
          >
            <AppIcon name="arrow-left" class="w-4 h-4" /> Anterior
          </button>
          <span class="font-mono text-sm text-white/60">{{ page }} / {{ pages }}</span>
          <button
            type="button"
            class="btn-outline !px-5 !py-3"
            :disabled="page >= pages"
            @click="setQuery({ p: page + 1 })"
          >
            Siguiente <AppIcon name="arrow-right" class="w-4 h-4" />
          </button>
        </nav>
      </div>
    </section>
  </div>
</template>
