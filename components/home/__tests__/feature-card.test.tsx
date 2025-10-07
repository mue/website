import { render, screen } from '@testing-library/react';
import { FeatureCard } from '../feature-card';

describe('FeatureCard', () => {
  const defaultProps = {
    index: 0,
    eyebrow: 'Feature Category',
    title: 'Amazing Feature',
    description: 'This is an amazing feature description',
    bullets: ['First benefit', 'Second benefit', 'Third benefit'],
    footerText: 'Learn More',
  };

  it('renders all content correctly', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Feature Category')).toBeInTheDocument();
    expect(screen.getByText('Amazing Feature')).toBeInTheDocument();
    expect(screen.getByText('This is an amazing feature description')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('displays index with leading zero', () => {
    const { rerender } = render(<FeatureCard {...defaultProps} index={0} />);
    expect(screen.getByText(/01/)).toBeInTheDocument();

    rerender(<FeatureCard {...defaultProps} index={5} />);
    expect(screen.getByText(/06/)).toBeInTheDocument();

    rerender(<FeatureCard {...defaultProps} index={8} />);
    expect(screen.getByText(/09/)).toBeInTheDocument();
  });

  it('renders all bullet points', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByText('First benefit')).toBeInTheDocument();
    expect(screen.getByText('Second benefit')).toBeInTheDocument();
    expect(screen.getByText('Third benefit')).toBeInTheDocument();
  });

  it('renders with article semantic tag', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('displays eyebrow in uppercase via CSS', () => {
    render(<FeatureCard {...defaultProps} eyebrow="customization" />);

    const eyebrow = screen.getByText('customization');
    expect(eyebrow).toHaveClass('uppercase');
  });

  it('displays footer text in uppercase via CSS', () => {
    render(<FeatureCard {...defaultProps} footerText="read the docs" />);

    const footer = screen.getByText('read the docs');
    expect(footer).toHaveClass('uppercase');
  });

  it('renders h3 heading for title', () => {
    render(<FeatureCard {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Amazing Feature');
  });

  it('applies gradient to bullet points', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const bulletIcons = container.querySelectorAll('.bg-gradient-to-r');
    expect(bulletIcons.length).toBeGreaterThan(0);
  });

  it('handles empty bullets array', () => {
    const { container } = render(<FeatureCard {...defaultProps} bullets={[]} />);

    const bulletList = container.querySelector('ul');
    expect(bulletList?.children).toHaveLength(0);
  });

  it('handles single bullet point', () => {
    render(<FeatureCard {...defaultProps} bullets={['Only one benefit']} />);

    expect(screen.getByText('Only one benefit')).toBeInTheDocument();
  });

  it('applies correct card styling', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('rounded-3xl', 'border', 'bg-background/80', 'backdrop-blur');
  });

  it('displays index with primary color', () => {
    render(<FeatureCard {...defaultProps} />);

    const index = screen.getByText('01');
    expect(index).toHaveClass('text-[#FF5C25]');
  });

  it('renders divider between content and footer', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const divider = container.querySelector('.h-px.w-full.bg-gradient-to-r');
    expect(divider).toBeInTheDocument();
  });

  it('handles long descriptions', () => {
    const longDescription =
      'This is a very long description that contains multiple sentences and explains the feature in great detail.';
    render(<FeatureCard {...defaultProps} description={longDescription} />);

    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('handles long titles', () => {
    const longTitle = 'This is a very long feature title that might wrap to multiple lines';
    render(<FeatureCard {...defaultProps} title={longTitle} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('renders with correct responsive padding', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('p-8', 'lg:p-10');
  });

  it('renders with correct title sizing', () => {
    render(<FeatureCard {...defaultProps} />);

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveClass('text-3xl', 'lg:text-[2.1rem]');
  });
});
