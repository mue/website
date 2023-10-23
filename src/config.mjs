import {
	defineCollection,
	z,
} from 'astro:content';

export const collections = {
	'blog': defineCollection({
		schema: z.object({
			draft: z.boolean(),
			image: z.string().optional(),
			publishedAt: z.string().datetime(),
			tags: z.array(z.string()),
			title: z.string(),
			translated: z.boolean(),
			updatedAt: z.string().datetime(),
		}),
	}),
	'changelog': defineCollection({
		schema: z.object({
			draft: z.boolean(),
			image: z.string().optional(),
			publishedAt: z.string().datetime(),
			tags: z.array(z.string()),
			title: z.string(),
			translated: z.boolean(),
			updatedAt: z.string().datetime(),
		}),
	}),
	'knowledgebase': defineCollection({
		schema: z.object({
			draft: z.boolean(),
			image: z.string().optional(),
			publishedAt: z.string().datetime(),
			tags: z.array(z.string()),
			title: z.string(),
			translated: z.boolean(),
			updatedAt: z.string().datetime(),
		}),
	}),
};

export const github = {
	// branch: 'main',
	branch: 'astro', // TODO: main
	organisation: 'mue',
	repository: 'website',
};
