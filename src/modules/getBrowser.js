import UAParser from 'ua-parser-js';

export default function getBrowser(userAgent) {
  const ua = new UAParser(userAgent);

  let data;
  if (ua.getDevice().type === 'mobile' || ua.getDevice().type === 'tablet') {
    data = {
      text: 'Unsupported browser',
      link: '',
    };
  } else {
    switch (ua.getBrowser().name) {
      case 'Chrome':
        data = {
          text: 'Add to Chrome',
          link: 'https://chrome.google.com/webstore/detail/mue/bngmbednanpcfochchhgbkookpiaiaid',
        };
        break;

      case 'Firefox':
        data = {
          text: 'Add to Firefox',
          link: 'https://addons.mozilla.org/firefox/addon/mue/',
        };
        break;

      case 'Edge':
        data = {
          text: 'Add to Edge',
          link: 'https://microsoftedge.microsoft.com/addons/detail/mue/aepnglgjfokepefimhbnibfjekidhmja',
        };
        break;

      case 'Whale':
        data = {
          text: 'Add to Whale',
          link: 'https://store.whale.naver.com/detail/ecllekeilcmicbfkkiknfdddbogibbnc',
        };
        break;

      default:
        data = {
          text: 'Download from GitHub',
          link: 'https://github.com/mue/mue/releases',
        };
    }
  }

  return data;
}
