import config from '../astro-i18next.config.mjs';

// for each file in src/content{blog,knowledgebase}/en:
//   for locale of config.locales:
//     if !locale: cp file to src/content{blog,knowledgebase}/[locale]/[slug].md(x) AFTER setting frontmatter.locale

// in astro - if !frontmatter.translated, display a banner at the top of the page saying "this page is not translated yet, help us translate it by clicking here"
// thanks copilot
