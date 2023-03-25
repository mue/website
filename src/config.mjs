import {
	defineCollection,
	z,
} from 'astro:content';

export const collections = {
	'authors': defineCollection({ schema: {} }),
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
