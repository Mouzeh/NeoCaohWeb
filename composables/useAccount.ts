// Cuenta de jugador compartida con el juego: la web habla con la misma API
// (caoh-tcg.fly.dev), así que una cuenta creada aquí sirve en el juego y viceversa.

export type Player = {
  id: string;
  username: string;
  avatar_id?: string;
  coins: number;
  gems?: number;
  elo: number;
  rank: string;
  tier?: string;
  bp_level: number;
  bp_xp: number;
  role?: string;
  inventory?: Record<string, number>;
  decks?: Record<string, { name: string; cards: string[] }>;
  medals?: unknown[];
};

type AuthResponse = { token: string; player: Player };

const TOKEN_KEY = "neotcg_token";

function readToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

// Convierte la respuesta de error del servidor en un mensaje para el jugador
function errorMessage(e: any): string {
  const status = e?.response?.status ?? e?.statusCode;
  const data = e?.data ?? e?.response?._data;
  if (data?.banned) {
    const until = data.banned_until
      ? `hasta el ${new Date(data.banned_until.replace(" ", "T") + "Z").toLocaleString("es-CL")}`
      : "de forma permanente";
    return `Tu cuenta está suspendida ${until}. Motivo: ${data.reason}`;
  }
  if (status === 401) return "Usuario o contraseña incorrectos";
  if (data?.error) return data.error;
  if (!status) return "No hay conexión con el servidor. Inténtalo de nuevo.";
  return "Error del servidor. Inténtalo más tarde.";
}

export function useAccount() {
  const api = useRuntimeConfig().public.gameApi as string;
  const player = useState<Player | null>("account-player", () => null);
  const ready = useState("account-ready", () => false);

  const post = <T>(path: string, body?: object, token?: string | null) =>
    $fetch<T>(`${api}/api/auth${path}`, {
      method: "POST",
      body: body ?? {},
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }).catch((e) => {
      throw new Error(errorMessage(e));
    });

  function signIn(res: AuthResponse) {
    writeToken(res.token);
    player.value = res.player;
  }

  // Restaura la sesión guardada (renueva el token y trae datos frescos)
  async function restore() {
    if (ready.value) return;
    const token = readToken();
    if (token) {
      try {
        signIn(await post<AuthResponse>("/refresh", {}, token));
      } catch {
        writeToken(null);
        player.value = null;
      }
    }
    ready.value = true;
  }

  return {
    player,
    ready,
    restore,

    async login(username: string, password: string) {
      signIn(await post<AuthResponse>("/login", { username: username.trim(), password }));
    },

    // Paso 1: envía el código al correo
    register(username: string, email: string, password: string) {
      return post("/register", { username: username.trim(), email: email.trim(), password });
    },
    // Paso 2: confirma el código; crea la cuenta y deja la sesión iniciada
    async verifyEmail(email: string, code: string) {
      signIn(await post<AuthResponse>("/verify-email", { email: email.trim(), code: code.trim() }));
    },
    resendCode(email: string) {
      return post("/resend-code", { email: email.trim() });
    },

    forgotPassword(email: string) {
      return post("/forgot-password", { email: email.trim() });
    },
    resetPassword(email: string, code: string, newPassword: string) {
      return post("/reset-password", { email: email.trim(), code: code.trim(), newPassword });
    },
    changePassword(currentPassword: string, newPassword: string) {
      return post("/change-password", { currentPassword, newPassword }, readToken());
    },

    logout() {
      writeToken(null);
      player.value = null;
    },
  };
}
