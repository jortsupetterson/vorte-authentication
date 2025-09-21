import { renderLanding } from '../views/landing.js';
export async function handleLanding({ id, lang, responseTemplate }) {
	return new Response(await responseTemplate.body(lang, id, renderLanding(lang)), {
		status: 200,
		headers: await responseTemplate.headers(lang, id),
	});
}
