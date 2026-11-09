// Mazos de la comunidad: API del servidor del juego (/api/community-decks)
// y catálogo de cartas (public/data/cards.json, imágenes en R2).

export type DeckSummary = {
  code: string;
  name: string;
  author: string;
  tier: string;
  featured: string[];
  cover: string[];
  types: string[];
  rating: number;
  rating_count: number;
  likes: number;
  copies: number;
  views: number;
  created_at: string;
  updated_at: string;
  hidden?: boolean;
};

export type DeckDetail = DeckSummary & { description: string; cards: string[] };

export type DeckReview = {
  username: string;
  avatar_id?: string;
  stars: number;
  comment: string;
  created_at: string;
  updated_at: string;
  mine: boolean;
  player_id?: string;
};

export type DeckMe = {
  liked: boolean;
  review: { stars: number; comment: string } | null;
  is_author: boolean;
  can_delete: boolean;
  is_mod: boolean;
};

export type MissingCard = { id: string; name: string; need: number; have: number };

export type CardInfo = {
  id: string;
  name: string;
  set: string;
  type: "POKEMON" | "TRAINER" | "ENERGY" | string;
  ptype: string;
  subtype: string;
  stage: number;
  img: string;
};

const CARD_CDN = "https://play.neotcg.cl/cards";

// Tipos del juego → ícono y nombre en la web
export const TYPE_META: Record<string, { label: string; icon: string; color: string }> = {
  GRASS: { label: "Planta", icon: "/frames/tipos/grass.png", color: "#5FD77A" },
  FIRE: { label: "Fuego", icon: "/frames/tipos/fire.png", color: "#FF7A45" },
  WATER: { label: "Agua", icon: "/frames/tipos/water.png", color: "#4DA8FF" },
  LIGHTNING: { label: "Eléctrico", icon: "/frames/tipos/electric.png", color: "#FFD43B" },
  PSYCHIC: { label: "Psíquico", icon: "/frames/tipos/psy.png", color: "#C77DFF" },
  FIGHTING: { label: "Lucha", icon: "/frames/tipos/figth.png", color: "#E0894A" },
  DARKNESS: { label: "Oscuro", icon: "/frames/tipos/dark.png", color: "#8A7FA8" },
  METAL: { label: "Metal", icon: "/frames/tipos/metal.png", color: "#B8C2D6" },
  COLORLESS: { label: "Incoloro", icon: "/frames/tipos/incolor.png", color: "#D9D6E8" },
};

export const TIER_COLOR: Record<string, string> = {
  S: "#FF4F6D",
  A: "#FFB547",
  B: "#5FE3D2",
  C: "#7A68F2",
  D: "#8A86A8",
};

// Catálogo compartido entre páginas (se pide una sola vez)
let catalogPromise: Promise<Record<string, CardInfo>> | null = null;

export function loadCatalog(): Promise<Record<string, CardInfo>> {
  if (!catalogPromise) {
    catalogPromise = $fetch<Record<string, [string, string, string, string, string, number, string]>>(
      "/data/cards.json",
    )
      .then((raw) => {
        const out: Record<string, CardInfo> = {};
        for (const [id, c] of Object.entries(raw)) {
          out[id] = {
            id,
            name: c[0],
            set: c[1],
            type: c[2],
            ptype: c[3],
            subtype: c[4],
            stage: c[5],
            img: `${CARD_CDN}/${encodeURIComponent(id)}.webp${c[6] ? `?v=${c[6]}` : ""}`,
          };
        }
        return out;
      })
      .catch((e) => {
        catalogPromise = null;
        throw e;
      });
  }
  return catalogPromise;
}

/** Datos de una carta aunque no esté en el catálogo (id nuevo del servidor). */
export function cardOf(catalog: Record<string, CardInfo> | null, id: string): CardInfo {
  return (
    catalog?.[id] ?? {
      id,
      name: id.replace(/^[a-z0-9]+_/i, "").replace(/[_-]+/g, " "),
      set: "",
      type: /energy/i.test(id) ? "ENERGY" : "POKEMON",
      ptype: "",
      subtype: "",
      stage: 0,
      img: `${CARD_CDN}/${encodeURIComponent(id)}.webp`,
    }
  );
}

