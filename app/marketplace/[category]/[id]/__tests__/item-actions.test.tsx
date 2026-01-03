import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { ItemActions } from '../item-actions';
import { EmbedProvider } from '@/lib/embed-context';
import { FavoritesProvider } from '@/lib/favorites-context';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(() => '/marketplace/photo_packs/test-item'),
}));

// Mock Logo component
jest.mock('@/components/logo', () => ({
  __esModule: true,
  default: () => <div data-testid="logo">Logo</div>,
}));

describe('ItemActions', () => {
  const defaultProps = {
    itemId: 'test-item',
    displayName: 'Test Item',
    description: 'Test description',
    category: 'photo_packs',
    itemType: 'photo_pack',
    itemData: {
      id: 'test-item',
      type: 'photo_pack',
      display_name: 'Test Item',
      name: 'test-item',
      author: 'Test Author',
    },
  };

  let mockPostMessage: jest.Mock;
  let mockAddEventListener: jest.Mock;
  let mockRemoveEventListener: jest.Mock;

  beforeEach(() => {
    mockPostMessage = jest.fn();
    mockAddEventListener = jest.fn();
    mockRemoveEventListener = jest.fn();

    Object.defineProperty(window, 'parent', {
      writable: true,
      value: {
        postMessage: mockPostMessage,
      },
    });

    window.addEventListener = mockAddEventListener;
    window.removeEventListener = mockRemoveEventListener;

    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'https://muetab.com/marketplace/photo_packs/test-item',
      },
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

    it('should render "Open in Mue" button', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Open in Mue')).toBeInTheDocument();
    });

    it('should have correct link for "Open in Mue"', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const link = screen.getByText('Open in Mue').closest('a');
      expect(link).toHaveAttribute('href', 'https://demo.muetab.com/#marketplace/test-item');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should not render Install/Uninstall buttons', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.queryByText('Install')).not.toBeInTheDocument();
      expect(screen.queryByText('Uninstall')).not.toBeInTheDocument();
    });
  });

  describe('embed mode', () => {
    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
      });
    });

    it('should render Install button initially', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Install')).toBeInTheDocument();
    });

    it('should not render "Open in Mue" button', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.queryByText('Open in Mue')).not.toBeInTheDocument();
    });

    it('should send install message with full item data when Install is clicked', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const installButton = screen.getByText('Install');
      fireEvent.click(installButton);

      expect(mockPostMessage).toHaveBeenCalledWith(
        {
          type: 'marketplace:item:install',
          payload: {
            item: defaultProps.itemData,
          },
        },
        '*'
      );
    });

    it('should show Uninstall button after Install is clicked', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const installButton = screen.getByText('Install');
      fireEvent.click(installButton);

      expect(screen.getByText('Uninstall')).toBeInTheDocument();
      expect(screen.queryByText('Install')).not.toBeInTheDocument();
    });

    it('should send uninstall message when Uninstall is clicked', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      // First install
      const installButton = screen.getByText('Install');
      fireEvent.click(installButton);

      mockPostMessage.mockClear();

      // Then uninstall
      const uninstallButton = screen.getByText('Uninstall');
      fireEvent.click(uninstallButton);

      expect(mockPostMessage).toHaveBeenCalledWith(
        {
          type: 'marketplace:item:uninstall',
          payload: {
            item: defaultProps.itemData,
          },
        },
        '*'
      );
    });

    it('should request installation status on mount', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(mockPostMessage).toHaveBeenCalledWith(
        {
          type: 'marketplace:item:check-installed',
          payload: {
            id: 'test-item',
            type: 'photo_pack',
          },
        },
        '*'
      );
    });

    it('should add message event listener on mount', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(mockAddEventListener).toHaveBeenCalledWith('message', expect.any(Function));
    });

    it('should handle fallback item data when itemData is not provided', () => {
      const { itemData, ...propsWithoutItemData } = defaultProps;

      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...propsWithoutItemData} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const installButton = screen.getByText('Install');
      fireEvent.click(installButton);

      expect(mockPostMessage).toHaveBeenCalledWith(
        {
          type: 'marketplace:item:install',
          payload: {
            item: {
              id: 'test-item',
              type: 'photo_pack',
              display_name: 'Test Item',
              name: 'test-item',
            },
          },
        },
        '*'
      );
    });
  });

  describe('common features', () => {
    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });
    });

    it('should render Favorites button', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
    });

    it('should render Share button', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Share')).toBeInTheDocument();
    });

    it('should render Report button', () => {
      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      expect(screen.getByText('Report')).toBeInTheDocument();
    });

    it('should open GitHub issue when Report is clicked', () => {
      const mockOpen = jest.fn();
      window.open = mockOpen;

      render(
        <EmbedProvider>
          <FavoritesProvider>
            <ItemActions {...defaultProps} />
          </FavoritesProvider>
        </EmbedProvider>
      );

      const reportButton = screen.getByText('Report');
      fireEvent.click(reportButton);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('github.com/mue/marketplace/issues/new'),
        '_blank',
        'noopener,noreferrer'
      );
    });
  });
});
