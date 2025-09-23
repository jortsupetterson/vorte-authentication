const ALLOWED_REDIRECT_ORIGINS = new Set(['https://vorte.app', 'https://why.vorte.app', 'https://pay.vorte.app', 'https://dev.vorte.app']);
export async function createUserSession({
	env,
	ctx,
	verifiedEmail,
	vorteSecret,
	redirectUrl, // esim. cookies.REDIRECT_ME_TO tai fallback
	oldSaltId,
}) {
	// 1) Pseudonyymi aliaksen indeksi (deterministinen HMAC)
	const pseudonymousIndex = await env.CRYPTO_SERVICE.getHashBasedMessageAuthenticationCode(
		verifiedEmail,
		await env.ALIAS_SECRET.get(),
		16,
		'v0-authn-callback'
	);

	// 2) Hae olemassa oleva käyttäjä
	let user_id = '';
	const row = await env.AUTHN_D1.prepare(`SELECT user_id FROM identifiers WHERE alias = ? LIMIT 1`).bind(pseudonymousIndex).first();

	if (row && row.user_id) {
		user_id = row.user_id;
	} else {
		// 3) Luo käyttäjä + tenanssi
		user_id = crypto.randomUUID();

		ctx.waitUntil(env.DATA_SERVICE.createTenancy(user_id));

		// Tallenna alias ↔ user_id
		await env.AUTHN_D1.prepare(`INSERT INTO identifiers (alias, user_id) VALUES (?, ?)`).bind(pseudonymousIndex, user_id).run();
	}

	// 4) Valmistele AUTHORIZATION-cookie (user_id;vorteSecret salattuna)
	const encryptedCookie = await env.CRYPTO_SERVICE.encryptPayload(`${user_id};${vorteSecret}`);

	// 5) Kirjaa itse sessioindeksit KV:hen (taustalla)
	ctx.waitUntil(env.CRYPTO_SALT_KV.delete(oldSaltId));

	// 6) Koosta turvalliset cookie-asetukset
	const cookieAttrs = [
		'Path=/',
		'HttpOnly',
		'Secure',
		'SameSite=Strict', // authorization-cookie ei vuoda kolmannen osapuolen konteksteihin
		'Domain=.vorte.app',
	];

	const hasAccountAttrs = [
		'Path=/',
		'Secure',
		'SameSite=Lax',
		'Max-Age=315360000', // ~10 vuotta
	];

	// 7) Redirect
	let location = 'https://vorte.app';
	if (redirectUrl && typeof redirectUrl === 'string' && redirectUrl.startsWith('https://')) {
		const u = new URL(redirectUrl);
		if (ALLOWED_REDIRECT_ORIGINS.has(u.origin)) {
			location = u.toString();
		}
	}

	// 8) Palauta vastaus
	const headers = new Headers();
	headers.append('Location', location);
	headers.append('Content-Type', 'application/json');

	// Tyhjennä mahdollinen aiempi verifier
	headers.append('Set-Cookie', `AUTHN_VERIFIER=; ${cookieAttrs.filter((s) => s !== 'SameSite=Strict').join('; ')}; Max-Age=0`);
	// Client-UI vihje: on tili (ei välttämättä HttpOnly)
	headers.append('Set-Cookie', `HAS_ACCOUNT=true; ${hasAccountAttrs.join('; ')}`);
	// Varsinainen authorisaatio
	headers.append('Set-Cookie', `AUTHORIZATION=${encryptedCookie}; ${cookieAttrs.join('; ')}; Max-Age=86400`);

	return new Response(null, { status: 302, headers });
}
