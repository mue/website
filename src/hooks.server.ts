/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname === "/") {
		return await resolve(event);
	} else {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace("%lang%", event.url.pathname.split("/")[1]),
		});
	}
	
}