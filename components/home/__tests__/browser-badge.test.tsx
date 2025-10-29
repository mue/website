import { render, screen } from '@testing-library/react';
import { BrowserBadge } from '../browser-badge';
import { FaChrome } from 'react-icons/fa';

describe('BrowserBadge', () => {
  it('renders browser name and icon', () => {
    render(<BrowserBadge name="Chrome" icon={FaChrome} url="https://chrome.google.com" />);

    expect(screen.getByText('Chrome')).toBeInTheDocument();
  });

  it('renders as a link with correct URL', () => {
    render(<BrowserBadge name="Chrome" icon={FaChrome} url="https://chrome.google.com/store" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://chrome.google.com/store');
  });

  it('opens link in new tab', () => {
    render(<BrowserBadge name="Firefox" icon={FaChrome} url="https://firefox.com" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('includes noreferrer for security', () => {
    render(<BrowserBadge name="Edge" icon={FaChrome} url="https://edge.microsoft.com" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders icon component', () => {
    const { container } = render(
      <BrowserBadge name="Safari" icon={FaChrome} url="https://apple.com/safari" />,
    );

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-4', 'w-4', 'flex-shrink-0');
  });

  it('displays name and icon together in badge', () => {
    const { container } = render(
      <BrowserBadge name="Opera" icon={FaChrome} url="https://opera.com" />,
    );

    const badge = container.querySelector('.flex.items-center.gap-2');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Opera');
  });

  it('has hover effects', () => {
    const { container } = render(
      <BrowserBadge name="Brave" icon={FaChrome} url="https://brave.com" />,
    );

    const badge = container.querySelector('span');
    expect(badge).toHaveClass('hover:text-[#FF5C25]', 'hover:shadow-lg', 'hover:scale-105');
  });

  it('has correct text sizing classes', () => {
    const { container } = render(
      <BrowserBadge name="Vivaldi" icon={FaChrome} url="https://vivaldi.com" />,
    );

    const badge = container.querySelector('span');
    expect(badge).toHaveClass('text-sm', 'sm:text-base');
  });

  it('handles different browser names', () => {
    const { rerender } = render(
      <BrowserBadge name="Chrome" icon={FaChrome} url="https://chrome.com" />,
    );
    expect(screen.getByText('Chrome')).toBeInTheDocument();

    rerender(<BrowserBadge name="Mozilla Firefox" icon={FaChrome} url="https://firefox.com" />);
    expect(screen.getByText('Mozilla Firefox')).toBeInTheDocument();
  });

  it('applies correct styling to badge span', () => {
    const { container } = render(
      <BrowserBadge name="Test" icon={FaChrome} url="https://test.com" />,
    );

    const badge = container.querySelector('span');
    expect(badge).toHaveClass(
      'bg-background',
      'px-4',
      'py-2',
      'rounded-full',
      'font-semibold',
      'text-foreground',
    );
  });
});
