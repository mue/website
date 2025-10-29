import { render, screen, fireEvent } from '@testing-library/react';
import { ShowcaseLightbox } from '../showcase-lightbox';
import { type ShowcaseItem } from '@/lib/showcase';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ ...props }: React.ComponentProps<'img'>) => {
    return <img {...props} />;
  },
}));

describe('ShowcaseLightbox', () => {
  const mockItem: ShowcaseItem = {
    id: '1',
    author: 'John Doe',
    imageUrl: '/images/test.jpg',
    thumbnailUrl: '/images/test-thumb.jpg',
    tags: ['minimal', 'dark', 'clean'],
    description: 'A beautiful minimal setup',
    createdAt: '2024-01-15',
    discordUsername: 'johndoe#1234',
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('returns null when item is null', () => {
    const { container } = render(<ShowcaseLightbox item={null} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders lightbox when item is provided', () => {
    render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays image with correct src', () => {
    const { container } = render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', '/images/test.jpg');
  });

  it('displays author name and discord username', () => {
    render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('(johndoe#1234)')).toBeInTheDocument();
  });

  it('displays author without discord username when not provided', () => {
    const itemWithoutDiscord = { ...mockItem, discordUsername: undefined };
    render(<ShowcaseLightbox item={itemWithoutDiscord} onClose={mockOnClose} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText(/johndoe#1234/)).not.toBeInTheDocument();
  });

  it('displays description when available', () => {
    render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    expect(screen.getByText('A beautiful minimal setup')).toBeInTheDocument();
  });

  it('displays formatted creation date', () => {
    render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    // Date formatting can vary by locale, just check it exists
    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText(/15/)).toBeInTheDocument();
  });

  it('displays all tags with Tag icon', () => {
    render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    expect(screen.getByText('minimal')).toBeInTheDocument();
    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(screen.getByText('clean')).toBeInTheDocument();
  });

  it('does not display tags section when tags are empty', () => {
    const itemWithoutTags = { ...mockItem, tags: [] };
    render(<ShowcaseLightbox item={itemWithoutTags} onClose={mockOnClose} />);

    expect(screen.queryByText('minimal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText('Close lightbox');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking inside content', () => {
    const { container } = render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    const content = container.querySelector('.max-w-7xl');
    fireEvent.click(content!);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders with correct accessibility attributes', () => {
    render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders User and Calendar icons', () => {
    const { container } = render(<ShowcaseLightbox item={mockItem} onClose={mockOnClose} />);

    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('handles item without description', () => {
    const itemWithoutDescription = { ...mockItem, description: undefined };
    render(<ShowcaseLightbox item={itemWithoutDescription} onClose={mockOnClose} />);

    expect(screen.queryByText('A beautiful minimal setup')).not.toBeInTheDocument();
  });
});
