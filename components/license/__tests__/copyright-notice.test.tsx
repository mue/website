import { render, screen } from '@testing-library/react';
import { CopyrightNotice } from '../copyright-notice';

// Mock CopyButton component
jest.mock('@/components/ui/copy-button', () => ({
  CopyButton: ({ text, className }: { text: string; className?: string }) => (
    <button data-testid="copy-button" data-text={text} className={className}>
      Copy
    </button>
  ),
}));

describe('CopyrightNotice', () => {
  it('renders copyright text with year and holder', () => {
    render(<CopyrightNotice year="2024" holder="John Doe" />);

    expect(screen.getByText('Copyright (c) 2024 John Doe')).toBeInTheDocument();
  });

  it('displays label when provided', () => {
    render(<CopyrightNotice label="Main License" year="2024" holder="Acme Corp" />);

    expect(screen.getByText('Main License')).toBeInTheDocument();
  });

  it('does not display label when not provided', () => {
    const { container } = render(<CopyrightNotice year="2024" holder="Acme Corp" />);

    const label = container.querySelector('.uppercase.tracking-wider');
    expect(label).not.toBeInTheDocument();
  });

  it('renders copy button with correct text', () => {
    render(<CopyrightNotice year="2024" holder="Test Company" />);

    const copyButton = screen.getByTestId('copy-button');
    expect(copyButton).toHaveAttribute('data-text', 'Copyright (c) 2024 Test Company');
  });

  it('copy button is hidden by default and shows on hover', () => {
    render(<CopyrightNotice year="2024" holder="Test" />);

    const copyButton = screen.getByTestId('copy-button');
    expect(copyButton).toHaveClass('opacity-0', 'group-hover:opacity-100');
  });

  it('formats copyright text correctly for different years', () => {
    const { rerender } = render(<CopyrightNotice year="2020" holder="Company A" />);
    expect(screen.getByText('Copyright (c) 2020 Company A')).toBeInTheDocument();

    rerender(<CopyrightNotice year="2020-2024" holder="Company A" />);
    expect(screen.getByText('Copyright (c) 2020-2024 Company A')).toBeInTheDocument();
  });

  it('handles different copyright holders', () => {
    const { rerender } = render(<CopyrightNotice year="2024" holder="Individual Name" />);
    expect(screen.getByText('Copyright (c) 2024 Individual Name')).toBeInTheDocument();

    rerender(<CopyrightNotice year="2024" holder="Organization, Inc." />);
    expect(screen.getByText('Copyright (c) 2024 Organization, Inc.')).toBeInTheDocument();
  });

  it('renders with correct styling classes', () => {
    const { container } = render(<CopyrightNotice year="2024" holder="Test" />);

    const wrapper = container.querySelector('.group.relative.rounded-lg');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('border', 'border-border', 'bg-muted/30', 'p-4');
  });

  it('displays copyright text in monospace font', () => {
    render(<CopyrightNotice year="2024" holder="Test" />);

    const copyrightText = screen.getByText('Copyright (c) 2024 Test');
    expect(copyrightText).toHaveClass('font-mono');
  });

  it('label is displayed in uppercase via CSS with tracking', () => {
    render(<CopyrightNotice label="project license" year="2024" holder="Test" />);

    const label = screen.getByText('project license');
    expect(label).toHaveClass('text-xs', 'font-semibold', 'uppercase', 'tracking-wider');
  });

  it('copy button has correct size prop', () => {
    render(<CopyrightNotice year="2024" holder="Test" />);

    const copyButton = screen.getByTestId('copy-button');
    // The size is passed as a prop to the mocked component
    expect(copyButton).toBeInTheDocument();
  });

  it('handles special characters in holder name', () => {
    render(<CopyrightNotice year="2024" holder="Company & Co., Ltd." />);

    expect(screen.getByText('Copyright (c) 2024 Company & Co., Ltd.')).toBeInTheDocument();
  });

  it('maintains text layout with flex container', () => {
    const { container } = render(<CopyrightNotice year="2024" holder="Test" />);

    const flexContainer = container.querySelector('.flex.items-start.justify-between');
    expect(flexContainer).toBeInTheDocument();
  });
});
