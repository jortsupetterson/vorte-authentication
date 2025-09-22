const allowedDuration = 300_000;
import { verifyJwkIdToken } from '../utilities/verifyJwkIdToken.js';
export async function handleCallback({ env, ctx, params, lang, id, idpClients, responseTemplate }) {
	// `${state};${PKCE.verifier};${timeStamp};${vorte_server_secret}`
	const [decryptedCookie, vorteSecret] = await Promise.all([
		env.CRYPTO_SERVICE.decryptPayload(cookies.AUTHN_CHALLENGE),
		env.VORTE_SERVER_SECRET.get(),
	]);
	const [clientState, clientPkce, inializationTime, serviceProviderSecret] = decryptedCookie.plainText.split(';');

	// If authentication duration is less than or equal to allowed duration and secrets match continue
	if (Date.now() - inializationTime <= allowedDuration || serviceProviderSecret === vorteSecret) {
		// OTC Branch
		if (params.get('via') === 'otc') {
			const stateFromCode = await env.CRYPTO_SERVICE.getHashBasedMessageAuthenticationCode(
				params.get('code'),
				vorteSecret,
				16,
				'v0-authn-state'
			);
			//If the state derived from the code sent to the email is equal to the state stored in the client continue
			if (stateFromCode === clientState) {
				const serverPkce = await env.AUTHN_SESSIONS_KV.get(stateFromCode);
				//If the servers proof key is equal to the clients proof key, create a user session
				if (env.CRYPTO_SERVICE.verifyProofKeyForCodeExchange(serverPkce, clientPkce) === true) {
					return createUserSession(params.get('email_address'));
				}
			}
		}

		// IDP Branch
		const idpState = params.get('state');
		//If the state send from the identity is equal to the state stored in the client continue
		if (idpState === clientState) {
			const serverPkce = await env.AUTHN_SESSIONS_KV.get(idpState);
			//If the servers proof key is equal to the clients proof key, continue
			if (env.CRYPTO_SERVICE.verifyProofKeyForCodeExchange(serverPkce, clientPkce) === true) {
				const idp = params.get('via');
				const clientId = await idpClients.ids[idp](env);
				const idpRes = await fetch(URL_BASES[provider], {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({
						code: params.get('code_challenge'),
						client_id: clientId,
						client_secret: await idpClients.secrets[idp](env),
						redirect_uri: env.REDIRECT_URI,
						grant_type: 'authorization_code',
						code_verifier: verifier,
					}),
				});
				if (idpRes.ok) {
					const token = await idpRes.json();
					const claims = await verifyJwkIdToken(token.id_token, clientId, idp);
					const { ok, email } =
						idp === 'microsoft'
							? idpClients.policies.microsoft(claims, await env.AZURE_TENANT_ID.get())
							: idpClients.policies.google(claims);
					if (ok && email) {
						createUserSession(email);
					}
				}
			}
		}
	}

	// If some condition fails
	ctx.waitUntil(env.CRYPTO_SALT_KV.delete(decryptedCookie.saltId));
	return new Response(null, {
		status: 400,
		headers: {
			'Set-Cookie': 'AUTHN_CHALLENGE=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0;',
		},
	});
}
