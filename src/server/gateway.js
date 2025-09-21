import { template } from './utilities/template.js';
import { handleLanding } from './handlers/handleLanding.js';
import { handleInitialization } from './handlers/handleInitialization.js';
import { handleCallback } from './handlers/handleCallback.js';

const SUPPORTED_LANGUAGES = new Set(['fi', 'sv', 'en']);

const HANDLER_MAP = {
	landing: handleLanding,
	initialization: handleInitialization,
	callback: handleCallback,
};

export default {
	async fetch(request, env, ctx) {
		try {
			const { pathname, searchParams } = new URL(request.url);
			const [url, cookies] = await Promise.all([
				pathname.split('/').filter(Boolean),
				(async () => {
					const raw = request.headers.get('cookie') || '';
					return Object.fromEntries(
						raw
							.split(';')
							.map((s) => s.trim())
							.filter(Boolean)
							.map((pair) => {
								const index = pair.indexOf('=');
								const name = decodeURIComponent(pair.substring(0, index));
								const value = decodeURIComponent(pair.substring(index + 1));
								return [name, value];
							})
					);
				})(),
			]);
			const [lang, nonce, handler] = await Promise.all([
				(async (header = request.headers.get('accept-language')) => {
					if (cookies['lang']) return cookies['lang'];
					if (SUPPORTED_LANGUAGES.has(url[0])) return url[0];
					if (!header) return 'en';
					for (const part of header.split(',')) {
						const tag = part.trim().split(';', 1)[0].split('-', 1)[0];
						if (SUPPORTED_LANGUAGES.has(tag)) return tag;
					}
					return 'en';
				})(),
				env.CRYPTO_SERVICE.getNonce(),
				HANDLER_MAP[url[0]] ? HANDLER_MAP[url[0]] : HANDLER_MAP['landing'],
			]);

			return await handler({
				id: nonce,
				env: env,
				ctx: ctx,
				url: url,
				lang: lang,
				params: searchParams,
				cookies: cookies,
				responseTemplate: template,
			});
		} catch (err) {
			return new Response(err);
		}
	},
};
