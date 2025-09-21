const TITLE = { fi: 'Tunnistautuminen', sv: 'Identisering', en: 'Identification' };
const DESCRIPTION = {
	fi: 'Kirjaudu sisään tai rekisteröidy Vorteen. Suunnittele ja hallitse yritystoimintaasi turvallisesti ja tehokkaasti.',
	sv: 'Logga in eller registrera dig i Vorte. Planera och hantera din verksamhet tryggt och effektivt.',
	en: 'Sign in or register to Vorte. Plan and manage your business securely and efficiently.',
};

const ROBOTS_TAG = `noindex, follow`;
const CACHE_CONTROL = 'public, max-age=60, must-revalidate';
const VARY = 'Accept-Encoding, Accept-Language';

export const template = {
	body: async (lang, nonce, view, script) => {
		return `
<!DOCTYPE html>
<html lang="${lang}" data-theme="dark" data-figure="vor">
	<head>
		<meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

		<title>${TITLE[lang]} | Vorte</title>
		<meta
			name="description"
			content="${DESCRIPTION[lang]}"
		/>

        <meta property="og:locale" content="${{ fi: 'fi_FI', sv: 'sv_SE', en: 'en_US' }[lang]}" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vorte" />
        <meta property="og:title" content="${TITLE[lang]}" />

        <meta property="og:description" content="${DESCRIPTION[lang]}" />

        <meta property="og:url" content="https://auth.vorte.app/${lang}" />
        <meta property="og:image" content="https://assets.vorte.app/images/vorte_social_sharing_image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
    
        <meta property="og:image:alt" content="${
					{
						fi: 'Ole oman elämäsi pomo - Vorte auttaa',
						sv: 'Var din egen chef - Vorte hjälper dig',
						en: 'Be your own boss with Vorte',
					}[lang]
				}" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${TITLE[lang]}" />

        <meta name="twitter:description" content="${DESCRIPTION[lang]}" />

        <meta name="twitter:url" content="https://auth.vorte.app/${lang}" />
        <meta name="twitter:image" content="https://assets.vorte.app/images/vorte_social_sharing_image.png" />

        <meta name="twitter:image:alt" content="${
					{
						fi: 'Ole oman elämäsi pomo - Vorte auttaa',
						sv: 'Var din egen chef - Vorte hjälper dig',
						en: 'Be your own boss with Vorte',
					}[lang]
				}" />

    <meta name="twitter:site" content="@vorteapp" />
    <meta name="twitter:creator" content="@vorteapp" />

		<link rel="canonical" href="https://auth.vorte.app/fi" />
		<link rel="alternate" hreflang="fi" href="https://auth.vorte.app/fi" />
		<link rel="alternate" hreflang="sv" href="https://auth.vorte.app/sv" />
		<link rel="alternate" hreflang="en" href="https://auth.vorte.app/en" />
		<link rel="alternate" hreflang="x-default" href="https://auth.vorte.app/en" />

		<link rel="dns-prefetch" href="//assets.vorte.app" />
		<link rel="dns-prefetch" href="//challenges.cloudflare.com" />
		<link rel="dns-prefetch" href="//static.cloudflareinsights.com" />

		<link rel="preconnect" href="https://assets.vorte.app" crossorigin />
		<link rel="preconnect" href="https://challenges.cloudflare.com" crossorigin />
		<link rel="preconnect" href="https://static.cloudflareinsights.com" crossorigin />

		<link rel="preload" href="/V£RSION/style.css" as="style" />
		<link
			rel="preload"
			href="https://assets.vorte.app/fonts/Inter/Inter-VariableFont_opsz,wght.ttf"
			as="font"
			type="font/ttf"
			crossorigin
		/>
		<link rel="preload" href="https://assets.vorte.app/fonts/Poppins/Poppins-Thin.ttf" as="font" type="font/ttf" crossorigin />
		<link rel="preload" href="https://assets.vorte.app/fonts/Poppins/Poppins-Regular.ttf" as="font" type="font/ttf" crossorigin />
		<link rel="preload" href="/V£RSION/images/greeting.svg" as="image" type="image/svg+xml" fetchpriority="high" />

		<link rel="stylesheet" href="/V£RSION/style.css" />

		<meta name="color-scheme" content="light dark" />
		<meta name="mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" sizes="57x57" href="/V£RSION/images/apple/icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/V£RSION/images/apple/icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/V£RSION/images/apple/icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/V£RSION/images/apple/icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/V£RSION/images/apple/icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/V£RSION/images/apple/icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/V£RSION/images/apple/icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/V£RSION/images/apple/icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/V£RSION/images/apple/icon-180x180.png">

<link rel="apple-touch-startup-image" href="/splash/1179x2556.png"
  media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1290x2796.png"
  media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1170x2532.png"
  media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1284x2778.png"
  media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1080x2340.png"
  media="(device-width: 360px) and (device-height: 780px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/828x1792.png"
  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1125x2436.png"
  media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/750x1334.png"
  media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1242x2208.png"
  media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/750x1334.png"
  media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/2064x2752.png"
  media="(device-width: 1024px) and (device-height: 1336px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/2048x2732.png"
  media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1668x2388.png"
  media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1640x2360.png"
  media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1620x2160.png"
  media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1488x2266.png"
  media="(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />

<link rel="apple-touch-startup-image" href="/splash/1536x2048.png"
  media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />


<link rel="icon" type="image/png" sizes="192x192"  href="/V£RSION/images/android/icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/V£RSION/images/favicons/32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/V£RSION/images/favicons/96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/V£RSION/images/favicons/16x16.png">
<link rel="manifest" href="https://vorte.app/web/${lang}.json">
<meta name="msapplication-TileColor" content="#000000">
<meta name="msapplication-TileImage" content="/V£RSION/images/ms/icon-144x144.png">
<meta name="theme-color" content="#000000">
<meta name="msapplication-config" content="/V£RSION/browserconfig.xml">



		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
		<script type="module" src="/V£RSION/scripts/${script}/events.js" async defer></script>

		<script type="application/ld+json" nonce="${nonce}">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://auth.vorte.app/${lang}#vorte",
  "url": "https://auth.vorte.app/${lang}",
  "name": "${TITLE[lang]}",
"alternateName": "${
			{
				fi: 'Vorte yrittäjä-alusta',
				sv: 'Vorte plattform för entreprenörer',
				en: 'Vorte Entrepreneur Platform',
			}[lang]
		}",
  "description": "${DESCRIPTION[lang]}",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "browserRequirements": "${
		{
			fi: 'JavaScript vaaditaan. Optimoitu moderneille selaimille.',
			sv: 'JavaScript krävs. Optimerad för moderna webbläsare.',
			en: 'JavaScript required. Optimized for modern browsers.',
		}[lang]
	}",
  "inLanguage": ["fi","sv","en"],
  "isAccessibleForFree": true,

  "featureList": [
    "${
			{
				fi: 'Turvallinen WebAuthn-kirjautuminen',
				sv: 'Säker WebAuthn-inloggning',
				en: 'Secure WebAuthn sign-in',
			}[lang]
		}",
    "${
			{
				fi: 'Offline-tilan tuki',
				sv: 'Stöd för offline-läge',
				en: 'Offline mode support',
			}[lang]
		}"
  ],

  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://auth.vorte.app/${lang}"
  },

  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://why.vorte.app/#website",
    "url": "https://why.vorte.app",
    "name": "Vorte"
  },

  "sameAs": [
    "https://vorte.app",
    "https://why.vorte.app"
  ],

  "potentialAction": [
    {
      "@type": "LoginAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://auth.vorte.app/${lang}",
        "inLanguage": "${lang}",
        "actionPlatform": [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform"
        ]
      }
    },
    {
      "@type": "RegisterAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://auth.vorte.app/${lang}",
        "inLanguage": "${lang}",
        "actionPlatform": [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform"
        ]
      }
    }
  ],

  "publisher": {
    "@type": "Organization",
    "name": "J&J Commerce Oy",
    "url": "https://tietopalvelu.ytj.fi/yritys/3443314-6",
    "logo": {
      "@type": "ImageObject",
      "url": "https://assets.vorte.app/images/logo.png",
      "width": 500,
      "height": 500
    },
    "sameAs": [
      "https://vorte.app",
      "https://why.vorte.app",
      "https://tietopalvelu.ytj.fi/yritys/3443314-6"
    ]
  }
}
</script>
	</head>
	<body>
        ${view}
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
`;
	},
	headers: async (lang, nonce) => {
		return new Headers({
			// CONTENT METADATA
			'Content-Type': 'text/html; charset=utf-8;',
			'Content-Language': lang,

			// SECURITY
			'Content-Security-Policy':
				`default-src 'self'; base-uri 'none'; form-action 'self'; ` +
				`script-src 'self' https://challenges.cloudflare.com 'nonce-${nonce}'; ` +
				`style-src 'self' 'nonce-${nonce}'; ` +
				`img-src 'self' data: https://assets.vorte.app; font-src 'self' https://assets.vorte.app; ` +
				`connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; object-src 'none';`,
			'X-Content-Type-Options': 'nosniff',
			'X-Frame-Options': 'DENY',
			'X-XSS-Protection': '0',
			'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
			'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Resource-Policy': 'same-origin',
			'X-UA-Compatible': 'IE=edge',

			// SEO
			'X-Robots-Tag': ROBOTS_TAG,

			//COOKIE
			'Set-Cookie': `lang=${lang}; Same-Site=strict;`,

			// CACHING
			'Cache-Control': CACHE_CONTROL,
			ETag: '"AUTOGENERATED_IF_NEEDED"',
			Vary: VARY,
		});
	},
};
