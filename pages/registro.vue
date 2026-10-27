<script setup lang="ts">
usePageSeo({
  title: "Crear cuenta — NeoCaoh",
  description:
    "Crea tu cuenta de NeoCaoh gratis. La misma cuenta sirve para jugar en la web, en PC y en Android.",
});

const account = useAccount();

// form → code (verificación del correo) → done
const step = ref<"form" | "code" | "done">("form");
const form = ref({ username: "", email: "", password: "", confirm: "" });
const code = ref("");
const error = ref("");
const info = ref("");
const loading = ref(false);
const cooldown = ref(0);

const steps = ["Tus datos", "Confirmar correo", "Listo"];
const stepIndex = computed(() => ["form", "code", "done"].indexOf(step.value));

let timer: ReturnType<typeof setInterval> | undefined;
function startCooldown() {
  cooldown.value = 60;
  clearInterval(timer);
  timer = setInterval(() => {
    if (--cooldown.value <= 0) clearInterval(timer);
  }, 1000);
}
onBeforeUnmount(() => clearInterval(timer));

async function run(fn: () => Promise<unknown>) {
  error.value = "";
  info.value = "";
  loading.value = true;
  try {
    await fn();
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

function submitForm() {
  const f = form.value;
  if (f.username.trim().length < 3 || f.username.trim().length > 20) {
    error.value = "El nombre de entrenador debe tener entre 3 y 20 caracteres";
    return;
  }
  if (f.password.length < 4) {
    error.value = "La contraseña debe tener al menos 4 caracteres";
    return;
  }
  if (f.password !== f.confirm) {
    error.value = "Las contraseñas no coinciden";
    return;
  }
  run(async () => {
    await account.register(f.username, f.email, f.password);
    step.value = "code";
    startCooldown();
  });
}

function submitCode() {
  run(async () => {
    await account.verifyEmail(form.value.email, code.value);
    step.value = "done";
  });
}

function resend() {
  run(async () => {
    await account.resendCode(form.value.email);
    info.value = "Te enviamos un código nuevo";
    startCooldown();
  });
}
</script>

<template>
  <AuthShell
    big="join"
    :title="['Crea tu', 'cuenta']"
    description="Gratis, con mazo inicial incluido. Si ya juegas, entra con tu usuario de siempre."
    :cards="[
      '/frames/cartas/chikorita-neo-genesis-es-53.jpg',
      '/frames/cartas/cyndaquil-neo-genesis-es-56.jpg',
      '/frames/cartas/croconaw-neo-genesis-es-31.jpg',
    ]"
  >
    <!-- Progreso -->
    <ol class="grid grid-cols-3 gap-2 mb-10" aria-label="Progreso del registro">
      <li
        v-for="(label, i) in steps"
        :key="label"
        :aria-current="i === stepIndex ? 'step' : undefined"
        class="text-xs"
        :class="i <= stepIndex ? 'text-white' : 'text-white/40'"
      >
        <span
          class="block h-1 rounded-full mb-2.5 transition-colors duration-500"
          :class="i <= stepIndex ? 'bg-aqua' : 'bg-white/15'"
        />
        <span class="hidden sm:inline">Paso {{ i + 1 }}: </span>{{ label }}
      </li>
    </ol>

    <!-- 1. Datos -->
    <template v-if="step === 'form'">
      <h2 class="auth-title">Nuevo entrenador</h2>
      <p class="auth-lead">
        ¿Ya tienes cuenta? <NuxtLink to="/entrar" class="auth-link">Entrar</NuxtLink>
      </p>

      <form class="mt-8 space-y-5" @submit.prevent="submitForm">
        <div>
          <label for="reg-user" class="auth-label">Nombre de entrenador</label>
          <input
            id="reg-user"
            v-model="form.username"
            type="text"
            required
            minlength="3"
            maxlength="20"
            autocomplete="username"
            class="auth-field"
            aria-describedby="reg-user-hint"
          />
          <p id="reg-user-hint" class="mt-2 text-xs text-white/45">Así te verán los demás jugadores. Entre 3 y 20 caracteres.</p>
        </div>
        <div>
          <label for="reg-email" class="auth-label">Correo</label>
          <input id="reg-email" v-model="form.email" type="email" required autocomplete="email" class="auth-field" placeholder="tu@email.com" />
        </div>
        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label for="reg-pass" class="auth-label">Contraseña</label>
            <PasswordInput id="reg-pass" v-model="form.password" required minlength="4" autocomplete="new-password" />
          </div>
          <div>
            <label for="reg-confirm" class="auth-label">Repetir contraseña</label>
            <PasswordInput id="reg-confirm" v-model="form.confirm" required minlength="4" autocomplete="new-password" />
          </div>
        </div>

        <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>

        <button type="submit" class="btn-primary w-full !mt-7" :disabled="loading">
          {{ loading ? "Enviando código…" : "Crear cuenta" }}
        </button>
        <p class="text-xs text-white/45 text-center">
          Al crear la cuenta aceptas los <NuxtLink to="/terminos" class="underline underline-offset-2 hover:text-white">términos de uso</NuxtLink>.
        </p>
      </form>
    </template>

    <!-- 2. Código -->
    <template v-else-if="step === 'code'">
      <h2 class="auth-title">Revisa tu correo</h2>
      <p class="auth-lead">
        Enviamos un código de 6 dígitos a <strong class="text-white font-medium break-all">{{ form.email }}</strong>.
        Expira en 10 minutos; si no llega, mira en spam.
      </p>

      <form class="mt-8 space-y-5" @submit.prevent="submitCode">
        <div>
          <label for="reg-code" class="auth-label">Código</label>
          <input
            id="reg-code"
            v-model="code"
            type="text"
            inputmode="numeric"
            pattern="[0-9]{6}"
            maxlength="6"
            required
            autocomplete="one-time-code"
            class="auth-field auth-code"
            placeholder="000000"
          />
        </div>

        <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
        <p v-if="info" class="auth-info" role="status"><AppIcon name="mail" class="w-4 h-4 mt-0.5 shrink-0" />{{ info }}</p>

        <button type="submit" class="btn-primary w-full !mt-7" :disabled="loading || code.length < 6">
          {{ loading ? "Verificando…" : "Confirmar correo" }}
        </button>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <button type="button" class="auth-back !mb-0" @click="step = 'form'; error = ''">
            <AppIcon name="arrow-left" class="w-4 h-4" />Cambiar datos
          </button>
          <button
            type="button"
            class="auth-link disabled:text-white/40 disabled:no-underline disabled:cursor-not-allowed"
            :disabled="loading || cooldown > 0"
            @click="resend"
          >
            {{ cooldown > 0 ? `Reenviar en ${cooldown}s` : "Reenviar código" }}
          </button>
        </div>
      </form>
    </template>

    <!-- 3. Listo -->
    <template v-else>
      <span class="w-14 h-14 rounded-full bg-aqua text-night grid place-items-center"><AppIcon name="check" class="w-7 h-7" /></span>
      <h2 class="auth-title mt-6 break-words">¡Bienvenido, {{ account.player.value?.username }}!</h2>
      <p class="auth-lead">
        Tu cuenta está lista y ya tienes tu mazo inicial. Entra al juego con este mismo usuario y contraseña.
      </p>
      <div class="mt-8 grid sm:grid-cols-2 gap-3">
        <NuxtLink to="/play" class="btn-primary w-full"><AppIcon name="play" class="w-4 h-4" /> Jugar en web</NuxtLink>
        <NuxtLink to="/descargar" class="btn-outline w-full">Descargar</NuxtLink>
      </div>
      <p class="mt-6 text-center"><NuxtLink to="/cuenta" class="auth-link">Ver mi cuenta</NuxtLink></p>
    </template>
  </AuthShell>
</template>
