import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.href ?? "https://www.parrotspeciesguide.com/";
  const species = await getCollection("species");
  const lastmod = new Date().toISOString();

  const staticPaths = ["", "es", "species", "es/species"];
  const speciesPaths = species.flatMap((entry) => [
    `species/${entry.data.slug}`,
    `es/species/${entry.data.slug}`
  ]);

  const urls = [...staticPaths, ...speciesPaths];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((path) => {
        const loc = new URL(path, baseUrl).href;
        return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
