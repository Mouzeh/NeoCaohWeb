// Estadísticas en vivo del servidor del juego (en línea, registrados, ranking,
// cartas más usadas). Se piden desde el navegador y se refrescan cada minuto.

export type PublicStats = {
  online: number;
  games: number;
  cards: number;
  registered: number;
  ranking: { position: number; username: string; elo: number; rank: string }[];
  top_cards: { id: string; name: string; number: string | null; decks: number; pct: number }[];
  updated_at: string;
};

export function usePublicStats() {
  const api = useRuntimeConfig().public.gameApi as string;
  const stats = ref<PublicStats | null>(null);

  async function load() {
    try {
      stats.value = await $fetch<PublicStats>(`${api}/api/stats/public`);
    } catch {}
  }

  let timer: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    load();
    timer = setInterval(load, 60 * 1000);
  });
  onBeforeUnmount(() => clearInterval(timer));

  return stats;
}
