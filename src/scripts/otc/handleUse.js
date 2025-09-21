export async function handleUse() {
	// 1) Laskuri (pidä yksinkertaisena)
	{
		const counter = document.getElementById('counter');
		if (counter) {
			const interval = setInterval(() => {
				if (counter.textContent > 0) counter.textContent--;
				else clearInterval(interval);
			}, 1000);
		}
	}

	// 2) OTC-kenttien navigointi + pasting (Ctrl/Cmd+V, hiiren keski, mobiili long-press)
	{
		const inputs = [...document.querySelectorAll('#digitInput input')];
		if (!inputs.length) return;

		const focusAt = (i) => {
			if (i >= 0 && i < inputs.length) inputs[i].focus();
		};

		const maybeSubmit = () => {
			const code = inputs.map((i) => i.value).join('');
			if (code.length === inputs.length) {
				const url = new URL('/callback', location.origin);
				url.searchParams.set('via', 'otc');
				url.searchParams.set('code', code);
				const sp = new URLSearchParams(location.search);
				const email = sp.get('email_address');
				if (email) url.searchParams.set('email_address', email);
				location.assign(url.toString());
			}
		};

		// Täyttöapu: syötä merkkijono → kaikki 8 kenttää
		const fillFrom = (raw) => {
			const digits = String(raw).replace(/\D/g, '').slice(0, inputs.length);
			if (digits.length !== inputs.length) return false;
			for (let i = 0; i < inputs.length; i++) inputs[i].value = digits[i];
			focusAt(inputs.length - 1);
			maybeSubmit();
			return true;
		};

		// Fokusoidaan ensimmäiseen tyhjään kenttään
		(inputs.find((i) => !i.value) ?? inputs[0]).focus();

		// Container-paste: toimii Ctrl/Cmd+V, hiiren keski, mobiilin "Liitä"
		const container = document.querySelector('#digitInput');
		container.addEventListener('paste', (e) => {
			const text = e.clipboardData?.getData('text') ?? '';
			if (fillFrom(text)) e.preventDefault(); // estä roiske yksittäisiin inputteihin
		});

		// Per-input logiikka
		inputs.forEach((input, index) => {
			input.addEventListener('input', (e) => {
				let v = e.target.value;

				// Jos käyttäjä liittää useamman merkin suoraan tähän kenttään, yritä täyttää kaikki
				if (v && v.length > 1) {
					if (fillFrom(v)) return;
					// muuten pidä vain viimeinen numero tästä kentästä
					v = v.replace(/\D/g, '');
					e.target.value = v ? v.slice(-1) : '';
				} else {
					// Yksittäisen merkin syöttö: salli vain [0-9]
					e.target.value = (v.match(/\d/) || [''])[0] ?? '';
				}

				// Siirry eteenpäin jos kenttä täynnä
				if (e.target.value && index < inputs.length - 1) focusAt(index + 1);
			});

			input.addEventListener('keydown', (e) => {
				if (e.key === 'Backspace') {
					if (input.value) {
						input.value = '';
					} else if (index > 0) {
						focusAt(index - 1);
						inputs[index - 1].value = '';
						e.preventDefault();
					}
				}
				if (e.key === 'ArrowLeft') focusAt(index - 1);
				if (e.key === 'ArrowRight') focusAt(index + 1);
			});
		});

		// Kun viimeinen täyttyy -> redirect
		inputs[inputs.length - 1].addEventListener('input', maybeSubmit);
	}
}
