import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch, url }) => {
	const res = await fetch(`${url}.json`);
	return await res.json();
};
