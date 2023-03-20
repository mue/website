import {
	defineCollection,
	z,
} from 'astro:content';

export const collections = {
	'authors': defineCollection({ schema: {} }),
	'blog': defineCollection({
		schema: z.object({
			image: z.string().optional(),
			locale: z.string(),
			tags: z.array(z.string()),
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
