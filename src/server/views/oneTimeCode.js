export function renderOneTimeCode(lang) {
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
						<figcaption>Tervetuloa Vorteen!</figcaption>
					</figure>
				</section>
				<section id="other" aria-label="Tietoturvavarmennus">
					<a hreflang="fi" href="https://why.vorte.app">tutustu siihen mitä Vorte tarjoaa</a>
					<div id="turnstile-container">
						<div id="indicator">
							<svg class="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
								<!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
								<path
									d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z"
								/>
							</svg>
							Tarkistetaan...
						</div>
						<div>
							<a href="https://www.cloudflare.com/privacypolicy/">Tietosuoja</a>
							<span></span>
							<a href="https://www.cloudflare.com/website-terms/">Käyttöehdot</a>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
								<!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
								<path
									d="M407.9 383.9L177.1 381C176.4 381 175.7 380.8 175.1 380.5C174.5 380.2 173.9 379.7 173.5 379.1C173.1 378.5 172.8 377.8 172.8 377.1C172.8 376.4 172.8 375.7 173 375C173.4 373.9 174.1 372.9 175.1 372.2C176.1 371.5 177.2 371 178.4 371L411.3 368.1C438.9 366.8 468.8 344.5 479.3 317.3L492.6 282.8C493 281.9 493.1 280.9 493.1 279.9C493.1 279.4 493 278.8 492.9 278.3C485.5 246.1 467.9 217.2 442.6 196C417.3 174.8 385.9 162.3 352.9 160.5C319.9 158.7 287.3 167.8 259.9 186.2C232.5 204.6 211.9 231.5 201.1 262.7C189.8 254.2 176.2 249.4 162.1 249C148 248.6 134.1 252.5 122.3 260.4C110.5 268.3 101.5 279.5 96.4 292.7C91.3 305.9 90.5 320.3 94 334C41.7 335.5-.2 378.1-.2 430.5C-.2 435.2 .1 439.8 .8 444.5C1 445.6 1.5 446.6 2.3 447.3C3.1 448 4.2 448.4 5.2 448.4L431.3 448.5C431.3 448.5 431.4 448.5 431.4 448.5C432.6 448.5 433.7 448.1 434.7 447.4C435.7 446.7 436.3 445.7 436.7 444.5L440 433.2C443.9 419.8 442.4 407.4 435.9 398.3C429.9 389.9 419.8 385 407.7 384.4zM513.8 285.1C511.7 285.1 509.5 285.2 507.4 285.3C506.6 285.4 505.9 285.6 505.3 286.1C504.7 286.6 504.3 287.2 504 287.9L494.9 319.1C491 332.5 492.5 344.9 499 354C505 362.4 515.1 367.3 527.2 367.9L576.4 370.8C577.1 370.8 577.8 371 578.4 371.3C579 371.6 579.5 372.1 579.9 372.7C580.3 373.3 580.6 374 580.7 374.7C580.8 375.4 580.7 376.2 580.5 376.8C580.1 377.9 579.4 378.9 578.4 379.6C577.4 380.3 576.3 380.8 575.1 380.8L524 383.7C496.2 385 466.3 407.3 455.9 434.5L452.2 444.1C452 444.5 452 444.9 452 445.4C452 445.9 452.2 446.2 452.4 446.6C452.6 447 453 447.3 453.3 447.5C453.6 447.7 454.1 447.8 454.5 447.8C454.5 447.8 454.6 447.8 454.6 447.8L630.5 447.8C631.5 447.8 632.5 447.5 633.3 446.9C634.1 446.3 634.7 445.4 635 444.5C638.1 433.4 639.7 422 639.7 410.5C639.7 341.2 583.2 285 513.6 285z"
								/>
							</svg>
						</div>
					</div>
				</section>
			</footer>
		</form>
    `;
}
