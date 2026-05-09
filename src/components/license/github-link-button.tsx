import { FaGithub } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

type GitHubLinkButtonProps = {
  href: string;
  label: string;
};

export function GitHubLinkButton({ href, label }: GitHubLinkButtonProps) {
  return (
    <Button variant="outline" asChild>
      <a href={href} target="_blank" rel="noreferrer">
        <FaGithub className="mr-2 h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
