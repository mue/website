import { render, screen } from '@testing-library/react';
import { BrowserCard } from '../browser-card';
import { FaChrome } from 'react-icons/fa';

describe('BrowserCard', () => {
  const defaultProps = {
    name: 'Chrome',
    icon: FaChrome,
    description: 'Download for Google Chrome',
    url: 'https://chrome.google.com/webstore',
    version: 'v1.0.0',
    gradient: 'from-blue-500 to-blue-700',
  };

  it('renders browser name, description, and version', () => {
    render(<BrowserCard {...defaultProps} />);

    expect(screen.getByText('Chrome')).toBeInTheDocument();
    expect(screen.getByText('Download for Google Chrome')).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });

  it('renders icon component', () => {
    const { container } = render(<BrowserCard {...defaultProps} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-8', 'w-8', 'text-foreground');
  });

  it('renders download link with correct href', () => {
    render(<BrowserCard {...defaultProps} />);

    const link = screen.getByRole('link', { name: /Add to Chrome/i });
    expect(link).toHaveAttribute('href', 'https://chrome.google.com/webstore');
  });

  it('opens link in new tab', () => {
    render(<BrowserCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('displays "Your Browser" badge when detected', () => {
    render(<BrowserCard {...defaultProps} isDetected />);

    expect(screen.getByText('Your Browser')).toBeInTheDocument();
  });

  it('does not display badge when not detected', () => {
    render(<BrowserCard {...defaultProps} isDetected={false} />);

    expect(screen.queryByText('Your Browser')).not.toBeInTheDocument();
  });

  it('applies detected styling when isDetected is true', () => {
    const { container } = render(<BrowserCard {...defaultProps} isDetected />);

    const card = container.querySelector('.border-\\[\\#FF5C25\\]\\/60');
    expect(card).toBeInTheDocument();
  });

  it('applies normal styling when not detected', () => {
    const { container } = render(<BrowserCard {...defaultProps} isDetected={false} />);

    const card = container.querySelector('.border-white\\/10');
    expect(card).toBeInTheDocument();
  });

  it('renders h3 heading for browser name', () => {
    render(<BrowserCard {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Chrome');
  });

  it('renders ArrowRight icon in button', () => {
    const { container } = render(<BrowserCard {...defaultProps} />);

    // ArrowRight is from lucide-react
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(1); // Browser icon + arrow icon
  });

  it('renders with gradient background', () => {
    const { container } = render(<BrowserCard {...defaultProps} />);

    const gradientBg = container.querySelector('.from-blue-500.to-blue-700');
    expect(gradientBg).toBeInTheDocument();
  });

  it('renders version with status indicator', () => {
    const { container } = render(<BrowserCard {...defaultProps} />);

    const statusDot = container.querySelector('.bg-emerald-400');
    expect(statusDot).toBeInTheDocument();
  });

  it('renders download button as Button component', () => {
    render(<BrowserCard {...defaultProps} />);

    const button = screen.getByRole('link', { name: /Add to Chrome/i });
    expect(button).toBeInTheDocument();
  });

  it('handles different browser names', () => {
    const { rerender } = render(<BrowserCard {...defaultProps} name="Firefox" />);
    expect(screen.getByText('Firefox')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Add to Firefox/i })).toBeInTheDocument();

    rerender(<BrowserCard {...defaultProps} name="Edge" />);
    expect(screen.getByText('Edge')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Add to Edge/i })).toBeInTheDocument();
  });

  it('renders with group hover effects', () => {
    const { container } = render(<BrowserCard {...defaultProps} />);

    const card = container.querySelector('.group');
    expect(card).toBeInTheDocument();
  });

  it('renders icon in bordered container', () => {
    const { container } = render(<BrowserCard {...defaultProps} />);

    const iconContainer = container.querySelector('.rounded-2xl.border.border-white\\/10');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass('h-16', 'w-16');
  });

  it('renders with card shadow effects', () => {
    const { container } = render(<BrowserCard {...defaultProps} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('rounded-3xl', 'border', 'p-8');
  });

  it('renders detected badge with correct styling', () => {
    render(<BrowserCard {...defaultProps} isDetected />);

    const badge = screen.getByText('Your Browser');
    expect(badge).toHaveClass(
      'rounded-full',
      'border',
      'border-[#FF5C25]/40',
      'bg-[#FF5C25]/20',
      'uppercase',
      'tracking-wider',
    );
  });

  it('displays version in pill badge', () => {
    const { container } = render(<BrowserCard {...defaultProps} version="v2.5.3" />);

    const versionBadge = screen.getByText('v2.5.3');
    expect(versionBadge).toBeInTheDocument();

    const pillBadge = container.querySelector('.rounded-full.border.bg-white\\/5');
    expect(pillBadge).toBeInTheDocument();
    expect(pillBadge).toContainElement(versionBadge);
  });
});
