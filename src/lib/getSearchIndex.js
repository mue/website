
import { getCollection } from 'astro:content';
import lunr from 'lunr';
import stemmer from 'lunr-languages/lunr.stemmer.support';
import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';

const supported = ['ar', 'da', 'de', 'du', 'es', 'fi', 'fr', 'hi', 'hu', 'it', 'ja', 'jp', 'ko', 'nl', 'no', 'pt', 'ro', 'ru', 'sv', 'ta', 'th', 'tr', 'vi', 'zh'];

export default async locale => {
	if (locale !== 'en' && supported.includes(locale)) {
		stemmer(lunr);
		(await import('lunr-languages/lunr.multi.js'))(lunr);
		(await import(`../../node_modules/lunr-languages/lunr.${locale}.js`))(lunr);
	}
	const articles = await getCollection('knowledgebase');
	for (const id in articles) {
		articles[id].text = String(
			await remark()
				.use(stripMarkdown)
				.process(articles[id].body),
		);
	}
	return {
		articles,
		index: JSON.stringify(lunr(function () {
			// some content may not have been translated, so search needs to work with English as well
			if (locale !== 'en' && supported.includes(locale)) this.use(lunr.multiLanguage('en', locale));
			this.ref('id');
			this.field('category');
			this.field('tags');
			this.field('text');
			this.field('title', { boost: 10 });
			this.metadataWhitelist = ['position'];
			articles
				.filter(article => article.slug.split('/').shift() === locale)
				.forEach(article =>
					this.add({
						category: article.slug.split('/')[1],
						id: article.id,
						tags: article.data.tags,
						text: article.text,
						title: article.data.title,
					}),
				);
		})),
	};
};
