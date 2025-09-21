import { renderDefault } from '../views/default.js';
export async function handleDefault({ id, lang, responseTemplate }) {
	return new Response(await responseTemplate.body(lang, id, renderDefault(lang), 'default'), {
		status: 200,
		headers: await responseTemplate.headers(lang, id),
	});
}
