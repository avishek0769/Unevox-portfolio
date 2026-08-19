import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

// Configure __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SANITY_PROJECT_ID = 'h4amthal';
const domain = 'https://unevox.com';

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2026-08-11',
  useCdn: false, // Turn off CDN for the sitemap generator to ensure we get the latest data
});

async function generateSitemap() {
  console.log('Generating sitemap...');
  const today = new Date().toISOString().split('T')[0];

  // 1. Define static URLs
  const staticUrls = [
    { loc: `${domain}/`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${domain}/about`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${domain}/services`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${domain}/portfolio`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${domain}/achievements`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${domain}/blogs`, changefreq: 'weekly', priority: '0.8' },
  ];

  let dynamicUrls = [];

  // 2. Fetch blog posts from Sanity
  try {
    const blogs = await client.fetch(`*[_type == "blog"]{ "slug": slug.current, _updatedAt }`);
    console.log(`Fetched ${blogs.length} blog posts from Sanity.`);
    
    dynamicUrls = blogs.map(blog => {
      const lastmod = blog._updatedAt ? blog._updatedAt.split('T')[0] : today;
      return {
        loc: `${domain}/blogs/${blog.slug}`,
        lastmod,
        changefreq: 'weekly',
        priority: '0.7',
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts from Sanity:', error);
  }

  // 3. Build XML structure
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static URLs
  for (const url of staticUrls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  // Add dynamic blog URLs
  for (const url of dynamicUrls) {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // 4. Write to public/sitemap.xml and dist/sitemap.xml (if dist exists)
  const publicPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');
  console.log(`Successfully wrote sitemap to ${publicPath}`);

  const distPath = path.join(__dirname, '../dist/sitemap.xml');
  const distDir = path.join(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(distPath, xml, 'utf8');
    console.log(`Successfully wrote sitemap to ${distPath}`);
  }
}

generateSitemap().catch(err => {
  console.error('Fatal error generating sitemap:', err);
  process.exit(1);
});
