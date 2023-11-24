import { marked } from 'marked';

export const processRawMDFile = (
	rawContent: string
): { frontmatter: Record<string, string>; content: string } => {
	const [frontmatter, rawMarkdown] = extractFrontMatterAndRawBodyFromRawMDFile(rawContent);
	marked.setOptions({ sanitize: true });
	const content = marked.parse(rawMarkdown);

	return { frontmatter, content };
};

export const extractFrontMatterAndRawBodyFromRawMDFile = (
	rawContent: string
): [Record<string, string>, string] => {
	const frontMatter: Record<string, string> = {};
	const splittedContent = rawContent.split('---');

	splittedContent[1]
		.trim()
		.split('\n')
		.forEach((line) => {
			const [key, value] = line
				.trim()
				.split(':')
				.map((item) => item.trim().replaceAll('"', '').replaceAll("'", ''));

			frontMatter[key] = value;
		});

	return [frontMatter, splittedContent[2]];
};
