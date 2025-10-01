import Link from 'next/link';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

type GitHubLinkButtonProps = {
  href: string;
  label: string;
};

export function GitHubLinkButton({ href, label }: GitHubLinkButtonProps) {
  return (
    <Button variant="outline" asChild>
      <Link href={href} target="_blank" rel="noreferrer">
        <Github className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
