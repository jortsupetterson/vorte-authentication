export async function createUserSession(env, verifiedEmail, vorteSecret) {
	const pseudonymousIndex = await env.CRYPTO_SERVICE.getHashBasedMessageAuthenticationCode(
		verifiedEmail,
		await env.ALIAS_SECRET.get(),
		16,
		'v0-authn-callback'
	);

	let user_id = '';
	const row = await env.AUTHN_D1.prepare(
		`
			SELECT user_id FROM identifiers
			WHERE alias = ?
			`
	)
		.bind(pseudonymousIndex)
		.first();
	if (row && row.user_id) user_id = row.user_id;

	if (!user_id) {
		user_id = crypto.randomUUID();
		env.DATA_SERVICE.createTenacy(user_id);
		env.AUTHN_D1.prepare(
			`
            INSERT ?, ? INTO alias, user_id
            `
		).bind(pseudonymousIndex, user_id);
	}

	const encryptedCookie = await env.CRYPTO_SERVICE.encryptPayload(`${user_id};${vorteSecret}`);

	ctx.waitUntil(
		Promise.all([
			env.CRYPTO_SALT_KV.delete(decryptedCookie.saltId),
			env.AUTHN_KV.put(user_id, '1'),
			env.AUTHN_KV.put(pseudonymousIndex, user_id, { expirationTtl: 2_592_000 }),
		])
	);
	return {
		status: 302,
		headers: [
			['Content-Type', 'application/json'],
			['Location', cookies.REDIRECT_ME_TO ? cookies.REDIRECT_ME_TO : 'https://vorte.app'],
			['Set-Cookie', 'AUTHN_VERIFIER=; Path=/; SameSite=lax; HttpOnly; Secure;  Max-Age=0;'],
			['Set-Cookie', `HAS_ACCOUNT=true; Path=/; SameSite=lax; HttpOnly Secure; Max-Age=315360000;`],
			['Set-Cookie', `AUTHORIZATION=${encryptedCookie}; Path=/; SameSite=Lax; HttpOnly; Secure;  Max-Age=86400;`],
		],
		body: null,
	};
}
