<script setup lang="ts">
import type { CardInfo, DeckSummary } from "~/composables/useCommunityDecks";
import { TIER_COLOR, TYPE_META, cardOf } from "~/composables/useCommunityDecks";

// Tarjeta de un mazo en la lista: abanico de 3 cartas, nombre, autor y cifras.
const props = defineProps<{ deck: DeckSummary; catalog: Record<string, CardInfo> | null }>();
const cover = computed(() => props.deck.cover.map((id) => cardOf(props.catalog, id)));
</script>

<template>
  <NuxtLink
    :to="`/mazos/${deck.code}`"
    class="group relative flex flex-col rounded-[24px] bg-panel overflow-hidden ring-1 ring-white/[0.06]
           transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(95,227,210,0.45)]
           focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
  >
    <!-- Abanico -->
    <div class="relative h-44 bg-gradient-to-b from-indigo/40 to-transparent overflow-hidden">
      <span class="stripes absolute left-0 top-0 w-1/2 h-full text-white/[0.04]" aria-hidden="true" />
      <div class="absolute inset-x-0 bottom-[-38px] flex justify-center">
        <img
          v-for="(c, i) in cover"
          :key="c.id + i"
          :src="c.img"
          :alt="c.name"
          loading="lazy"
          width="110"
          height="153"
          class="w-[110px] aspect-[63/88] rounded-[7px] shadow-[0_8px_20px_rgba(0,0,0,0.45)] -mx-5 bg-night object-cover
                 transition-transform duration-300 origin-bottom"
          :class="[
            cover.length === 3 && i === 0 ? '-rotate-[10deg] translate-y-3 group-hover:-rotate-[14deg]' : '',
            cover.length === 3 && i === 2 ? 'rotate-[10deg] translate-y-3 group-hover:rotate-[14deg]' : '',
            (cover.length === 3 && i === 1) || cover.length === 1 ? 'z-10 group-hover:-translate-y-2' : '',
            cover.length === 2 ? (i === 0 ? '-rotate-[6deg]' : 'rotate-[6deg]') : '',
          ]"
        />
        <div v-if="!cover.length" class="h-36 w-24 rounded-lg bg-white/5 grid place-items-center text-white/30">
          <AppIcon name="cards" class="w-8 h-8" />
        </div>
      </div>
      <span
        class="absolute top-3 left-3 font-display font-black italic text-sm px-2.5 py-0.5 rounded-full text-night"
        :style="{ background: TIER_COLOR[deck.tier] || TIER_COLOR.C }"
        :title="`Tier ${deck.tier}`"
        >{{ deck.tier }}</span
      >
      <span class="absolute top-3 right-3 flex gap-1">
        <img
          v-for="t in deck.types"
          :key="t"
          :src="TYPE_META[t]?.icon"
          :alt="TYPE_META[t]?.label"
          :title="TYPE_META[t]?.label"
          class="w-6 h-6 drop-shadow"
        />
      </span>
    </div>

    <div class="relative flex-1 flex flex-col p-5 pt-4 bg-panel">
      <h3 class="font-display font-black italic uppercase text-2xl leading-[0.95] break-words line-clamp-2">
        {{ deck.name }}
      </h3>
      <p class="mt-1 text-sm text-white/55 truncate">por <span class="text-aqua2">{{ deck.author }}</span></p>
      <div class="mt-auto pt-4 flex items-center gap-3 text-sm text-white/60">
        <span class="inline-flex items-center gap-1.5">
          <DeckStars :value="deck.rating" size="w-3.5 h-3.5" />
          <span class="font-mono text-xs">{{ deck.rating_count ? deck.rating.toFixed(1) : "—" }}</span>
        </span>
        <span class="ml-auto inline-flex items-center gap-1" title="Me gusta">
          <AppIcon name="heart" class="w-3.5 h-3.5" />{{ deck.likes }}
        </span>
        <span class="inline-flex items-center gap-1" title="Jugadores que lo copiaron">
          <AppIcon name="copy" class="w-3.5 h-3.5" />{{ deck.copies }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
