import { render, screen } from '@testing-library/react';
import { ContactCard } from '../contact-card';
import { Mail, MessageCircle } from 'lucide-react';

describe('ContactCard', () => {
  const defaultProps = {
    href: 'mailto:test@example.com',
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email for support',
  };

  it('renders title and description', () => {
    render(<ContactCard {...defaultProps} />);

    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('Send us an email for support')).toBeInTheDocument();
  });

  it('renders as link with correct href', () => {
    render(<ContactCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('renders icon component', () => {
    const { container } = render(<ContactCard {...defaultProps} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-6', 'w-6', 'text-[#FF5C25]');
  });

  it('opens external links in new tab', () => {
    render(<ContactCard {...defaultProps} href="https://discord.gg/test" external />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('does not open internal links in new tab', () => {
    render(<ContactCard {...defaultProps} external={false} />);

    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('target', '_blank');
    expect(link).not.toHaveAttribute('rel', 'noreferrer');
  });

  it('renders with gradient icon background', () => {
    const { container } = render(<ContactCard {...defaultProps} />);

    const iconWrapper = container.querySelector('.bg-gradient-to-br');
    expect(iconWrapper).toBeInTheDocument();
    expect(iconWrapper).toHaveClass('from-[#FF5C25]/20', 'to-[#FF456E]/20');
  });

  it('renders h3 heading for title', () => {
    render(<ContactCard {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Email Us');
  });

  it('applies hover styles', () => {
    render(<ContactCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('group', 'hover:border-[#FF5C25]/40');
  });

  it('renders with different icons', () => {
    const { rerender, container } = render(<ContactCard {...defaultProps} icon={Mail} />);
    expect(container.querySelector('svg')).toBeInTheDocument();

    rerender(<ContactCard {...defaultProps} icon={MessageCircle} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('handles different hrefs', () => {
    const { rerender } = render(<ContactCard {...defaultProps} href="mailto:support@test.com" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'mailto:support@test.com');

    rerender(<ContactCard {...defaultProps} href="https://discord.gg/example" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://discord.gg/example');
  });

  it('renders custom icon component', () => {
    const CustomIcon = ({ className }: { className?: string }) => (
      <div className={className} data-testid="custom-icon">
        Custom
      </div>
    );

    render(<ContactCard {...defaultProps} icon={CustomIcon} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('scales icon on hover', () => {
    const { container } = render(<ContactCard {...defaultProps} />);

    const iconWrapper = container.querySelector('.group-hover\\:scale-110');
    expect(iconWrapper).toBeInTheDocument();
  });

  it('renders with card styling', () => {
    render(<ContactCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'rounded-2xl',
      'border',
      'border-border',
      'bg-background/60',
      'p-6'
    );
  });

  it('renders description with correct styling', () => {
    render(<ContactCard {...defaultProps} />);

    const description = screen.getByText('Send us an email for support');
    expect(description).toHaveClass('mt-2', 'text-sm', 'text-muted-foreground');
  });

  it('renders icon in rounded container', () => {
    const { container } = render(<ContactCard {...defaultProps} />);

    const iconContainer = container.querySelector('.rounded-xl');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass('h-12', 'w-12', 'border', 'border-border');
  });
});
