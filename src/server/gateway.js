const SUPPORTED_LANGUAGES = new Set(['fi', 'sv', 'en']);

const HANDLER_MAP = {
	default: handleDefault,
	initialization: handleInitialization,
	callback: handleCallback,
};

const URL_BASES = {
	google: 'https://accounts.google.com/o/oauth2/v2/auth',
	microsoft: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
	apple: '',
};

const CLIENT_IDS = {
	google: async (env) => {
		return await env.GOOGLE_CLIENT_ID.get();
	},
	microsoft: async (env) => {
		return await env.AZURE_CLIENT_ID.get();
	},
	apple: async (env) => {},
};

const CLIENT_SECRETS = {
	google: async (env) => await env.GOOGLE_CLIENT_SECRET.get(),
	microsoft: async (env) => await env.AZURE_CLIENT_SECRET.get(),
	apple: async (env) => {},
};

const PROVIDER_POLICY = {
	google: (claims) => ({
		ok: claims.email_verified === true && typeof claims.email === 'string' /* && claims.hd === 'vorte.app' */,
		email: claims.email || null,
	}),
	microsoft: (claims, tid) => ({
		ok: claims.tid === tid && typeof claims.email === 'string',
		email: claims.email || null,
	}),
	apple: (claims) => {},
};

import { template } from './utilities/template.js';
import { handleDefault } from './handlers/handleDefault.js';
import { handleInitialization } from './handlers/handleInitialization.js';
import { handleCallback } from './handlers/handleCallback.js';

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
					if (SUPPORTED_LANGUAGES.has(url[0])) return url[0];
					if (cookies['lang']) return cookies['lang'];
					if (!header) return 'en';
					for (const part of header.split(',')) {
						const tag = part.trim().split(';', 1)[0].split('-', 1)[0];
						if (SUPPORTED_LANGUAGES.has(tag)) return tag;
					}
					return 'en';
				})(),
				env.CRYPTO_SERVICE.getNonce(),
				HANDLER_MAP[url[0]] ? HANDLER_MAP[url[0]] : HANDLER_MAP['default'],
			]);

			return await handler({
				id: nonce,
				env: env,
				ctx: ctx,
				url: url,
				lang: lang,
				params: searchParams,
				cookies: cookies,
				idpClients: {
					ids: CLIENT_IDS,
					secrets: CLIENT_SECRETS,
					policies: PROVIDER_POLICY,
					baseUrls: URL_BASES,
				},
				responseTemplate: template,
			});
		} catch (err) {
			return new Response(err);
		}
	},
};
