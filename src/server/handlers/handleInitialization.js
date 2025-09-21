export const CLIENT_IDS = {
	google: async (env) => {
		return await env.GOOGLE_CLIENT_ID.get();
	},
	microsoft: async (env) => {
		return await env.AZURE_CLIENT_ID.get();
	},
	apple: async (env) => {},
};
const URL_BASES = {
	google: 'https://accounts.google.com/o/oauth2/v2/auth',
	microsoft: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
	apple: '',
};

import { renderOneTimeCode } from '../views/oneTimeCode.js';
import { renderVerificationEmail } from '../e-mails/verificationEmail.js';
export async function handleInitialization({ env, ctx, params, lang, id, responseTemplate }) {
	const token = params.get('token');
	if (!token) return new Response(null, { status: 400 });

	const [cfSecret, eightDigits, vorteSecret, pkce, now] = await Promise.all([
		env.TURNSTILE_SECRET.get(),
		env.CRYPTO_SERVICE.getEightDigits(),
		env.VORTE_SERVER_SECRET.get(),
		env.CRYPTO_SERVICE.getProofKeyForCodeExchange(),
		Promise.resolve(Date.now()),
	]);

	if (!cfSecret) return new Response(null, { status: 400 });

	// Cloudflare Turnstile verification
	const cfParams = new URLSearchParams();
	cfParams.append('secret', cfSecret);
	cfParams.append('response', token);

	const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: cfParams,
	});

	const cfVerification = await cfRes.json();
	if (!cfVerification || cfVerification.success !== true) {
		const h = new Headers();
		h.append('Set-Cookie', 'AUTHN_CHALLENGE=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
		return new Response(null, { status: 400, headers: h });
	}

	// Derive state and encrypted challenge
	const state = await env.CRYPTO_SERVICE.getCryptographicState(eightDigits, vorteSecret);
	const AUTHN_CHALLENGE = await env.CRYPTO_SERVICE.encryptPayload(`${state};${pkce.verifier};${now};${vorteSecret}`);

	// Persist PKCE challenge keyed by state (300s TTL) without blocking response
	ctx.waitUntil(env.AUTHN_SESSIONS_KV.put(state, pkce.challenge, { expirationTtl: 300 }));

	//Response options
	const headers = await responseTemplate.headers(lang, id);
	headers.append('Set-Cookie', `AUTHN_CHALLENGE=${AUTHN_CHALLENGE}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=300`);

	//OTC
	const email = params.get('email_address');
	if (email) {
		await env.COMMUNICATIONS_SERVICE.sendEmail({
			to: email,
			subject: 'Olet tunnistautumassa palveluun Vorte',
			html: renderVerificationEmail(lang, eightDigits),
		});
		return new Response(await responseTemplate.body(lang, id, renderOneTimeCode(lang, email), 'otc'), { status: 200, headers });
	}
	//SOCIAL
	const socialPlatform = params.get('via');
	headers.append(
		'Location',
		`${URL_BASES[socialPlatform]}?client_id=${await CLIENT_IDS[socialPlatform](env)}&redirect_uri=${
			env.REDIRECT_URI
		}&response_type=code&scope&openid+email&code_challenge=${pkce.challenge}&code_challenge_method=S256&state${state}`
	);

	return new Response(null, { status: 302, headers });
}
