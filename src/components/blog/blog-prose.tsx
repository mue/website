import DOMPurify from 'isomorphic-dompurify';

interface BlogProseProps {
  html: string;
  className: string;
}

export function BlogProse({ html, className }: BlogProseProps) {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
