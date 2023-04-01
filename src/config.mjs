import {
	defineCollection,
	z,
} from 'astro:content';

export const collections = {
	'blog': defineCollection({ schema: {} }),
	'changelog': defineCollection({
		schema: z.object({
			date: z.string(),
			image: z.string().optional(),
			locale: z.string(),
			title: z.string(),
		}),
	}),
	'knowledgebase': defineCollection({
		schema: z.object({
			image: z.string().optional(),
			tags: z.array(z.string()),
			title: z.string(),
		}),
	}),
};

export const github = {
	branch: 'main',
	organisation: 'mue',
	repository: 'website',
};
