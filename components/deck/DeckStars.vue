<script setup lang="ts">
// Estrellas de valoración. Con `editable` se puede elegir (1–5).
const props = withDefaults(defineProps<{ value: number; editable?: boolean; size?: string }>(), {
  editable: false,
  size: "w-4 h-4",
});
const emit = defineEmits<{ (e: "update:value", v: number): void }>();
const hover = ref(0);
const shown = computed(() => hover.value || props.value);
</script>

<template>
  <span
    class="inline-flex items-center gap-0.5"
    :role="editable ? 'radiogroup' : 'img'"
    :aria-label="editable ? 'Valoración' : `${value.toFixed(1)} de 5 estrellas`"
    @mouseleave="hover = 0"
  >
    <template v-for="i in 5" :key="i">
      <button
        v-if="editable"
        type="button"
        role="radio"
        :aria-checked="value === i"
        :aria-label="`${i} estrella${i > 1 ? 's' : ''}`"
        class="p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
        @mouseenter="hover = i"
        @click="emit('update:value', i)"
      >
        <AppIcon name="star" :class="[size, i <= shown ? 'text-[#FFC94A] fill-current' : 'text-white/25']" />
      </button>
      <span v-else class="relative inline-block" :class="size">
        <AppIcon name="star" :class="[size, 'absolute inset-0 text-white/20']" />
        <span class="absolute inset-0 overflow-hidden" :style="{ width: `${Math.max(0, Math.min(1, shown - i + 1)) * 100}%` }">
          <AppIcon name="star" :class="[size, 'text-[#FFC94A] fill-current']" />
        </span>
      </span>
    </template>
  </span>
</template>
