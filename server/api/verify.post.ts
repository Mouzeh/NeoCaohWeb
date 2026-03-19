export default defineEventHandler(async (event) => {
  const pass = getHeader(event, "x-admin-pass");

  if (pass !== process.env.ADMIN_PASSWORD) {
    throw createError({ statusCode: 401, statusMessage: "Clave incorrecta" });
  }

  return { ok: true };
});
