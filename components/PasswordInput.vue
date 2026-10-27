<script setup lang="ts">
// Campo de contraseña con botón para mostrarla u ocultarla.
// Los atributos (id, autocomplete, minlength…) van directo al <input>.
defineOptions({ inheritAttrs: false });
const model = defineModel<string>({ required: true });
const visible = ref(false);
</script>

<template>
  <div class="relative">
    <input v-model="model" :type="visible ? 'text' : 'password'" v-bind="$attrs" class="auth-field pr-12" />
    <button
      type="button"
      class="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-lg text-white/45 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
      :aria-label="visible ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      :aria-pressed="visible"
      @click="visible = !visible"
    >
      <AppIcon :name="visible ? 'eye-off' : 'eye'" class="w-5 h-5" />
    </button>
  </div>
</template>
