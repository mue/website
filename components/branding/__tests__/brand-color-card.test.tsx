import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrandColorCard } from '../brand-color-card';

// Mock clipboard API
const mockClipboard = {
  writeText: jest.fn(() => Promise.resolve()),
};

Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

describe('BrandColorCard', () => {
  const defaultProps = {
    name: 'Primary Orange',
    hex: '#FF5C25',
    description: 'Main brand color for primary actions',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with name, hex, and description', () => {
    render(<BrandColorCard {...defaultProps} />);

    expect(screen.getByText('Primary Orange')).toBeInTheDocument();
    expect(screen.getByText('#FF5C25')).toBeInTheDocument();
    expect(screen.getByText('Main brand color for primary actions')).toBeInTheDocument();
  });

  it('renders color preview with correct background color', () => {
    const { container } = render(<BrandColorCard {...defaultProps} />);

    const colorPreview = container.querySelector('.h-32.w-full');
    expect(colorPreview).toBeInTheDocument();
    expect(colorPreview).toHaveStyle({ backgroundColor: '#FF5C25' });
  });

  it('renders copy button with correct label', () => {
    render(<BrandColorCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Copy #FF5C25 to clipboard' });
    expect(button).toBeInTheDocument();
  });

  it('displays Copy icon by default', () => {
    const { container } = render(<BrandColorCard {...defaultProps} />);

    const copyIcon = container.querySelector('button svg');
    expect(copyIcon).toBeInTheDocument();
  });

  it('copies hex value to clipboard when button is clicked', async () => {
    render(<BrandColorCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Copy #FF5C25 to clipboard' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalledWith('#FF5C25');
    });
  });

  it('shows check icon after copying', async () => {
    render(<BrandColorCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Copy #FF5C25 to clipboard' });
    fireEvent.click(button);

    await waitFor(() => {
      const checkIcon = button.querySelector('.text-green-500');
      expect(checkIcon).toBeInTheDocument();
    });
  });

  it('reverts to copy icon after 2 seconds', async () => {
    jest.useFakeTimers();

    const { act } = await import('@testing-library/react');

    render(<BrandColorCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Copy #FF5C25 to clipboard' });
    fireEvent.click(button);

    await waitFor(() => {
      const checkIcon = button.querySelector('.text-green-500');
      expect(checkIcon).toBeInTheDocument();
    });

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      const checkIcon = button.querySelector('.text-green-500');
      expect(checkIcon).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('renders hex code in monospace font', () => {
    render(<BrandColorCard {...defaultProps} />);

    const hexText = screen.getByText('#FF5C25');
    expect(hexText).toHaveClass('font-mono');
  });

  it('has hover effects on card', () => {
    const { container } = render(<BrandColorCard {...defaultProps} />);

    const card = container.querySelector('.group');
    expect(card).toHaveClass('hover:border-primary/40', 'hover:shadow-md');
  });

  it('has transition classes on color preview', () => {
    const { container } = render(<BrandColorCard {...defaultProps} />);

    const colorPreview = container.querySelector('.h-32.w-full');
    expect(colorPreview).toHaveClass('transition', 'group-hover:scale-105');
  });

  it('renders with different colors correctly', () => {
    const { container, rerender } = render(
      <BrandColorCard name="Color 1" hex="#FF0000" description="Red color" />
    );

    let colorPreview = container.querySelector('.h-32.w-full');
    expect(colorPreview).toHaveStyle({ backgroundColor: '#FF0000' });

    rerender(<BrandColorCard name="Color 2" hex="#00FF00" description="Green color" />);

    colorPreview = container.querySelector('.h-32.w-full');
    expect(colorPreview).toHaveStyle({ backgroundColor: '#00FF00' });
  });

  it('has correct layout structure', () => {
    const { container } = render(<BrandColorCard {...defaultProps} />);

    const card = container.querySelector('.rounded-2xl.border.border-border');
    expect(card).toBeInTheDocument();

    const contentArea = container.querySelector('.p-4');
    expect(contentArea).toBeInTheDocument();
  });

  it('description has correct styling', () => {
    render(<BrandColorCard {...defaultProps} />);

    const description = screen.getByText('Main brand color for primary actions');
    expect(description).toHaveClass('text-xs', 'text-muted-foreground');
  });

  it('name has correct styling', () => {
    render(<BrandColorCard {...defaultProps} />);

    const name = screen.getByText('Primary Orange');
    expect(name).toHaveClass('font-semibold', 'text-foreground');
  });

  it('handles multiple clicks correctly', async () => {
    render(<BrandColorCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Copy #FF5C25 to clipboard' });

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalledTimes(3);
    });
  });
});
