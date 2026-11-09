<script setup lang="ts">
import type { CardInfo, DeckDetail, DeckMe, DeckReview, MissingCard } from "~/composables/useCommunityDecks";
import { TIER_COLOR, TYPE_META, groupDeck, loadCatalog } from "~/composables/useCommunityDecks";

const route = useRoute();
const router = useRouter();
const account = useAccount();
const decksApi = useCommunityDecks();
const code = computed(() => String(route.params.code).toUpperCase());

const catalog = ref<Record<string, CardInfo> | null>(null);
const deck = ref<DeckDetail | null>(null);
const reviews = ref<DeckReview[]>([]);
const me = ref<DeckMe | null>(null);
const loading = ref(true);
const notFound = ref("");

usePageSeo({
  title: "Mazo de la comunidad — NeoCaoh",
  description: "Lista de cartas, valoraciones y comentarios de un mazo de la comunidad de NeoCaoh.",
});
watch(deck, (d) => {
  if (d) useHead({ title: `${d.name} por ${d.author} — Mazos NeoCaoh` });
});

async function load() {
  try {
    const r = await decksApi.get(code.value);
    deck.value = r.deck;
    reviews.value = r.reviews;
    me.value = r.me;
    if (r.me?.review) {
      myStars.value = r.me.review.stars;
      myComment.value = r.me.review.comment;
    }
    notFound.value = "";
  } catch (e: any) {
    notFound.value = e.status === 404 ? "No existe un mazo con ese código" : e.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => loadCatalog().then((c) => (catalog.value = c)).catch(() => {}));
watch(
  () => [account.ready.value, account.player.value?.id],
  () => {
    if (account.ready.value) load();
  },
  { immediate: true },
);

const groups = computed(() => (deck.value ? groupDeck(catalog.value, deck.value.cards) : []));
const view = ref<"grid" | "list">("grid");
const zoom = ref<CardInfo | null>(null);
const loginLink = computed(() => `/entrar?volver=${encodeURIComponent(route.fullPath)}`);

// ── Copiar código ───────────────────────────────────────────
const copied = ref(false);
async function copyCode() {
  try {
    await navigator.clipboard.writeText(code.value);
  } catch {
    const t = document.createElement("textarea");
    t.value = code.value;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

// ── Asignar a slot ──────────────────────────────────────────
const slotsOpen = ref(false);
const slots = ref<{ slot: number; name: string; count: number }[]>([]);
const slotsLoading = ref(false);
const assignSlot = ref<number | null>(null);
const assignBusy = ref(false);
const assignError = ref("");
const assignOk = ref("");
const missing = ref<MissingCard[]>([]);

async function openSlots() {
  if (!account.player.value) return router.push(loginLink.value);
  slotsOpen.value = true;
  assignError.value = "";
  assignOk.value = "";
  missing.value = [];
  slotsLoading.value = true;
  try {
    const mine = await decksApi.mySlots();
    const n = account.player.value?.deck_slots || 3;
    slots.value = Array.from({ length: n }, (_, i) => {
      const d = mine.find((x) => x.slot === i + 1);
      return { slot: i + 1, name: d && d.cards.length ? d.name : "", count: d?.cards.length ?? 0 };
    });
  } catch (e: any) {
    assignError.value = e.message;
  } finally {
    slotsLoading.value = false;
  }
}

async function assign() {
  if (!assignSlot.value) return;
  assignBusy.value = true;
  assignError.value = "";
  missing.value = [];
  try {
    await decksApi.assign(code.value, assignSlot.value);
    assignOk.value = `Listo: está en tu Slot ${assignSlot.value}. Si el juego está abierto, se actualiza solo.`;
  } catch (e: any) {
    if (e.status === 409 && e.data?.missing) missing.value = e.data.missing;
    else assignError.value = e.message;
  } finally {
    assignBusy.value = false;
  }
}

const missingTotal = computed(() => missing.value.reduce((a, m) => a + (m.need - m.have), 0));

// ── Me gusta ────────────────────────────────────────────────
const liking = ref(false);
async function toggleLike() {
  if (!account.player.value) return router.push(loginLink.value);
  if (!deck.value || !me.value) return;
  liking.value = true;
  try {
    const r = await decksApi.like(code.value);
    me.value.liked = r.liked;
    deck.value.likes = r.likes;
  } catch {}
  liking.value = false;
}

// ── Reseña ──────────────────────────────────────────────────
const myStars = ref(0);
const myComment = ref("");
const reviewBusy = ref(false);
const reviewError = ref("");
async function sendReview() {
  if (!myStars.value) {
    reviewError.value = "Elige de 1 a 5 estrellas";
    return;
  }
  reviewBusy.value = true;
  reviewError.value = "";
  try {
    await decksApi.review(code.value, myStars.value, myComment.value.trim());
    await load();
  } catch (e: any) {
    reviewError.value = e.message;
  } finally {
    reviewBusy.value = false;
  }
}
async function deleteReview(r: DeckReview) {
  if (!confirm(r.mine ? "¿Borrar tu reseña?" : `¿Borrar la reseña de ${r.username}?`)) return;
  try {
    await decksApi.deleteReview(code.value, r.mine ? undefined : r.player_id);
    if (r.mine) {
      myStars.value = 0;
      myComment.value = "";
    }
    await load();
  } catch (e: any) {
    alert(e.message);
  }
}

// ── Autor: editar descripción / borrar ───────────────────────
const editing = ref(false);
const editName = ref("");
const editDesc = ref("");
function startEdit() {
  if (!deck.value) return;
  editName.value = deck.value.name;
  editDesc.value = deck.value.description;
  editing.value = true;
}
async function saveEdit() {
  try {
    await decksApi.update(code.value, { name: editName.value, description: editDesc.value });
    editing.value = false;
    await load();
  } catch (e: any) {
    alert(e.message);
  }
}
async function removeDeck() {
  if (!confirm("¿Borrar este mazo de la web? Se pierden sus reseñas y me gusta.")) return;
  try {
    await decksApi.remove(code.value);
    router.push("/mazos");
  } catch (e: any) {
    alert(e.message);
  }
}

const fmtDate = (s: string) =>
  new Date(s.replace(" ", "T") + "Z").toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" });
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <div v-if="loading" class="pt-44 px-4 text-center text-white/60">Cargando mazo…</div>

    <div v-else-if="notFound || !deck" class="pt-44 pb-28 px-4 text-center">
      <p class="font-display font-black italic uppercase text-5xl">Mazo no encontrado</p>
      <p class="mt-3 text-white/60">{{ notFound }}</p>
      <NuxtLink to="/mazos" class="btn-primary mt-8"><AppIcon name="arrow-left" class="w-4 h-4" /> Ver mazos</NuxtLink>
    </div>

    <template v-else>
      <!-- Cabecera -->
      <section class="deck-hero relative bg-indigo overflow-hidden pt-32 md:pt-40 pb-[calc(5vw+3.5rem)] px-4 md:px-[6vw]">
        <span class="stripes absolute left-0 bottom-0 w-[32%] h-[55%] text-white/[0.05]" aria-hidden="true" />
        <div class="relative max-w-[1300px] mx-auto">
          <NuxtLink to="/mazos" class="auth-back !mb-4"><AppIcon name="arrow-left" class="w-4 h-4" />Mazos de la comunidad</NuxtLink>

          <div class="flex flex-wrap items-center gap-2">
            <span
              class="font-display font-black italic text-base px-3 py-0.5 rounded-full text-night"
              :style="{ background: TIER_COLOR[deck.tier] || TIER_COLOR.C }"
              >Tier {{ deck.tier }}</span
            >
            <span
              v-for="t in deck.types"
              :key="t"
              class="inline-flex items-center gap-1.5 rounded-full bg-night/30 px-3 py-1 text-sm"
            >
              <img :src="TYPE_META[t]?.icon" alt="" class="w-5 h-5" />{{ TYPE_META[t]?.label }}
            </span>
            <span v-if="deck.hidden" class="rounded-full bg-scarlet/80 px-3 py-1 text-sm">Oculto</span>
          </div>

          <template v-if="!editing">
            <h1
              class="mt-4 font-display font-black italic uppercase leading-[0.9] break-words"
              style="font-size: clamp(2.6rem, 7vw, 6rem)"
            >
              {{ deck.name }}
            </h1>
            <p class="mt-3 text-white/75">
              por <NuxtLink :to="`/mazos?q=${encodeURIComponent(deck.author)}`" class="text-aqua font-medium hover:underline">{{ deck.author }}</NuxtLink>
              · publicado el {{ fmtDate(deck.created_at) }}
            </p>
          </template>
          <div v-else class="mt-4 max-w-[640px] space-y-3">
            <label class="auth-label" for="ed-name">Nombre</label>
            <input id="ed-name" v-model="editName" maxlength="40" class="auth-field" />
            <label class="auth-label" for="ed-desc">Descripción y estrategia</label>
            <textarea id="ed-desc" v-model="editDesc" maxlength="1500" rows="5" class="auth-field !h-auto py-3" />
            <div class="flex gap-3">
              <button type="button" class="btn-primary !py-3" @click="saveEdit">Guardar</button>
              <button type="button" class="btn-outline !py-3" @click="editing = false">Cancelar</button>
            </div>
          </div>

          <!-- Cifras -->
          <dl class="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <dt class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">Valoración</dt>
              <dd class="mt-1 flex items-center gap-2">
                <DeckStars :value="deck.rating" size="w-5 h-5" />
                <span class="font-display font-black italic text-2xl">{{ deck.rating_count ? deck.rating.toFixed(1) : "—" }}</span>
                <span class="text-sm text-white/55">({{ deck.rating_count }})</span>
              </dd>
            </div>
            <div>
              <dt class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">Me gusta</dt>
              <dd class="mt-1 font-display font-black italic text-2xl">{{ deck.likes }}</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">Copias</dt>
              <dd class="mt-1 font-display font-black italic text-2xl">{{ deck.copies }}</dd>
            </div>
            <div>
              <dt class="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/55">Visitas</dt>
              <dd class="mt-1 font-display font-black italic text-2xl">{{ deck.views }}</dd>
            </div>
          </dl>

          <!-- Acciones -->
          <div class="mt-8 flex flex-wrap gap-3">
            <button type="button" class="btn-primary" @click="openSlots">
              <AppIcon name="cards" class="w-4 h-4" /> Asignar a un slot
            </button>
            <button
              type="button"
              class="btn-outline font-mono !tracking-[0.18em]"
              :title="'Pégalo en el editor de mazos del juego'"
              @click="copyCode"
            >
              <AppIcon :name="copied ? 'check' : 'copy'" class="w-4 h-4" />
              {{ copied ? "¡Copiado!" : code }}
            </button>
            <button
              type="button"
              class="btn-outline"
              :class="me?.liked ? '!border-scarlet !text-[#FF9AAC]' : ''"
              :aria-pressed="!!me?.liked"
              :disabled="liking"
              @click="toggleLike"
            >
              <AppIcon name="heart" class="w-4 h-4" :class="me?.liked ? 'fill-current' : ''" />
              {{ me?.liked ? "Te gusta" : "Me gusta" }}
            </button>
            <button v-if="me?.is_author && !editing" type="button" class="btn-outline" @click="startEdit">
              <AppIcon name="edit" class="w-4 h-4" /> Editar
            </button>
            <button v-if="me?.can_delete" type="button" class="btn-outline hover:!border-scarlet" @click="removeDeck">
              <AppIcon name="trash" class="w-4 h-4" /> Borrar
            </button>
          </div>
          <p class="mt-3 text-sm text-white/60">
            ¿Prefieres el juego? Copia el código y pégalo en <b class="text-white/85">Editor de mazos → Importar código</b>.
          </p>
        </div>
      </section>

      <section class="px-4 md:px-[6vw] pt-12 pb-28">
        <div class="max-w-[1300px] mx-auto grid gap-10 lg:grid-cols-[1fr_380px]">
          <!-- Cartas -->
          <div>
            <div v-if="deck.description" class="rounded-[24px] bg-panel p-6 md:p-7 mb-8">
              <h2 class="font-display font-black italic uppercase text-2xl">Estrategia</h2>
              <p class="mt-3 text-white/75 leading-relaxed whitespace-pre-line break-words">{{ deck.description }}</p>
            </div>

            <div class="flex items-center justify-between mb-5">
              <h2 class="font-display font-black italic uppercase text-4xl">Cartas <span class="text-white/40">60</span></h2>
              <div class="flex gap-1 rounded-full bg-white/[0.05] p-1" role="tablist" aria-label="Vista">
                <button
                  v-for="v in (['grid', 'list'] as const)"
                  :key="v"
                  type="button"
                  role="tab"
                  :aria-selected="view === v"
                  class="px-3.5 py-1.5 rounded-full text-sm"
                  :class="view === v ? 'bg-white text-night font-medium' : 'text-white/65'"
                  @click="view = v"
                >
                  {{ v === "grid" ? "Imágenes" : "Lista" }}
                </button>
              </div>
            </div>

            <div v-for="g in groups" :key="g.key" class="mb-10">
              <h3 class="sec-head-sub text-aqua text-sm mb-4">
                <span class="stripes w-8 h-5 text-aqua" />{{ g.label }} · {{ g.total }}
              </h3>

              <div v-if="view === 'grid'" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
                <button
                  v-for="e in g.items"
                  :key="e.card.id"
                  type="button"
                  class="group relative text-left focus:outline-none"
                  :aria-label="`${e.n} × ${e.card.name}`"
                  @click="zoom = e.card"
                >
                  <img
                    :src="e.card.img"
                    :alt="e.card.name"
                    loading="lazy"
                    width="320"
                    height="447"
                    class="w-full aspect-[63/88] rounded-[6px] bg-panel object-cover shadow-[0_6px_16px_rgba(0,0,0,0.35)]
                           transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-aqua"
                  />
                  <span
                    class="absolute -top-2 -right-2 min-w-8 h-8 px-1.5 grid place-items-center rounded-full bg-aqua text-night
                           font-display font-black italic text-lg shadow-lg"
                    >×{{ e.n }}</span
                  >
                </button>
              </div>

              <ul v-else class="rounded-[20px] bg-panel divide-y divide-white/[0.06]">
                <li v-for="e in g.items" :key="e.card.id">
                  <button type="button" class="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/[0.03]" @click="zoom = e.card">
                    <span class="w-8 font-display font-black italic text-xl text-aqua">{{ e.n }}</span>
                    <img v-if="TYPE_META[e.card.ptype] && e.card.type === 'POKEMON'" :src="TYPE_META[e.card.ptype].icon" alt="" class="w-5 h-5" />
                    <span class="font-medium">{{ e.card.name }}</span>
                    <span class="ml-auto text-xs text-white/45 truncate">{{ e.card.set }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Reseñas -->
          <aside class="lg:sticky lg:top-28 self-start">
            <div class="rounded-[24px] bg-panel p-6">
              <h2 class="font-display font-black italic uppercase text-3xl">Reseñas</h2>

              <div v-if="!account.player.value" class="mt-4 text-white/65 text-sm">
                <NuxtLink :to="loginLink" class="auth-link">Entra con tu cuenta</NuxtLink> para valorar y comentar.
              </div>
              <p v-else-if="me?.is_author" class="mt-4 text-white/55 text-sm">Es tu mazo: no puedes valorarlo.</p>
              <form v-else class="mt-4 space-y-3" @submit.prevent="sendReview">
                <DeckStars v-model:value="myStars" editable size="w-7 h-7" />
                <textarea
                  v-model="myComment"
                  maxlength="600"
                  rows="3"
                  placeholder="¿Qué te pareció? (opcional)"
                  aria-label="Comentario"
                  class="auth-field !h-auto py-3 text-sm"
                />
                <p v-if="reviewError" class="auth-error" role="alert">
                  <AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ reviewError }}
                </p>
                <button type="submit" class="btn-primary w-full !py-3" :disabled="reviewBusy">
                  {{ reviewBusy ? "Enviando…" : me?.review ? "Actualizar reseña" : "Publicar reseña" }}
                </button>
              </form>

              <ul class="mt-6 space-y-4">
                <li v-if="!reviews.length" class="text-white/45 text-sm">Nadie lo ha valorado todavía.</li>
                <li v-for="r in reviews" :key="r.username" class="rounded-2xl bg-white/[0.04] p-4">
                  <div class="flex items-center gap-2">
                    <span class="font-medium truncate" :class="r.mine ? 'text-aqua' : ''">{{ r.username }}</span>
                    <DeckStars :value="r.stars" size="w-3.5 h-3.5" />
                    <button
                      v-if="r.mine || me?.is_mod"
                      type="button"
                      class="ml-auto text-white/40 hover:text-scarlet"
                      :aria-label="`Borrar reseña de ${r.username}`"
                      @click="deleteReview(r)"
                    >
                      <AppIcon name="trash" class="w-4 h-4" />
                    </button>
                  </div>
                  <p v-if="r.comment" class="mt-2 text-sm text-white/75 leading-relaxed break-words whitespace-pre-line">{{ r.comment }}</p>
                  <p class="mt-2 font-mono text-[0.65rem] text-white/35">{{ fmtDate(r.updated_at) }}</p>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <!-- Asignar a slot -->
      <Teleport to="body">
        <div
          v-if="slotsOpen"
          class="fixed inset-0 z-[100] grid place-items-center bg-night/80 backdrop-blur-sm p-4"
          @click.self="slotsOpen = false"
        >
          <div class="w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-[28px] bg-panel p-6 md:p-8" role="dialog" aria-modal="true" aria-label="Asignar a un slot">
            <div class="flex items-start gap-4">
              <div>
                <h2 class="font-display font-black italic uppercase text-3xl leading-none">Asignar a un slot</h2>
                <p class="mt-2 text-sm text-white/60">Se guarda en tu cuenta; lo verás en el juego. Reemplaza lo que haya en ese slot.</p>
              </div>
              <button type="button" class="ml-auto text-white/50 hover:text-white text-2xl leading-none" aria-label="Cerrar" @click="slotsOpen = false">×</button>
            </div>

            <div v-if="slotsLoading" class="mt-6 text-white/60">Cargando tus slots…</div>
            <div v-else-if="assignOk" class="mt-6 space-y-5">
              <p class="auth-info"><AppIcon name="check" class="w-4 h-4 mt-0.5 shrink-0" />{{ assignOk }}</p>
              <button type="button" class="btn-primary w-full" @click="slotsOpen = false">Listo</button>
            </div>
            <template v-else>
              <div class="mt-6 grid gap-2">
                <button
                  v-for="s in slots"
                  :key="s.slot"
                  type="button"
                  class="flex items-center gap-3 rounded-2xl px-4 py-3 text-left ring-1 transition-colors"
                  :class="assignSlot === s.slot ? 'bg-aqua/15 ring-aqua' : 'bg-white/[0.04] ring-white/10 hover:ring-white/30'"
                  @click="assignSlot = s.slot; missing = []; assignError = ''"
                >
                  <span class="font-display font-black italic text-2xl w-14">Slot {{ s.slot }}</span>
                  <span class="truncate" :class="s.name ? 'text-white/80' : 'text-white/40'">{{ s.name || "Vacío" }}</span>
                  <span v-if="s.name" class="ml-auto text-xs text-white/40">se reemplaza</span>
                </button>
              </div>

              <div v-if="missing.length" class="mt-5 rounded-2xl border border-scarlet/30 bg-scarlet/10 p-4">
                <p class="font-medium text-[#FF9AAC]">Te faltan {{ missingTotal }} carta{{ missingTotal === 1 ? "" : "s" }} para este mazo:</p>
                <ul class="mt-3 space-y-1.5 text-sm max-h-56 overflow-y-auto pr-1">
                  <li v-for="m in missing" :key="m.id" class="flex gap-2">
                    <span class="text-white/85">{{ m.name }}</span>
                    <span class="ml-auto font-mono text-white/55">tienes {{ m.have }} / {{ m.need }}</span>
                  </li>
                </ul>
                <p class="mt-3 text-xs text-white/55">Consíguelas en sobres, la tienda o el GTS y vuelve a intentarlo.</p>
              </div>
              <p v-if="assignError" class="mt-5 auth-error" role="alert">
                <AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ assignError }}
              </p>

              <button type="button" class="btn-primary w-full mt-6" :disabled="!assignSlot || assignBusy" @click="assign">
                {{ assignBusy ? "Guardando…" : assignSlot ? `Asignar a Slot ${assignSlot}` : "Elige un slot" }}
              </button>
            </template>
          </div>
        </div>

        <!-- Zoom de carta -->
        <div
          v-if="zoom"
          class="fixed inset-0 z-[100] grid place-items-center bg-night/85 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
          :aria-label="zoom.name"
          @click="zoom = null"
        >
          <figure class="text-center">
            <img :src="zoom.img" :alt="zoom.name" class="w-[min(80vw,340px)] aspect-[63/88] rounded-[12px] shadow-2xl" />
            <figcaption class="mt-4 font-display font-black italic uppercase text-2xl">{{ zoom.name }}</figcaption>
            <p class="text-sm text-white/55">{{ zoom.set }}</p>
          </figure>
        </div>
      </Teleport>
    </template>
  </div>
</template>

<style scoped>
.deck-hero {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%);
}
</style>
