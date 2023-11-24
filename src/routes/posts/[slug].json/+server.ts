import { error } from '@sveltejs/kit';
import { processRawMDFile } from '../../../lib/utils/markdown.utils';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
	const markdownFiles = import.meta.glob('/src/content/posts/*.md', { as: 'raw' });

	const posts: {
		frontmatter: Record<string, string>;
		content: string;
		path: string;
	}[] = [];

	Object.entries(markdownFiles).forEach(async ([path, file]) => {
		const fileContent = await file();

		posts.push({ ...processRawMDFile(fileContent), path });
	});

	const post = posts.find(async (p) => p.path.includes(url.pathname));

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
