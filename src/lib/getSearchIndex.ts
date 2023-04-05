import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import lunr from "lunr";
import stemmer from 'lunr-languages/lunr.stemmer.support';
import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';

type Modify<T, R> = Omit<T, keyof R> & R;
type KnowledgebaseArticle = Modify<CollectionEntry<"knowledgebase">, {
	slug: string;
}>

const supported = ["ar", "da", "de", "du", "es", "fi", "fr", "hi", "hu", "it", "ja", "jp", "ko", "nl", "no", "pt", "ro", "ru", "sv", "ta", "th", "tr", "vi", "zh"];

export default async (locale) => {
	if (locale !== "en" && supported.includes(locale)) {
		stemmer(lunr);
		(await import(`../../node_modules/lunr-languages/lunr.multi.js` ))(lunr);
		(await import(`../../node_modules/lunr-languages/lunr.${locale}.js` ))(lunr);
	}
	const articles: KnowledgebaseArticle[] = await getCollection("knowledgebase");
	const text = {};
	for (const article of articles) {
		text[article.id] = String(
			await remark()
				.use(stripMarkdown)
				.process(article.body)
		);
	}
	return JSON.stringify(lunr(function () {
		// if (locale !== "en" && supported.includes(locale)) this.use(lunr[locale]);
		// some content may not have been translated, so search needs to work with English as well
		if (locale !== "en" && supported.includes(locale)) this.use(lunr.multiLanguage("en", locale));
		this.ref("id");
		this.field("category");
		this.field("tags");
		this.field("text");
		this.field("title", { boost: 10 });
		articles
			.filter((article) => article.slug.split("/").shift() === locale)
			.forEach((article) =>
				this.add({
					category: article.slug.split("/")[1],
					id: article.id,
					tags: article.data.tags,
					text: text[article.id],
					title: article.data.title,
				})
			);
	}));
};
