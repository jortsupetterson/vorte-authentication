// ESM
import fs from 'node:fs/promises';

/* ------------ helpers ------------ */
const WS_BETWEEN_TAGS = />\s+</g;
const WS_ANY = /\s+/g;
const ANY_BACKTICK = /`([\s\S]*?)`/g;

function minifyHTML(s) {
	return s.replace(WS_BETWEEN_TAGS, '><').replace(WS_ANY, ' ').trim();
}
function looksHTML(s) {
	return /<\w[\s\S]*?>/m.test(s);
}

/* ------------ SQLite (D1) ------------ */
function minifySQLite(sql) {
	let out = '',
		i = 0,
		n = sql.length,
		mode = 'code',
		needSpace = false;
	const isWord = (c) => /[A-Za-z0-9_\u00C0-\u024F]/.test(c);
	const pushSpace = () => {
		if (needSpace) {
			out += ' ';
			needSpace = false;
		}
	};

	while (i < n) {
		const c = sql[i],
			c2 = sql[i + 1];

		if (mode === 'linecomment') {
			if (c === '\n' || c === '\r') mode = 'code';
			i++;
			continue;
		}
		if (mode === 'blockcomment') {
			if (c === '*' && c2 === '/') {
				i += 2;
				mode = 'code';
			} else i++;
			continue;
		}
		if (mode === 'squote') {
			out += c;
			i++;
			if (c === "'" && sql[i] === "'") {
				out += sql[i++];
			} else if (c === "'") mode = 'code';
			continue;
		}
		if (mode === 'dquote') {
			out += c;
			i++;
			if (c === '"' && sql[i] === '"') {
				out += sql[i++];
			} else if (c === '"') mode = 'code';
			continue;
		}
		if (mode === 'bquote') {
			out += c;
			i++;
			if (c === '`' && sql[i] === '`') {
				out += sql[i++];
			} else if (c === '`') mode = 'code';
			continue;
		}
		if (mode === 'bracket') {
			out += c;
			i++;
			if (c === ']') mode = 'code';
			continue;
		}

		if (c === '-' && c2 === '-') {
			i += 2;
			mode = 'linecomment';
			continue;
		}
		if (c === '/' && c2 === '*') {
			i += 2;
			mode = 'blockcomment';
			continue;
		}

		if (c === "'" || c === '"' || c === '`' || c === '[') {
			pushSpace();
			out += c;
			i++;
			mode = c === "'" ? 'squote' : c === '"' ? 'dquote' : c === '`' ? 'bquote' : 'bracket';
			continue;
		}

		if (c <= ' ') {
			const prev = out[out.length - 1] || '';
			let j = i + 1;
			while (j < n && sql[j] <= ' ') j++;
			const next = sql[j] || '';
			if (isWord(prev) && isWord(next)) needSpace = true;
			i = j;
			continue;
		}

		pushSpace();
		out += c;
		i++;
	}
	return out.trim();
}
function looksSQL(s) {
	if (!s || s.length < 8) return false;
	if (/<[a-zA-Z]/.test(s)) return false;
	return /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|BEGIN|COMMIT|PRAGMA)\b/i.test(s);
}

/* ------------ main plugin ------------ */
export default function contentMinifierPlugin({ sqlTag = 'sql', version = '', versionToken = 'V£RSION' } = {}) {
	const tagTpl = new RegExp(String.raw`${sqlTag}\s*` + '`([\\s\\S]*?)`', 'g');
	const tokenRe = version
		? new RegExp('(' + versionToken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '|V\\\\xA3RSION|V\\\\u00A3RSION' + ')', 'g')
		: null;

	const STR_LITS = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g;

	const replaceInJsStrings = (source) => {
		if (!tokenRe) return source;
		return source.replace(STR_LITS, (lit) => {
			const q = lit[0];
			const body = lit.slice(1, -1);
			if (q === '`') {
				if (body.includes('${')) {
					const parts = body.split(/(\$\{[\s\S]*?\})/g);
					for (let i = 0; i < parts.length; i += 2) {
						parts[i] = parts[i].replace(tokenRe, version);
					}
					return '`' + parts.join('') + '`';
				}
				return '`' + body.replace(tokenRe, version) + '`';
			}
			return q + body.replace(tokenRe, version) + q;
		});
	};

	return {
		name: 'content-minifier',
		setup(build) {
			// .html → minify + optional version token replace
			build.onLoad({ filter: /\.html$/ }, async (args) => {
				let src = await fs.readFile(args.path, 'utf8');
				let out = minifyHTML(src);
				if (tokenRe) out = out.replace(tokenRe, version);
				return { contents: out, loader: 'text' };
			});

			// .js/.ts/.mjs/.cjs/.mts/.cts → minify tagged SQL, minify HTML/SQL-like template literals, token replace in all string literals
			build.onLoad({ filter: /\.[cm]?[jt]s$/ }, async (args) => {
				let src = await fs.readFile(args.path, 'utf8');

				// 1) Tagatut SQL-templaatit: sql`...`
				src = src.replace(tagTpl, (_m, body) => `${sqlTag}\`${minifySQLite(body)}\``);

				// 2) Kaikki backtick-templaatit: päättele HTML vs. SQL ja minifioi
				src = src.replace(ANY_BACKTICK, (m, body) => {
					// Älä riko interpolaatioita: käsitellään vain literal-osia
					if (body.includes('${')) {
						const parts = body.split(/(\$\{[\s\S]*?\})/g);
						for (let i = 0; i < parts.length; i += 2) {
							const seg = parts[i];
							parts[i] = looksHTML(seg) ? minifyHTML(seg) : looksSQL(seg) ? minifySQLite(seg) : seg;
						}
						return '`' + parts.join('') + '`';
					}
					const min = looksHTML(body) ? minifyHTML(body) : looksSQL(body) ? minifySQLite(body) : body;
					return '`' + min + '`';
				});

				// 3) Versiotokenit kaikissa string-litereissä (', ", ``)
				src = replaceInJsStrings(src);

				return { contents: src, loader: 'default' };
			});
		},
	};
}
