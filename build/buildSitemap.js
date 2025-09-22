import { writeFile } from 'fs/promises';
const content = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://auth.vorte.app/fi</loc>
		<changefreq>weekly</changefreq>
		<priority>1.0</priority>
	</url>
	<url>
		<loc>https://auth.vorte.app/sv</loc>
		<changefreq>weekly</changefreq>
		<priority>1.0</priority>
	</url>
	<url>
		<loc>https://auth.vorte.app/en</loc>
		<changefreq>weekly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>
`;

export default async function buildSitemap() {
	await writeFile(`./dist/assets/sitemap.xml`, content);
}
