interface BlogProseProps {
  html: string;
  className: string;
}

export function BlogProse({ html, className }: BlogProseProps) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
