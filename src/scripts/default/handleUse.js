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

async function handleUse() {
	await waitForTurnstile();

	const btns = document.querySelectorAll('button');
	const indicator = document.getElementById('indicator');

	const couldNotVerify = `
	<input type="checkbox" name="" id="is-human" />
	<label for="is-human">Vahvista, että olet ihminen</label>
`;

	const couldVerify = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z"/></svg>
    Onnistui
`;

	const verifying = `
    <svg class="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z"/></svg>
	Tarkistetaan...
`;

	let widgetId;
	let turnstileToken = '';

	widgetId = turnstile.render('#turnstile-container', {
		sitekey: '0x4AAAAAABfpGcyoBCK_N8CO',
		size: 'flexible',
		callback(cbToken) {
			turnstileToken = cbToken || '';
			indicator.innerHTML = couldVerify;
			btns.forEach((btn) => (btn.disabled = false));
		},

		'expired-callback'() {
			turnstileToken = '';
			indicator.innerHTML = couldNotVerify;
			if (widgetId) turnstile.reset(widgetId);
			btns.forEach((btn) => (btn.disabled = true));
		},

		'error-callback'() {
			turnstileToken = '';
			indicator.innerHTML = 'Virhe tarkistuksessa';
			btns.forEach((btn) => (btn.disabled = true));
		},

		'timeout-callback'() {
			turnstileToken = '';
			indicator.innerHTML = 'Aikakatkaisu yritä uudelleen';
			btns.forEach((btn) => (btn.disabled = true));
		},

		'unsupported-callback'() {
			turnstileToken = '';
			indicator.innerHTML = 'selaimesi ei tue turentileä';
			btns.forEach((btn) => (btn.disabled = true));
		},
	});

	if (typeof turnstile !== 'undefined' && widgetId) {
		const immediate = turnstile.getResponse(widgetId);
		if (immediate) {
			turnstileToken = immediate;
			indicator.innerHTML = couldVerify;
			btns.forEach((btn) => (btn.disabled = false));
		}
	}

	document.addEventListener('click', (event) => {
		const btn = event.target.closest('button');
		if (!btn || !turnstileToken) return;

		const url = new URL('/initialization', window.location.origin);
		url.searchParams.set('via', btn.id);
		url.searchParams.set('token', turnstileToken);

		const emailEl = document.getElementById('email_address');
		const email = emailEl?.value.trim();
		if (email) url.searchParams.set('email_address', email);

		window.location.assign(url.toString());
	});
}

export { handleUse };
