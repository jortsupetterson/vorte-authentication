import { renderLanding } from '../views/landing.js';
export async function handleLanding(req) {
	return new Response(await req.responseTemplate.body(req.lang, req.id, renderLanding(req.lang)), {
		status: 200,
		headers: await req.responseTemplate.headers(req.lang, req.id),
	});
}
