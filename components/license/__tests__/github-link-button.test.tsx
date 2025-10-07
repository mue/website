import { render, screen } from '@testing-library/react';
import { GitHubLinkButton } from '../github-link-button';

describe('GitHubLinkButton', () => {
  it('renders with label and href', () => {
    render(<GitHubLinkButton href="https://github.com/test/repo" label="View on GitHub" />);

    const link = screen.getByRole('link', { name: /View on GitHub/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/test/repo');
  });

  it('opens link in new tab', () => {
    render(<GitHubLinkButton href="https://github.com/test/repo" label="Source Code" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('includes noreferrer for security', () => {
    render(<GitHubLinkButton href="https://github.com/test/repo" label="Repository" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders GitHub icon', () => {
    const { container } = render(
      <GitHubLinkButton href="https://github.com/test/repo" label="GitHub" />
    );

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('mr-2', 'h-4', 'w-4');
  });

  it('renders with Button component styling', () => {
    render(<GitHubLinkButton href="https://github.com/test/repo" label="View Repo" />);

    const link = screen.getByRole('link', { name: /View Repo/i });
    expect(link).toBeInTheDocument();
  });

  it('displays custom label text', () => {
    render(<GitHubLinkButton href="https://github.com/test" label="Custom Label Text" />);

    expect(screen.getByText('Custom Label Text')).toBeInTheDocument();
  });

  it('handles different GitHub URLs', () => {
    const { rerender } = render(
      <GitHubLinkButton href="https://github.com/user/repo1" label="Repo 1" />
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.com/user/repo1');

    rerender(<GitHubLinkButton href="https://github.com/org/repo2/tree/main" label="Repo 2" />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/org/repo2/tree/main'
    );
  });
});
