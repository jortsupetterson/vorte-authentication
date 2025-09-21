import { renderOneTimeCode } from '../views/oneTimeCode.js';
export async function handleInitialization(req) {
	const { env, ctx, params, lang, id, responseTemplate } = req;

	const token = params.get('token');
	if (!token) return new Response(null, { status: 400 });

	// Resolve env calls in parallel
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

	const headers = new Headers();
	headers.append('Set-Cookie', `AUTHN_CHALLENGE=${AUTHN_CHALLENGE}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=300`);

	const email = params.get('email_address');
	if (email) {
		await env.COMMUNICATIONS_SERVICE.sendEmail({
			to: email,
			subject: 'TESTI',
			html: `<p>Kertakäyttökoodisi: ${eightDigits}</p>`,
		});
		headers.set('Content-Type', 'text/plain; charset=utf-8');
		return new Response(await responseTemplate.body(lang, id, renderOneTimeCode(lang)), { status: 200, headers });
	}

	// No email branch: empty 204 with cookie set
	return new Response(null, { status: 204, headers });
}
