export default path => path.match(/\/(?<locale>[a-z]+)\/support/gi)?.groups.locale || 'en';
