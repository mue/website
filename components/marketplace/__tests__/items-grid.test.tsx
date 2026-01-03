import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams, useRouter } from 'next/navigation';
import ItemsGrid from '../items-grid';
import { EmbedProvider } from '@/lib/embed-context';
import { FavoritesProvider } from '@/lib/favorites-context';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(() => '/marketplace'),
  useRouter: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ItemsGrid', () => {
  const mockItems = [
    {
      id: 'item-1',
      name: 'item-1',
      display_name: 'Item 1',
      type: 'photo_pack',
      author: 'Author 1',
      icon_url: 'https://example.com/icon1.jpg',
      in_collections: ['collection-1'],
    },
    {
      id: 'item-2',
      name: 'item-2',
      display_name: 'Item 2',
      type: 'preset',
      author: 'Author 2',
      icon_url: 'https://example.com/icon2.jpg',
      in_collections: ['collection-1', 'collection-2'],
    },
  ];

  const collectionNameMap = new Map([
    ['collection-1', 'Collection One'],
    ['collection-2', 'Collection Two'],
  ]);

  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('normal mode (not embed)', () => {
    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });
    });

    it('should render 3-column grid on desktop', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('lg:grid-cols-3');
      expect(grid).not.toHaveClass('lg:grid-cols-4');
    });

    it('should use default padding', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const card = container.querySelector('.group');
      expect(card).toHaveClass('p-4');
      expect(card).not.toHaveClass('p-3');
    });

    it('should use default icon size', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const iconContainer = container.querySelector('.aspect-square');
      expect(iconContainer).toHaveClass('h-16', 'w-16', 'lg:h-20', 'lg:w-20');
    });

    it('should not include embed param in links', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const itemLink = screen.getByText('Item 1').closest('a');
      expect(itemLink).toHaveAttribute('href', expect.not.stringContaining('embed=true'));
    });
  });

  describe('embed mode', () => {
    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
      });
    });

    it('should render 4-column grid on desktop', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('lg:grid-cols-4');
      expect(grid).not.toHaveClass('lg:grid-cols-3');
    });

    it('should use compact padding', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const card = container.querySelector('.group');
      expect(card).toHaveClass('p-3');
      expect(card).toHaveClass('lg:p-4');
    });

    it('should use smaller icon size', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const iconContainer = container.querySelector('.aspect-square');
      expect(iconContainer).toHaveClass('h-12', 'w-12', 'lg:h-16', 'lg:w-16');
    });

    it('should preserve embed param in item links', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const itemLink = screen.getByText('Item 1').closest('a');
      expect(itemLink).toHaveAttribute('href', expect.stringContaining('?embed=true'));
    });

    it('should preserve embed param in author links', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const authorButton = screen.getByText('Author 1');
      fireEvent.click(authorButton);

      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('?embed=true'));
    });

    it('should preserve embed param in type filter links', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const typeButton = screen.getByText('Photo Pack');
      fireEvent.click(typeButton);

      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('&embed=true'));
    });

    it('should preserve embed param in collection links', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const collectionButton = screen.getByText('Collection One');
      fireEvent.click(collectionButton);

      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('?embed=true'));
    });
  });

  describe('common features', () => {
    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });
    });

    it('should render all items', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should display item authors', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
    });

    it('should display item types', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Photo Pack')).toBeInTheDocument();
      expect(screen.getByText('Preset')).toBeInTheDocument();
    });

    it('should display collection badges', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Collection One')).toBeInTheDocument();
      expect(screen.getByText('Collection Two')).toBeInTheDocument();
    });

    it('should render favorite buttons', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const favoriteButtons = container.querySelectorAll('button[type="button"]');
      expect(favoriteButtons.length).toBeGreaterThan(0);
    });

    it('should handle items without icons', () => {
      const itemsWithoutIcons = [
        {
          ...mockItems[0],
          icon_url: undefined,
        },
      ];

      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={itemsWithoutIcons as any} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const placeholder = container.querySelector('.bg-muted');
      expect(placeholder).toBeInTheDocument();
    });

    it('should render empty grid when no items provided', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={[]} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.children).toHaveLength(0);
    });

    it('should limit collection badges to 3', () => {
      const itemWithManyCollections = [
        {
          ...mockItems[0],
          in_collections: ['coll-1', 'coll-2', 'coll-3', 'coll-4', 'coll-5'],
        },
      ];

      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={itemWithManyCollections as any} collectionNameMap={new Map()} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const collectionBadges = container.querySelectorAll('.cursor-pointer');
      const collectionBadgesWithLibraryIcon = Array.from(collectionBadges).filter((badge) => {
        return badge.querySelector('svg');
      });
      // Should show maximum 3 collections
      expect(collectionBadgesWithLibraryIcon.length).toBeLessThanOrEqual(3);
    });

    it('should apply hover effects on cards', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const card = container.querySelector('.group');
      expect(card).toHaveClass('hover:-translate-y-1', 'hover:border-primary/40');
    });

    it('should render 2 columns on mobile', () => {
      const { container } = render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-2');
    });
  });

  describe('author click navigation', () => {
    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });
    });

    it('should navigate to author page when author is clicked', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const authorButton = screen.getByText('Author 1');
      fireEvent.click(authorButton);

      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/marketplace/author/'));
    });

    it('should prevent default link behavior when author is clicked', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemsGrid items={mockItems} collectionNameMap={collectionNameMap} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const authorButton = screen.getByText('Author 1');
      const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

      fireEvent.click(authorButton, event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });
});
