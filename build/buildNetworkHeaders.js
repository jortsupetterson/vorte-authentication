import { writeFile } from 'fs/promises';

function build(newVersion) {
	return `
/favicon.ico
  Cache-Control: public, max-age=31536000, immutable

/${newVersion}/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff
`;
}

export default async function buildHeaders(newVersion) {
	const content = build(newVersion);
	await writeFile(`./dist/assets/_headers`, content);
}
