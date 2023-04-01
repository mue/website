import HTMLParser from 'html-to-json-parser';
import { github } from '../config.mjs';

const base = `https://github.com/${github.organisation}/${github.repository}/contributors-list/${github.branch}/`;

export default async path => {
	try {
		const res = await fetch(base + path);
		if (!res.ok) {
			console.warn(`Couldn't get contributors for ${path} (${res.status} ${res.statusText})`);
			return [];
		}
		const html = await res.text();
		const ul = await HTMLParser(html);
		return ul.content.filter(el => typeof el === 'object' && el.type === 'li').map(li => {
			const a = li.content[1];
			return {
				avatar_url: a.content[1].attributes.src,
				login: a.content[2].trim(),
				url: 'https://github.com' + a.attributes.href,
			};
		});
	} catch (error) {
		console.error(error);
		return [];
	}

};
