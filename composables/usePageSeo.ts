// Título, descripción y vista previa al compartir (OG/Twitter) de una página
export function usePageSeo(opts: { title: string; description: string; noindex?: boolean }) {
  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    robots: opts.noindex ? "noindex, nofollow" : undefined,
  });
}
