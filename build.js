import { build } from 'esbuild';
import { readFile, writeFile, mkdir, rm } from 'fs/promises';
import contentMinifierPlugin from './build/contentMinifierPlugin.js';
import buildNetworkHeaders from './build/buildNetworkHeaders.js';
import buildSitemap from './build/buildSitemap.js';
const oldVersion = await readFile('./state.txt');
const newVersion = crypto.randomUUID();

async function copyDir(inDir, outDir) {
	const [{ readdir, mkdir, copyFile, readlink, symlink }, path] = await Promise.all([import('node:fs/promises'), import('node:path')]);
	const join = path.join;

	await mkdir(outDir, { recursive: true });

	const stack = [[inDir, outDir]];
	while (stack.length) {
		const [src, dst] = stack.pop();
		const entries = await readdir(src, { withFileTypes: true });

		await Promise.all(
			entries.map(async (e) => {
				const s = join(src, e.name);
				const d = join(dst, e.name);

				if (e.isDirectory()) {
					await mkdir(d, { recursive: true });
					stack.push([s, d]);
				} else if (e.isFile()) {
					await copyFile(s, d);
				} else if (e.isSymbolicLink()) {
					await symlink(await readlink(s), d);
				}
			})
		);
	}
}

async function buildStylesheet(newVersion) {
	await build({
		bundle: true,
		charset: 'utf8',
		entryPoints: ['./src/styles/style.css'],
		external: ['https://assets.vorte.app/*'],
		minify: true,
		outdir: `./dist/assets/${newVersion}`,
		platform: 'browser',
		treeShaking: true,
	});
}

async function buildEdgeApi() {
	await build({
		bundle: true,
		charset: 'utf8',
		entryPoints: ['./src/server/gateway.js'],
		external: ['cloudflare:workers'],
		minify: true,
		outdir: './dist/api',
		platform: 'neutral',
		plugins: [contentMinifierPlugin({ version: newVersion })],
		treeShaking: true,
	});
}

async function buildBrowserScripts(newVersion) {
	await build({
		bundle: true,
		charset: 'utf8',
		entryPoints: ['./src/scripts/default/events.js', './src/scripts/otc/events.js'],
		external: ['/V£RSION/*', `/${newVersion}/*`],
		minify: true,
		outdir: `./dist/assets/${newVersion}/scripts`,
		platform: 'browser',
		plugins: [contentMinifierPlugin({ version: newVersion })],
		treeShaking: true,
	});
}

try {
	await rm(`./dist/assets/${oldVersion}`, { force: true, recursive: true });
	await Promise.all([
		copyDir('./src/images', `./dist/assets/${newVersion}/images`),
		buildStylesheet(newVersion),
		buildEdgeApi(),
		buildNetworkHeaders(newVersion),
		buildBrowserScripts(newVersion),
		buildSitemap(),
	]);
	await writeFile('./state.txt', newVersion);
} catch (err) {
	await writeFile('./state.txt', newVersion);
	console.error(err);
}