function apiError(e: any): Error {
  const data = e?.data ?? e?.response?._data;
  const err: any = new Error(
    data?.error || (e?.response?.status ? "Error del servidor. Inténtalo más tarde." : "No hay conexión con el servidor."),
  );
  err.status = e?.response?.status ?? e?.statusCode;
  err.data = data;
  return err;
}

export function useCommunityDecks() {
  const api = useRuntimeConfig().public.gameApi as string;
  const account = useAccount();
  const base = `${api}/api/community-decks`;

  const req = <T>(path: string, opts: { method?: string; body?: object; query?: object; auth?: boolean } = {}) => {
    const token = account.token();
    return $fetch<T>(`${base}${path}`, {
      method: (opts.method ?? "GET") as any,
      body: opts.body,
      query: opts.query as any,
      headers: token && opts.auth !== false ? { Authorization: `Bearer ${token}` } : undefined,
    }).catch((e) => {
      throw apiError(e);
    });
  };

  return {
    list: (q: { sort?: string; type?: string; q?: string; author?: string; card?: string; page?: number }) =>
      req<{ decks: DeckSummary[]; total: number; page: number; page_size: number }>("", { query: q, auth: false }),
    mine: () => req<{ decks: DeckSummary[] }>("/mine"),
    liked: () => req<{ decks: DeckSummary[] }>("/liked"),
    get: (code: string) =>
      req<{ deck: DeckDetail; reviews: DeckReview[]; me: DeckMe | null }>(`/${encodeURIComponent(code)}`),
    publish: (body: { slot: number; name?: string; description?: string }) =>
      req<{ success: true; code: string }>("", { method: "POST", body }),
    update: (code: string, body: { name?: string; description?: string }) =>
      req(`/${code}`, { method: "PATCH", body }),
    remove: (code: string) => req(`/${code}`, { method: "DELETE" }),
    like: (code: string) => req<{ liked: boolean; likes: number }>(`/${code}/like`, { method: "POST" }),
    review: (code: string, stars: number, comment: string) =>
      req(`/${code}/review`, { method: "PUT", body: { stars, comment } }),
    deleteReview: (code: string, playerId?: string) =>
      req(`/${code}/review${playerId ? `/${encodeURIComponent(playerId)}` : ""}`, { method: "DELETE" }),
    assign: (code: string, slot: number) =>
      req<{ success: true; slot: number }>(`/${code}/assign`, { method: "POST", body: { slot } }),
    /** Mazos guardados del jugador (para publicar o ver qué slot se reemplaza). */
    mySlots: () =>
      $fetch<{ decks: { slot: number; name: string; cards: string }[] }>(`${api}/api/decks`, {
        headers: { Authorization: `Bearer ${account.token()}` },
      })
        .then((r) =>
          r.decks.map((d) => {
            let cards: string[] = [];
            try {
              cards = JSON.parse(d.cards);
            } catch {}
            return { slot: d.slot, name: d.name, cards };
          }),
        )
        .catch((e) => {
          throw apiError(e);
        }),
  };
}

/** Agrupa y cuenta las cartas de un mazo: Pokémon, Entrenadores y Energías. */
export function groupDeck(catalog: Record<string, CardInfo> | null, cards: string[]) {
  const counts = new Map<string, number>();
  for (const id of cards) counts.set(id, (counts.get(id) ?? 0) + 1);
  const entries = [...counts.entries()].map(([id, n]) => ({ card: cardOf(catalog, id), n }));
  const by = (t: string) => entries.filter((e) => e.card.type === t);
  const sortPokemon = (a: any, b: any) =>
    a.card.ptype.localeCompare(b.card.ptype) || a.card.stage - b.card.stage || b.n - a.n || a.card.name.localeCompare(b.card.name);
  const sortName = (a: any, b: any) => b.n - a.n || a.card.name.localeCompare(b.card.name);
  const groups = [
    { key: "POKEMON", label: "Pokémon", items: by("POKEMON").sort(sortPokemon) },
    { key: "TRAINER", label: "Entrenadores", items: by("TRAINER").sort(sortName) },
    { key: "ENERGY", label: "Energías", items: by("ENERGY").sort(sortName) },
  ];
  const other = entries.filter((e) => !["POKEMON", "TRAINER", "ENERGY"].includes(e.card.type));
  if (other.length) groups[0].items.push(...other);
  return groups.map((g) => ({ ...g, total: g.items.reduce((a, e) => a + e.n, 0) })).filter((g) => g.items.length);
}
