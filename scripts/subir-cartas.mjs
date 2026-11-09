#!/usr/bin/env node
// Publica las cartas del juego para la web (neotcg.cl/mazos):
//   1. Exporta el catálogo desde Godot (tools/export_web_cards.gd del cliente).
//   2. Convierte cada imagen a una miniatura webp de 320 px (cwebp).
//   3. Sube las miniaturas nuevas o cambiadas a R2 → https://play.neotcg.cl/cards/<id>.webp
//   4. Escribe public/data/cards.json (nombre, set, tipo) para la web.
//
// Uso: npm run subir-cartas            (todo)
//      npm run subir-cartas -- --sin-subir   (solo catálogo + miniaturas locales)
//
// Las imágenes NO van a Fly: viven en R2 (sin costo de salida). Credenciales en .env:
// R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY.

import { execFile, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GAME = process.env.NEOTCG_CLIENT || join(homedir(), "pokemon-tcg");
const GODOT = process.env.GODOT_BIN || join(homedir(), "Downloads/Godot.app/Contents/MacOS/Godot");
const CACHE = join(homedir(), ".cache/neotcg-web-cards");
const BUCKET = "neotcg-game";
const SKIP_UPLOAD = process.argv.includes("--sin-subir");

// Nombre de carpeta del juego → nombre de la expansión en la web
const SET_NAMES = {
  BaseSet: "Base Set", Jungle: "Jungle", Fossil: "Fossil", TeamRocket: "Team Rocket",
  G1: "Gym Heroes", G1E: "Gym Heroes", G2: "Gym Challenge", G2E: "Gym Challenge",
  "Neo Genesis": "Neo Genesis", "Neo Discovery": "Neo Discovery", "Neo Revelation": "Neo Revelation",
  "Neo Destiny": "Neo Destiny", "Legendary Collection": "Legendary Collection",
  "Southern Islands": "Southern Islands", WizardsPromo: "Wizards Promo",
};

function loadEnv() {
  const p = join(ROOT, ".env");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const sh = (cmd, args) => new Promise((ok, fail) => execFile(cmd, args, (e) => (e ? fail(e) : ok())));
async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) await fn(items[i++]); }));
}

loadEnv();
mkdirSync(join(CACHE, "webp"), { recursive: true });

// 1. Catálogo desde Godot
const exportJson = join(CACHE, "web_cards.json");
console.log("📇 Exportando catálogo desde Godot…");
execFileSync(GODOT, ["--headless", "--path", GAME, "-s", "tools/export_web_cards.gd", "--", exportJson], { stdio: "ignore" });
const cards = JSON.parse(readFileSync(exportJson, "utf8"));
const ids = Object.keys(cards);
console.log(`   ${ids.length} cartas`);

// 2. Miniaturas (solo las que cambiaron: hash del archivo original)
const hashesPath = join(CACHE, "hashes.json");
const hashes = existsSync(hashesPath) ? JSON.parse(readFileSync(hashesPath, "utf8")) : {};
const uploadedPath = join(CACHE, "uploaded.json");
const uploaded = existsSync(uploadedPath) ? JSON.parse(readFileSync(uploadedPath, "utf8")) : {};
const changed = [];
await pool(ids, 8, async (id) => {
  const src = cards[id].src;
  if (!src) return;
  const h = createHash("sha1").update(readFileSync(src)).digest("hex");
  const out = join(CACHE, "webp", `${id}.webp`);
  if (hashes[id] !== h || !existsSync(out)) {
    await sh("cwebp", ["-quiet", "-q", "80", "-resize", "320", "0", src, "-o", out]);
    hashes[id] = h;
  }
  if (uploaded[id] !== h) changed.push(id);
});
writeFileSync(hashesPath, JSON.stringify(hashes));
console.log(`🖼  Miniaturas listas; ${changed.length} por subir`);

// 3. Subida a R2
if (!SKIP_UPLOAD && changed.length) {
  const { R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
  if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    console.error("Faltan R2_ENDPOINT / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY en .env");
    process.exit(1);
  }
  const s3 = new S3Client({
    region: "auto", endpoint: R2_ENDPOINT,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });
  let done = 0, fails = 0;
  await pool(changed, 8, async (id) => {
    try {
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET, Key: `cards/${id}.webp`, ContentType: "image/webp",
        Body: readFileSync(join(CACHE, "webp", `${id}.webp`)),
        // Si cambia la imagen el catálogo trae otra versión (?v=): se puede cachear mucho
        CacheControl: "public, max-age=31536000, immutable",
      }));
      uploaded[id] = hashes[id];
    } catch (e) {
      fails++;
      console.error(`   ✗ ${id}: ${e.message}`);
    }
    if (++done % 100 === 0) console.log(`   ${done}/${changed.length}`);
  });
  writeFileSync(uploadedPath, JSON.stringify(uploaded));
  console.log(`☁️  Subidas ${done - fails}, fallos ${fails}`);
  if (fails) process.exit(1);
}

// 4. Catálogo para la web: id → [nombre, set, tipo, tipo de energía, subtipo, fase, versión de imagen]
const catalog = {};
for (const id of ids) {
  const c = cards[id];
  catalog[id] = [c.name, SET_NAMES[c.set] || "Promo", c.type, c.ptype || "", c.subtype || "", c.stage || 0,
    (hashes[id] || "").slice(0, 8)];
}
mkdirSync(join(ROOT, "public/data"), { recursive: true });
writeFileSync(join(ROOT, "public/data/cards.json"), JSON.stringify(catalog));
console.log("✅ public/data/cards.json actualizado. Haz commit y push para publicar la web.");
