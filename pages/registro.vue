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
  <div class="bg-night text-white min-h-screen">
    <PageHero
      sub="Cuenta"
      big="join"
      :title="['Crea tu', 'cuenta']"
      description="Una sola cuenta para la web, PC y Android. Si ya juegas, entra con el mismo usuario."
    />

    <section class="px-4 md:px-[6vw] pt-16 pb-28">
      <div class="max-w-[560px] mx-auto rounded-[28px] bg-paper text-night p-7 md:p-10">
        <!-- 1. Datos -->
        <template v-if="step === 'form'">
          <h2 class="font-display font-black italic uppercase text-4xl leading-none">Nuevo entrenador</h2>
          <p class="mt-3 text-night/60">Recibirás un código en tu correo para confirmar la cuenta.</p>

          <form class="mt-8 space-y-5" @submit.prevent="submitForm">
            <label class="block">
              <span class="auth-label">Nombre de entrenador</span>
              <input
                v-model="form.username"
                type="text"
                required
                minlength="3"
                maxlength="20"
                autocomplete="username"
                class="auth-field"
                placeholder="Así te verán en el juego"
              />
            </label>
            <label class="block">
              <span class="auth-label">Correo</span>
              <input v-model="form.email" type="email" required autocomplete="email" class="auth-field" placeholder="tu@email.com" />
            </label>
            <div class="grid sm:grid-cols-2 gap-5">
              <label class="block">
                <span class="auth-label">Contraseña</span>
                <input v-model="form.password" type="password" required minlength="4" autocomplete="new-password" class="auth-field" />
              </label>
              <label class="block">
                <span class="auth-label">Repetir contraseña</span>
                <input v-model="form.confirm" type="password" required minlength="4" autocomplete="new-password" class="auth-field" />
              </label>
            </div>

            <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>

            <button type="submit" class="btn-dark w-full" :disabled="loading">
              {{ loading ? "Enviando código…" : "Crear cuenta" }}
            </button>
            <p class="text-sm text-night/60 text-center">
              ¿Ya tienes cuenta? <NuxtLink to="/entrar" class="auth-link">Entrar</NuxtLink>
            </p>
            <p class="text-xs text-night/45 text-center">
              Al registrarte aceptas los <NuxtLink to="/terminos" class="underline">términos de uso</NuxtLink>.
            </p>
          </form>
        </template>

        <!-- 2. Código -->
        <template v-else-if="step === 'code'">
          <h2 class="font-display font-black italic uppercase text-4xl leading-none">Revisa tu correo</h2>
          <p class="mt-3 text-night/60">
            Enviamos un código de 6 dígitos a <strong class="text-night">{{ form.email }}</strong>. Expira en 10 minutos.
            Si no llega, mira en spam.
          </p>

          <form class="mt-8 space-y-5" @submit.prevent="submitCode">
            <label class="block">
              <span class="auth-label">Código</span>
              <input
                v-model="code"
                type="text"
                inputmode="numeric"
                pattern="[0-9]{6}"
                maxlength="6"
                required
                autocomplete="one-time-code"
                class="auth-field text-center font-mono text-3xl tracking-[0.5em]"
                placeholder="000000"
              />
            </label>

            <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
            <p v-if="info" class="flex items-center gap-2 text-sm text-night/70"><AppIcon name="check" class="w-4 h-4 text-indigo" />{{ info }}</p>

            <button type="submit" class="btn-dark w-full" :disabled="loading || code.length < 6">
              {{ loading ? "Verificando…" : "Confirmar" }}
            </button>
            <div class="flex flex-wrap justify-between gap-3">
              <button type="button" class="auth-link" @click="step = 'form'; error = ''">← Cambiar datos</button>
              <button type="button" class="auth-link disabled:opacity-40 disabled:no-underline" :disabled="loading || cooldown > 0" @click="resend">
                {{ cooldown > 0 ? `Reenviar (${cooldown}s)` : "Reenviar código" }}
              </button>
            </div>
          </form>
        </template>

        <!-- 3. Listo -->
        <template v-else>
          <span class="w-14 h-14 rounded-full bg-aqua grid place-items-center"><AppIcon name="check" class="w-7 h-7" /></span>
          <h2 class="mt-6 font-display font-black italic uppercase text-4xl leading-none">
            ¡Bienvenido, {{ account.player.value?.username }}!
          </h2>
          <p class="mt-3 text-night/60">
            Tu cuenta está lista y ya tienes tu mazo inicial. Entra al juego con este mismo usuario y contraseña.
          </p>
          <div class="mt-8 grid sm:grid-cols-2 gap-3">
            <NuxtLink to="/play" class="btn-dark w-full"><AppIcon name="play" class="w-4 h-4" /> Jugar en web</NuxtLink>
            <NuxtLink to="/descargar" class="btn-outline-dark w-full">Descargar</NuxtLink>
          </div>
          <p class="mt-6 text-center"><NuxtLink to="/cuenta" class="auth-link">Ver mi cuenta</NuxtLink></p>
        </template>
      </div>
    </section>
  </div>
</template>
