<script setup lang="ts">
usePageSeo({
  title: "Entrar — NeoCaoh",
  description: "Entra a tu cuenta de NeoCaoh con el mismo usuario que usas en el juego.",
});

const account = useAccount();
const router = useRouter();

// login | forgot (pedir código) | reset (código + nueva contraseña)
const step = ref<"login" | "forgot" | "reset">("login");
const username = ref("");
const password = ref("");
const email = ref("");
const code = ref("");
const newPassword = ref("");
const error = ref("");
const info = ref("");
const loading = ref(false);

// Con la sesión ya iniciada no tiene sentido esta página
watchEffect(() => {
  if (account.player.value && step.value === "login") router.replace("/cuenta");
});

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

function go(next: typeof step.value) {
  step.value = next;
  error.value = "";
}

const submitLogin = () => run(() => account.login(username.value, password.value));

const submitForgot = () =>
  run(async () => {
    await account.forgotPassword(email.value);
    go("reset");
    info.value = "Si el correo tiene una cuenta, te llegará un código en unos segundos";
  });

function submitReset() {
  if (newPassword.value.length < 4) {
    error.value = "La contraseña debe tener al menos 4 caracteres";
    return;
  }
  run(async () => {
    await account.resetPassword(email.value, code.value, newPassword.value);
    go("login");
    password.value = "";
    info.value = "Contraseña cambiada. Ya puedes entrar con la nueva.";
  });
}
</script>

<template>
  <div class="bg-night text-white min-h-screen">
    <PageHero
      sub="Cuenta"
      big="login"
      :title="['Entra a tu', 'cuenta']"
      description="Usa el mismo usuario y contraseña que en el juego."
    />

    <section class="px-4 md:px-[6vw] pt-16 pb-28">
      <div class="max-w-[520px] mx-auto rounded-[28px] bg-paper text-night p-7 md:p-10">
        <!-- Login -->
        <template v-if="step === 'login'">
          <h2 class="font-display font-black italic uppercase text-4xl leading-none">Entrar</h2>
          <form class="mt-8 space-y-5" @submit.prevent="submitLogin">
            <label class="block">
              <span class="auth-label">Nombre de entrenador</span>
              <input v-model="username" type="text" required autocomplete="username" class="auth-field" />
            </label>
            <label class="block">
              <span class="auth-label">Contraseña</span>
              <input v-model="password" type="password" required autocomplete="current-password" class="auth-field" />
            </label>

            <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
            <p v-if="info" class="flex items-center gap-2 text-sm text-night/70"><AppIcon name="check" class="w-4 h-4 text-indigo" />{{ info }}</p>

            <button type="submit" class="btn-dark w-full" :disabled="loading">{{ loading ? "Entrando…" : "Entrar" }}</button>
            <div class="flex flex-wrap justify-between gap-3">
              <button type="button" class="auth-link" @click="go('forgot')">¿Olvidaste tu contraseña?</button>
              <NuxtLink to="/registro" class="auth-link">Crear cuenta</NuxtLink>
            </div>
          </form>
        </template>

        <!-- Pedir código -->
        <template v-else-if="step === 'forgot'">
          <h2 class="font-display font-black italic uppercase text-4xl leading-none">Recuperar contraseña</h2>
          <p class="mt-3 text-night/60">Escribe el correo de tu cuenta y te enviaremos un código.</p>
          <form class="mt-8 space-y-5" @submit.prevent="submitForgot">
            <label class="block">
              <span class="auth-label">Correo</span>
              <input v-model="email" type="email" required autocomplete="email" class="auth-field" placeholder="tu@email.com" />
            </label>
            <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
            <button type="submit" class="btn-dark w-full" :disabled="loading">{{ loading ? "Enviando…" : "Enviar código" }}</button>
            <button type="button" class="auth-link" @click="go('login')">← Volver</button>
          </form>
        </template>

        <!-- Código + nueva contraseña -->
        <template v-else>
          <h2 class="font-display font-black italic uppercase text-4xl leading-none">Nueva contraseña</h2>
          <p class="mt-3 text-night/60">Código enviado a <strong class="text-night">{{ email }}</strong>. Expira en 10 minutos.</p>
          <form class="mt-8 space-y-5" @submit.prevent="submitReset">
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
            <label class="block">
              <span class="auth-label">Nueva contraseña</span>
              <input v-model="newPassword" type="password" required minlength="4" autocomplete="new-password" class="auth-field" />
            </label>
            <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
            <p v-if="info" class="flex items-center gap-2 text-sm text-night/70"><AppIcon name="check" class="w-4 h-4 text-indigo" />{{ info }}</p>
            <button type="submit" class="btn-dark w-full" :disabled="loading">{{ loading ? "Guardando…" : "Cambiar contraseña" }}</button>
            <button type="button" class="auth-link" @click="go('forgot')">← Pedir otro código</button>
          </form>
        </template>
      </div>
    </section>
  </div>
</template>
