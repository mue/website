// this exists because of https://github.com/isaachinman/next-i18next/issues/677
export default function CatchTranslationError(msg, replacement) {
  if (
    msg.includes('.') ||
    msg === 'social' ||
    msg === 'subtitle' ||
    msg === 'features' ||
    msg === 'about' ||
    msg === 'contact' ||
    msg === 'blog' ||
    msg === 'get_started'
  ) {
    return replacement;
  } else {
    return msg;
  }
}
