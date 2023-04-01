import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

export function remarkReadingTime() {
	return function (tree, { data }) {
		data.astro.frontmatter.readingTime = getReadingTime(toString(tree));
	};
}
