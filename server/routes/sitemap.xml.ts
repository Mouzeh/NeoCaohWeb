import { serverQueryContent } from "#content/server";
import { SITE } from "~/data/site";

// Páginas fijas + posts del blog (se actualiza solo al publicar en content/blog)
const STATIC_PAGES = ["/", "/descargar", "/cartas", "/blog", "/donar", "/contacto", "/terminos", "/cookies"];

export default defineEventHandler(async (event) => {
  const posts = await serverQueryContent(event, "blog").only(["_path", "date"]).find();

  const urls = [
    ...STATIC_PAGES.map((path) => ({ loc: SITE.url + path })),
    ...posts.map((p) => ({ loc: SITE.url + p._path, lastmod: p.date })),
  ];

  const body = urls
    .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`)
    .join("\n");

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
});
