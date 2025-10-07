import { render, screen } from '@testing-library/react';
import { CommunityStatCard } from '../community-stat-card';

describe('CommunityStatCard', () => {
  it('renders label, value, and description', () => {
    render(
      <CommunityStatCard
        label="GitHub Stars"
        value="2.5k+"
        description="Stars on our repository"
      />
    );

    expect(screen.getByText('GitHub Stars')).toBeInTheDocument();
    expect(screen.getByText('2.5k+')).toBeInTheDocument();
    expect(screen.getByText('Stars on our repository')).toBeInTheDocument();
  });

  it('displays label in uppercase via CSS', () => {
    render(<CommunityStatCard label="downloads" value="10k" description="Total downloads" />);

    const label = screen.getByText('downloads');
    expect(label).toHaveClass('uppercase');
  });

  it('applies correct styling to label', () => {
    render(<CommunityStatCard label="Users" value="5000" description="Active users" />);

    const label = screen.getByText('Users');
    expect(label).toHaveClass('text-xs', 'uppercase', 'tracking-[0.36em]', 'text-[#FF5C25]/80');
  });

  it('applies correct styling to value', () => {
    render(<CommunityStatCard label="Metric" value="100%" description="Coverage" />);

    const value = screen.getByText('100%');
    expect(value).toHaveClass('mt-2', 'text-lg', 'font-semibold', 'text-foreground');
  });

  it('applies correct styling to description', () => {
    render(<CommunityStatCard label="Stat" value="42" description="The answer" />);

    const description = screen.getByText('The answer');
    expect(description).toHaveClass('mt-3', 'text-xs', 'text-muted-foreground/80');
  });

  it('renders with card styling', () => {
    const { container } = render(
      <CommunityStatCard label="Test" value="123" description="Test description" />
    );

    const card = container.firstChild;
    expect(card).toHaveClass(
      'rounded-2xl',
      'border',
      'border-border',
      'bg-background/80',
      'p-5',
      'backdrop-blur'
    );
  });

  it('handles long values', () => {
    render(
      <CommunityStatCard
        label="Downloads"
        value="1,234,567,890"
        description="Total downloads this year"
      />
    );

    expect(screen.getByText('1,234,567,890')).toBeInTheDocument();
  });

  it('handles multiline descriptions', () => {
    render(
      <CommunityStatCard
        label="Users"
        value="10k"
        description="Active users across all platforms"
      />
    );

    expect(screen.getByText('Active users across all platforms')).toBeInTheDocument();
  });

  it('renders different stat types', () => {
    const { rerender } = render(
      <CommunityStatCard
        label="Contributors"
        value="150+"
        description="Open source contributors"
      />
    );

    expect(screen.getByText('150+')).toBeInTheDocument();

    rerender(<CommunityStatCard label="Issues Closed" value="98%" description="Resolution rate" />);

    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  it('maintains text hierarchy with proper spacing', () => {
    const { container } = render(
      <CommunityStatCard label="Metric" value="Value" description="Description" />
    );

    const value = screen.getByText('Value');
    const description = screen.getByText('Description');

    expect(value).toHaveClass('mt-2');
    expect(description).toHaveClass('mt-3');
  });
});
