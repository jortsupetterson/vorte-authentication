export function renderOneTimeCode(lang, email) {
	return `
    <form aria-labelledby="auth-title">
			<header>
				<h1 id="auth-title">
				${
					{
						fi: 'Vahvista oikeutesi käyttää tätä sähköpostia',
						sv: 'Bekräfta att du har rätt att använda denna e-postadress',
						en: 'Confirm that you have the right to use this email address',
					}[lang]
				}
				</h1>
			</header>
			<main>
				<p>Lähetimme 8-numeroisen koodin osoitteeseen <strong>${email}</strong></p>
				<div id="digitInput">
				${(() => {
					let content = '';
					for (let i = 0; i < 8; i++) {
						content = content + `<input type="text" maxlength="1" inputmode="numeric"/>`;
					}
					return content;
				})()}
				</div>
			</main>
			<footer>
				<section id="greeting">
					<figure>
						<img
							src="/V£RSION/images/gatekeeping.svg"
							alt="Vor, Vorten maskotti vahvistamassa kuka yrittää kirjautua!"
							width="300"
							height="200"
							decoding="async"
							fetchpriority="high"
							loading="eager"
						/>
					</figure>
				</section>
				<section id="other" aria-label="juu">
						<p><strong>Lähetä koodi uudelleen </strong><span id="counter">60</span>s</p>
						<a href="/${lang}" hreflang="${lang}">Onko sähköpostiosoite väärä?</a>
				</section>
			</footer>
		</form>
    `;
}
