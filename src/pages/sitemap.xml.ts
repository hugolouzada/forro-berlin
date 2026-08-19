import type { APIRoute } from 'astro';

// Hand-rolled rather than pulling in @astrojs/sitemap, so the route list and
// its priorities stay explicit. Keep in sync when adding a page.
const ROUTES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'atopia/', priority: '0.9', changefreq: 'monthly' },
  { path: 'calendar/', priority: '0.9', changefreq: 'daily' },
  { path: 'volunteer/', priority: '0.5', changefreq: 'monthly' },
  { path: 'external-links/', priority: '0.5', changefreq: 'monthly' },
  { path: 'our-events/', priority: '0.8', changefreq: 'weekly' },
  { path: 'our-events/forro-da-lua/', priority: '0.6', changefreq: 'monthly' },
  { path: 'about/', priority: '0.7', changefreq: 'monthly' },
  { path: 'faq/', priority: '0.7', changefreq: 'monthly' },
  { path: 'imprint/', priority: '0.3', changefreq: 'yearly' },
];

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const origin = (site ?? new URL('https://hugolouzada.github.io')).origin;
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = ROUTES.map(
    r => `  <url>
    <loc>${origin}${base}/${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
