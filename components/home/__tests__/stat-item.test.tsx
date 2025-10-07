import { render, screen } from '@testing-library/react';
import { StatItem } from '../stat-item';

describe('StatItem', () => {
  it('renders stat text', () => {
    render(<StatItem stat="1000+ users" />);

    expect(screen.getByText('1000+ users')).toBeInTheDocument();
  });

  it('renders gradient bullet point', () => {
    const { container } = render(<StatItem stat="Active contributors" />);

    const bullet = container.querySelector('.bg-gradient-to-br');
    expect(bullet).toBeInTheDocument();
    expect(bullet).toHaveClass('h-1.5', 'w-1.5', 'rounded-full');
  });

  it('applies gradient colors to bullet', () => {
    const { container } = render(<StatItem stat="Test" />);

    const bullet = container.querySelector('.from-\\[\\#FF5C25\\]');
    expect(bullet).toBeInTheDocument();
    expect(bullet).toHaveClass('to-[#FF456E]');
  });

  it('renders with flex layout', () => {
    const { container } = render(<StatItem stat="Flex test" />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'items-center', 'gap-2');
  });

  it('handles numeric stats', () => {
    render(<StatItem stat="42" />);

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('handles stats with symbols', () => {
    render(<StatItem stat="99.9% uptime" />);

    expect(screen.getByText('99.9% uptime')).toBeInTheDocument();
  });

  it('handles long stat text', () => {
    render(<StatItem stat="Over 1,000,000 downloads worldwide" />);

    expect(screen.getByText('Over 1,000,000 downloads worldwide')).toBeInTheDocument();
  });

  it('handles short stat text', () => {
    render(<StatItem stat="5k" />);

    expect(screen.getByText('5k')).toBeInTheDocument();
  });

  it('renders bullet before text', () => {
    const { container } = render(<StatItem stat="Order test" />);

    const wrapper = container.firstChild as HTMLElement;
    const bullet = wrapper.firstChild;
    const text = wrapper.lastChild;

    expect(bullet).toHaveClass('rounded-full');
    expect(text?.textContent).toBe('Order test');
  });

  it('handles stats with special characters', () => {
    render(<StatItem stat="Rating: ★★★★★" />);

    expect(screen.getByText('Rating: ★★★★★')).toBeInTheDocument();
  });

  it('handles empty string gracefully', () => {
    render(<StatItem stat="" />);

    const { container } = render(<StatItem stat="" />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('bullet has correct size classes', () => {
    const { container } = render(<StatItem stat="Size test" />);

    const bullet = container.querySelector('span.flex');
    expect(bullet).toHaveClass('h-1.5', 'w-1.5');
  });
});
