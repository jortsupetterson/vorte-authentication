export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		return new Response(
			`
<!DOCTYPE html>
<html lang="fi" data-theme="dark">
<head>
<meta charset="UTF-8" />
<title>Tunnistautuminen | Vorte</title>
<link rel="dns-prefetch" href="//assets.vorte.app">
<link rel="dns-prefetch" href="//challenges.cloudflare.com" />
<link rel="dns-prefetch" href="//static.cloudflareinsights.com" />
    

<link rel="preconnect" href="https://assets.vorte.app" crossorigin>
<link rel="preconnect" href="https://challenges.cloudflare.com" crossorigin />
<link rel="preconnect" href="https://static.cloudflareinsights.com" crossorigin />

<link rel="preload" href="/V£RSION/style.css" as="style" />
<link rel="preload" href="https://assets.vorte.app/fonts/Inter/Inter-VariableFont_opsz,wght.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="https://assets.vorte.app/fonts/Poppins/Poppins-Thin.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="https://assets.vorte.app/fonts/Poppins/Poppins-Regular.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="/V£RSION/images/greeting.svg" as="image" type="image/svg+xml" fetchpriority="high">

<link rel="stylesheet" href="/V£RSION/style.css" />

		<meta name="color-scheme" content="light dark">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

		<style id="accents">
			html {
				--c1: #0b4f60;
				--c2: #199473;
				--c3: #c75858;
				--c4: #196129;
			}
		</style>

		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
		<!--<script type="module" src="/V£RSION/index.js" async defer></script>-->
	</head>
	<body>
		<form aria-labelledby="auth-title">
			<header>
				<h1 id="auth-title">Jatka tunnistautumalla</h1>
			</header>
			<main>
				<section id="email">
					<details>
						<summary class="option">
							<label for="email_address">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg>
								Sähköpostilla
							</label>
						</summary>
						<div>
						<input type="email" id="email_address" name="email" autocomplete="email" required placeholder="botti.example.com" />
						<button type="submit" disabled>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M568.4 37.7C578.2 34.2 589 36.7 596.4 44C603.8 51.3 606.2 62.2 602.7 72L424.7 568.9C419.7 582.8 406.6 592 391.9 592C377.7 592 364.9 583.4 359.6 570.3L295.4 412.3C290.9 401.3 292.9 388.7 300.6 379.7L395.1 267.3C400.2 261.2 399.8 252.3 394.2 246.7C388.6 241.1 379.6 240.7 373.6 245.8L261.2 340.1C252.1 347.7 239.6 349.7 228.6 345.3L70.1 280.8C57 275.5 48.4 262.7 48.4 248.5C48.4 233.8 57.6 220.7 71.5 215.7L568.4 37.7z"/></svg>
						</button>
						</div>
					</details>
				</section>

				<hr aria-hidden="true" />
				<p class="or">TAI</p>
				<hr aria-hidden="true" />

				<section id="socials">
					<ul>
						<li>
							<button class="option" type="button" disabled>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"/></svg>								
							Googlella
							</button>
						</li>
						<li>
							<button class="option" type="button" disabled>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M96 96L310.6 96L310.6 310.6L96 310.6L96 96zM329.4 96L544 96L544 310.6L329.4 310.6L329.4 96zM96 329.4L310.6 329.4L310.6 544L96 544L96 329.4zM329.4 329.4L544 329.4L544 544L329.4 544L329.4 329.4z"/></svg>
							Microsoftilla
							</button>
						</li>
						<li>
							<button class="option" type="button" disabled>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M447.1 332.7C446.9 296 463.5 268.3 497.1 247.9C478.3 221 449.9 206.2 412.4 203.3C376.9 200.5 338.1 224 323.9 224C308.9 224 274.5 204.3 247.5 204.3C191.7 205.2 132.4 248.8 132.4 337.5C132.4 363.7 137.2 390.8 146.8 418.7C159.6 455.4 205.8 545.4 254 543.9C279.2 543.3 297 526 329.8 526C361.6 526 378.1 543.9 406.2 543.9C454.8 543.2 496.6 461.4 508.8 424.6C443.6 393.9 447.1 334.6 447.1 332.7zM390.5 168.5C417.8 136.1 415.3 106.6 414.5 96C390.4 97.4 362.5 112.4 346.6 130.9C329.1 150.7 318.8 175.2 321 202.8C347.1 204.8 370.9 191.4 390.5 168.5z"/></svg>
							Applella
							</button>
						</li>
					</ul>
				</section>
			</main>
			<footer>
				<section id="greeting">
					<figure>
<img 
  src="/V£RSION/images/greeting.svg"
  alt="Vor, Vorten maskotti tervehtimässä sisäänkirjautujaa"
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
<div>
	<input type="checkbox" name="" id="is-human" />
	<label for="is-human">Vahvista, että olet ihminen</label>
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
		<svg class="background" xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
			<g filter="url(#filter0_f_1056_109)">
				<path
					d="M294.5 539.5L96 681V1000.5L356 956.5L498.5 730.5L646 539.5L892.5 478.5H1071L1257.25 654L1679.75 478.5L1823.5 270.5V32H1585.5L1540.5 67L1393.5 270.5L1238 306.5L1111 192L710.5 32L498.5 351L356 449L294.5 539.5Z"
					fill="var(--c1)"
					fill-opacity="0.23"
				/>
			</g>
			<defs>
				<filter
					id="filter0_f_1056_109"
					x="-104"
					y="-168"
					width="2127.5"
					height="1368.5"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1056_109" />
				</filter>
			</defs>
		</svg>
	</body>
</html>
`,
			{ status: 200, headers: { 'Content-Type': 'text/html' } }
		);
	},
};
