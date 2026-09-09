import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL, siteURL: URL) => `
User-agent: *
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=yes

Agentmap: ${new URL('.well-known/ai-catalog.json', siteURL).href}
Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL, site!));
};