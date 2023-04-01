export default path => path.match(/^\/(?<locale>[a-z]{2})\//)?.groups.locale || 'en';
