// Restaura la sesión del jugador al abrir la web
export default defineNuxtPlugin(() => {
  useAccount().restore();
});
