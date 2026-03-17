import { Redis } from "@upstash/redis";

export default defineEventHandler(async (event) => {
  const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });

  const body = await readBody(event);
  await redis.set("neocaoh_blog", body);
  return { success: true };
});
