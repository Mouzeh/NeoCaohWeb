import { Redis } from "@upstash/redis";

export default defineEventHandler(async (event) => {
  // 1. Verificamos la contraseña en los headers
  const pass = getHeader(event, "x-admin-pass");
  if (pass !== process.env.ADMIN_PASSWORD) {
    throw createError({
      statusCode: 401,
      statusMessage:
        "Acceso denegado: Credenciales de administrador inválidas.",
    });
  }

  // 2. Si la clave es correcta, procedemos a guardar
  const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });

  const body = await readBody(event);
  await redis.set("neocaoh_blog", body);
  return { success: true };
});
