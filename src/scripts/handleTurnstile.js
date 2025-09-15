async function waitForTurnstile(interval = 100, timeout = 5000) {
	const start = performance.now();
	let ts;

	do {
		ts = globalThis.turnstile;
		if (ts) return ts;

		if (performance.now() - start > timeout) {
			throw new Error('Turnstile ei latautunut ajoissa');
		}

		await new Promise((res) => setTimeout(res, interval));
	} while (!ts);
}

await waitForTurnstile();

const turnstileIndicatorElement = document.body.querySelector('#turnstile #indicator');

let widgetId;
widgetId = turnstile.render('#turnstile-container', {
	sitekey: '0x4AAAAAABfpGcyoBCK_N8CO',
	size: 'flexible',
	callback() {
		btns.forEach((btn) => {
			btn.disabled = false;
		});
	},
	'expired-callback'() {
		if (widgetId) {
			turnstile.reset(widgetId);
		}
		document.querySelectorAll('button').forEach((btn) => {
			btn.disabled = true;
		});
	},
});

let token = '';
if (typeof turnstile !== 'undefined' && widgetId) {
	token = turnstile.getResponse(widgetId);
}

const juu = `
	<input type="checkbox" name="" id="is-human" />
	<label for="is-human">Vahvista, että olet ihminen</label>
`;

let url = `/services/authn/sign_in/init/${method}/${provider}?token=${token}`;
