import { render, screen, fireEvent } from '@testing-library/react';
import { ShowcaseGallery } from '../showcase-gallery';
import { type ShowcaseItem } from '@/lib/showcase';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ ...props }: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock ShowcaseLightbox component
jest.mock('../showcase-lightbox', () => ({
  ShowcaseLightbox: ({ item, onClose }: { item: ShowcaseItem | null; onClose: () => void }) =>
    item ? (
      <div data-testid="lightbox">
        <button onClick={onClose}>Close</button>
        <p>{item.author}</p>
      </div>
    ) : null,
}));

describe('ShowcaseGallery', () => {
  const mockItems: ShowcaseItem[] = [
    {
      id: '1',
      author: 'John Doe',
      imageUrl: '/images/test1.jpg',
      thumbnailUrl: '/images/test1-thumb.jpg',
      tags: ['minimal', 'dark'],
      description: 'A minimal dark setup',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      author: 'Jane Smith',
      imageUrl: '/images/test2.jpg',
      tags: ['colorful'],
      createdAt: '2024-01-02',
    },
    {
      id: '3',
      author: 'Bob Johnson',
      imageUrl: '/images/test3.jpg',
      createdAt: '2024-01-03',
    },
  ];

  it('renders gallery items', () => {
    render(<ShowcaseGallery items={mockItems} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders thumbnail URL when available, otherwise imageUrl', () => {
    const { container } = render(<ShowcaseGallery items={mockItems} />);

    const images = container.querySelectorAll('img');
    expect(images[0]).toHaveAttribute('src', '/images/test1-thumb.jpg');
    expect(images[1]).toHaveAttribute('src', '/images/test2.jpg');
  });

  it('displays first tag as badge when tags exist', () => {
    render(<ShowcaseGallery items={mockItems} />);

    expect(screen.getByText('minimal')).toBeInTheDocument();
    expect(screen.getByText('colorful')).toBeInTheDocument();
  });

  it('displays description when available', () => {
    render(<ShowcaseGallery items={mockItems} />);

    expect(screen.getByText('A minimal dark setup')).toBeInTheDocument();
  });

  it('opens lightbox when item is clicked', () => {
    render(<ShowcaseGallery items={mockItems} />);

    const firstItem = screen.getByText('John Doe').closest('div')?.parentElement;
    expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument();

    fireEvent.click(firstItem!);
    expect(screen.getByTestId('lightbox')).toBeInTheDocument();
  });

  it('closes lightbox when close is triggered', () => {
    render(<ShowcaseGallery items={mockItems} />);

    const firstItem = screen.getByText('John Doe').closest('div')?.parentElement;
    fireEvent.click(firstItem!);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument();
  });

  it('renders empty gallery when no items', () => {
    const { container } = render(<ShowcaseGallery items={[]} />);

    const grid = container.querySelector('.grid');
    expect(grid?.children).toHaveLength(0);
  });

  it('renders correct grid layout classes', () => {
    const { container } = render(<ShowcaseGallery items={mockItems} />);

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('gap-4', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('renders User icon for each item', () => {
    const { container } = render(<ShowcaseGallery items={mockItems} />);

    const userIcons = container.querySelectorAll('svg');
    expect(userIcons.length).toBeGreaterThanOrEqual(mockItems.length);
  });

  it('passes selected item to lightbox', () => {
    render(<ShowcaseGallery items={mockItems} />);

    const secondItem = screen.getByText('Jane Smith').closest('div')?.parentElement;
    fireEvent.click(secondItem!);

    expect(screen.getByTestId('lightbox')).toHaveTextContent('Jane Smith');
  });
});
