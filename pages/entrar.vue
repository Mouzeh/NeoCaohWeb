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
  <AuthShell
    big="login"
    :title="['Entra a tu', 'cuenta']"
    description="Usa el mismo nombre de entrenador y contraseña que en el juego."
    :cards="[
      '/frames/cartas/ampharos-neo-genesis-es-1.jpg',
      '/frames/cartas/typhlosion-neo-genesis-es-18.jpg',
      '/frames/cartas/feraligatr-neo-genesis-es-4.jpg',
    ]"
  >
    <!-- Login -->
    <template v-if="step === 'login'">
      <h2 class="auth-title">Entrar</h2>
      <p class="auth-lead">
        ¿Primera vez? <NuxtLink to="/registro" class="auth-link">Crea una cuenta gratis</NuxtLink>
      </p>
      <form class="mt-8 space-y-5" @submit.prevent="submitLogin">
        <div>
          <label for="login-user" class="auth-label">Nombre de entrenador</label>
          <input id="login-user" v-model="username" type="text" required autocomplete="username" class="auth-field" />
        </div>
        <div>
          <div class="flex items-baseline justify-between gap-3 mb-2">
            <label for="login-pass" class="auth-label !mb-0">Contraseña</label>
            <button type="button" class="auth-link" @click="go('forgot')">¿La olvidaste?</button>
          </div>
          <PasswordInput id="login-pass" v-model="password" required autocomplete="current-password" />
        </div>

        <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
        <p v-if="info" class="auth-info" role="status"><AppIcon name="check" class="w-4 h-4 mt-0.5 shrink-0" />{{ info }}</p>

        <button type="submit" class="btn-primary w-full !mt-7" :disabled="loading">{{ loading ? "Entrando…" : "Entrar" }}</button>
      </form>
    </template>

    <!-- Pedir código -->
    <template v-else-if="step === 'forgot'">
      <button type="button" class="auth-back" @click="go('login')"><AppIcon name="arrow-left" class="w-4 h-4" />Volver a entrar</button>
      <h2 class="auth-title">Recuperar contraseña</h2>
      <p class="auth-lead">Escribe el correo de tu cuenta y te enviaremos un código de 6 dígitos.</p>
      <form class="mt-8 space-y-5" @submit.prevent="submitForgot">
        <div>
          <label for="forgot-email" class="auth-label">Correo</label>
          <input id="forgot-email" v-model="email" type="email" required autocomplete="email" class="auth-field" placeholder="tu@email.com" />
        </div>
        <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
        <button type="submit" class="btn-primary w-full !mt-7" :disabled="loading">{{ loading ? "Enviando…" : "Enviar código" }}</button>
      </form>
    </template>

    <!-- Código + nueva contraseña -->
    <template v-else>
      <button type="button" class="auth-back" @click="go('forgot')"><AppIcon name="arrow-left" class="w-4 h-4" />Pedir otro código</button>
      <h2 class="auth-title">Nueva contraseña</h2>
      <p class="auth-lead">Código enviado a <strong class="text-white font-medium">{{ email }}</strong>. Expira en 10 minutos.</p>
      <form class="mt-8 space-y-5" @submit.prevent="submitReset">
        <p v-if="info" class="auth-info" role="status"><AppIcon name="mail" class="w-4 h-4 mt-0.5 shrink-0" />{{ info }}</p>
        <div>
          <label for="reset-code" class="auth-label">Código</label>
          <input
            id="reset-code"
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
        <div>
          <label for="reset-pass" class="auth-label">Nueva contraseña</label>
          <PasswordInput id="reset-pass" v-model="newPassword" required minlength="4" autocomplete="new-password" />
          <p class="mt-2 text-xs text-white/45">Mínimo 4 caracteres.</p>
        </div>
        <p v-if="error" class="auth-error" role="alert"><AppIcon name="alert" class="w-4 h-4 mt-0.5 shrink-0" />{{ error }}</p>
        <button type="submit" class="btn-primary w-full !mt-7" :disabled="loading">{{ loading ? "Guardando…" : "Cambiar contraseña" }}</button>
      </form>
    </template>
  </AuthShell>
</template>
