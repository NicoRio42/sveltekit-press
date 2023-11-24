import { error } from '@sveltejs/kit';
import { processRawMDFile } from '../../lib/utils/markdown.utils';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
	const markdownFiles = import.meta.glob('/src/content/posts/*.md', { as: 'raw' });

	const posts = Object.entries(markdownFiles).map(async ([path, file]) => {
		const fileContent = await file();
		return { ...processRawMDFile(fileContent), path };
	});

	const post = await posts.find(async (p) => {
		const pst = await p;

		return pst.path.includes(url.pathname);
	});

	if (post === undefined) {
		throw error(404, 'No post found for this slug');
	}

	return new Response(
		JSON.stringify({
			title: post.frontmatter.title,
			content: post.content
		})
	);
};
