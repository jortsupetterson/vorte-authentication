export async function handleInitialization(req) {
	const [eightDigits, secret] = await Promise.all([req.env.CRYPTO_SERVICE.getEightDigits(), req.env.VORTE_SERVER_SECRET.get()]);
	const [state, PKCE] = await Promise.all([
		env.CRYPTO_SERVICE.getCryptographicState(eightDigits, secret),
		env.CRYPTO_SERVICE.getProofKeyForCodeExchange(),
	]);
	if (searchParams.has('email_address')) {
	}
}
