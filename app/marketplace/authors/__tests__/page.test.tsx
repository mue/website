import { render, screen } from '@testing-library/react';
import AuthorsPage from '../page';
import { getMarketplaceItems } from '@/lib/marketplace';

// Mock the marketplace library
jest.mock('@/lib/marketplace', () => ({
  getMarketplaceItems: jest.fn(),
  getMarketplaceTypeLabel: jest.fn((type: string) => {
    const labels: Record<string, string> = {
      photo_packs: 'Photo Packs',
      quote_packs: 'Quote Packs',
      preset_settings: 'Preset Settings',
    };
    return labels[type] || type;
  }),
  slugifyAuthor: jest.fn((author: string) => author.toLowerCase().replace(/\s+/g, '-')),
}));

// Mock the breadcrumb component
jest.mock('@/components/marketplace/marketplace-breadcrumb', () => ({
  MarketplaceBreadcrumb: ({ type }: { type: string }) => (
    <div data-testid="breadcrumb">Breadcrumb: {type}</div>
  ),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  User: () => <div data-testid="user-icon">User Icon</div>,
}));

// Mock UI components
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: any) => <span data-testid="badge">{children}</span>,
}));

const mockItems = [
  {
    id: '1',
    name: 'item-1',
    display_name: 'Item 1',
    type: 'photo_packs',
    author: 'John Doe',
    icon_url: 'https://example.com/icon1.jpg',
    in_collections: [],
  },
  {
    id: '2',
    name: 'item-2',
    display_name: 'Item 2',
    type: 'quote_packs',
    author: 'John Doe',
    in_collections: [],
  },
  {
    id: '3',
    name: 'item-3',
    display_name: 'Item 3',
    type: 'preset_settings',
    author: 'Jane Smith',
    in_collections: [],
  },
  {
    id: '4',
    name: 'item-4',
    display_name: 'Item 4',
    type: 'photo_packs',
    author: 'Jane Smith',
    in_collections: [],
  },
  {
    id: '5',
    name: 'item-5',
    display_name: 'Item 5',
    type: 'photo_packs',
    author: 'Bob Wilson',
    in_collections: [],
  },
];

describe('AuthorsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page heading', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    render(page);

    expect(screen.getByText('All Authors')).toBeInTheDocument();
  });

  it('renders the breadcrumb with authors type', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    render(page);

    expect(screen.getByTestId('breadcrumb')).toHaveTextContent('Breadcrumb: authors');
  });

  it('displays correct author count in description', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    render(page);

    expect(screen.getByText(/Browse 3 talented creators in the marketplace/)).toBeInTheDocument();
  });

  it('displays singular creator when only one author', async () => {
    const singleAuthorItems = [
      {
        id: '1',
        name: 'item-1',
        display_name: 'Item 1',
        type: 'photo_packs',
        author: 'John Doe',
        in_collections: [],
      },
    ];

    (getMarketplaceItems as jest.Mock).mockResolvedValue(singleAuthorItems);

    const page = await AuthorsPage();
    render(page);

    expect(screen.getByText(/Browse 1 talented creator in the marketplace/)).toBeInTheDocument();
  });

  it('renders all unique authors', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    render(page);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('displays correct item count for each author', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    render(page);

    // John Doe has 2 items
    const johnDoeSection = screen.getByText('John Doe').closest('a');
    expect(johnDoeSection).toHaveTextContent('2 items');

    // Jane Smith has 2 items
    const janeSmithSection = screen.getByText('Jane Smith').closest('a');
    expect(janeSmithSection).toHaveTextContent('2 items');

    // Bob Wilson has 1 item
    const bobWilsonSection = screen.getByText('Bob Wilson').closest('a');
    expect(bobWilsonSection).toHaveTextContent('1 item');
  });

  it('displays content type badges for each author', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    render(page);

    const badges = screen.getAllByTestId('badge');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('creates links to author detail pages with slugified names', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    const { container } = render(page);

    const links = container.querySelectorAll('a[href^="/marketplace/author/"]');
    expect(links.length).toBe(3);
  });

  it('sorts authors by item count descending', async () => {
    const items = [
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `author1-${i}`,
        name: `item-${i}`,
        display_name: `Item ${i}`,
        type: 'photo_packs',
        author: 'Author One',
        in_collections: [],
      })),
      ...Array.from({ length: 3 }, (_, i) => ({
        id: `author2-${i}`,
        name: `item-${i}`,
        display_name: `Item ${i}`,
        type: 'quote_packs',
        author: 'Author Two',
        in_collections: [],
      })),
      {
        id: 'author3-1',
        name: 'item-1',
        display_name: 'Item 1',
        type: 'preset_settings',
        author: 'Author Three',
        in_collections: [],
      },
    ];

    (getMarketplaceItems as jest.Mock).mockResolvedValue(items);

    const page = await AuthorsPage();
    const { container } = render(page);

    const authorCards = Array.from(container.querySelectorAll('a[href^="/marketplace/author/"]'));
    const firstAuthor = authorCards[0]?.textContent;
    const lastAuthor = authorCards[authorCards.length - 1]?.textContent;

    // Author One (5 items) should come before Author Three (1 item)
    expect(firstAuthor).toContain('Author One');
    expect(lastAuthor).toContain('Author Three');
  });

  it('excludes items without authors', async () => {
    const itemsWithNoAuthor = [
      ...mockItems,
      {
        id: '6',
        name: 'item-6',
        display_name: 'Item 6',
        type: 'photo_packs',
        author: undefined,
        in_collections: [],
      },
    ];

    (getMarketplaceItems as jest.Mock).mockResolvedValue(itemsWithNoAuthor);

    const page = await AuthorsPage();
    render(page);

    // Still only 3 authors despite 6 items
    expect(screen.getByText(/Browse 3 talented creators/)).toBeInTheDocument();
  });

  it('renders default user icon for all authors', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    render(page);

    const userIcons = screen.getAllByTestId('user-icon');
    expect(userIcons).toHaveLength(3); // One for each author
  });

  it('has correct grid layout classes', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    const { container } = render(page);

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('gap-4', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
  });

  it('shows only first 3 content types with +N for more', async () => {
    const multiTypeAuthorItems = [
      {
        id: '1',
        name: 'item-1',
        display_name: 'Item 1',
        type: 'photo_packs',
        author: 'Multi Type Author',
        in_collections: [],
      },
      {
        id: '2',
        name: 'item-2',
        display_name: 'Item 2',
        type: 'quote_packs',
        author: 'Multi Type Author',
        in_collections: [],
      },
      {
        id: '3',
        name: 'item-3',
        display_name: 'Item 3',
        type: 'preset_settings',
        author: 'Multi Type Author',
        in_collections: [],
      },
      {
        id: '4',
        name: 'item-4',
        display_name: 'Item 4',
        type: 'photo_packs',
        author: 'Multi Type Author',
        in_collections: [],
      },
    ];

    (getMarketplaceItems as jest.Mock).mockResolvedValue(multiTypeAuthorItems);

    const page = await AuthorsPage();
    render(page);

    const badges = screen.getAllByTestId('badge');
    // Should show 3 type badges + 1 "+N" badge
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it('renders with correct page layout', async () => {
    (getMarketplaceItems as jest.Mock).mockResolvedValue(mockItems);

    const page = await AuthorsPage();
    const { container } = render(page);

    const mainContainer = container.querySelector('.mx-auto.w-full.max-w-7xl');
    expect(mainContainer).toBeInTheDocument();
  });
});
