import { Redis } from "@upstash/redis";

export default defineEventHandler(async () => {
  const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });

  const data = await redis.get("neocaoh_blog");
  // Retornamos un arreglo vacío si no hay posts aún
  return data || [];
});
