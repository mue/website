import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PhotoGallery } from '../photo-gallery';
import { EmbedProvider } from '@/lib/embed-context';
import { useSearchParams } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(() => '/marketplace'),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: { alt?: string }) {
    return <div data-testid="mock-image" {...props} />;
  },
}));

// Mock the carousel components
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselNext: () => <div>Next</div>,
  CarouselPrevious: () => <div>Previous</div>,
}));

const mockPhotos = [
  {
    url: { default: 'https://example.com/photo1.jpg' },
    photographer: 'John Doe',
    location: 'New York',
  },
  {
    url: { default: 'https://example.com/photo2.jpg' },
    photographer: 'Jane Smith',
    location: 'London',
  },
];

describe('PhotoGallery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('normal mode (not embed)', () => {
    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });
    });

    it('should render photo gallery in carousel mode', () => {
      render(
        <EmbedProvider>
          <PhotoGallery photos={mockPhotos} itemName="Test Item" />
        </EmbedProvider>,
      );

      expect(screen.getByText('Carousel')).toBeInTheDocument();
      expect(screen.getByText('Grid')).toBeInTheDocument();
    });

    it('should open lightbox when photo is clicked in normal mode', () => {
      render(
        <EmbedProvider>
          <PhotoGallery photos={mockPhotos} itemName="Test Item" />
        </EmbedProvider>,
      );

      // Get photo buttons (they're unnamed, so we get all buttons and exclude the view mode buttons)
      const allButtons = screen.getAllByRole('button');
      const photoButtons = allButtons.filter(
        (btn) => !btn.textContent?.includes('Carousel') && !btn.textContent?.includes('Grid'),
      );
      
      fireEvent.click(photoButtons[0]);

      // Lightbox should be visible
      expect(screen.getByRole('dialog', { name: 'Image lightbox' })).toBeInTheDocument();
    });
  });

  describe('embed mode', () => {
    let postMessageSpy: jest.SpyInstance;

    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn((param: string) => (param === 'embed' ? 'true' : null)),
      });

      // Mock window.parent.postMessage
      postMessageSpy = jest.spyOn(window.parent, 'postMessage');
    });

    afterEach(() => {
      postMessageSpy.mockRestore();
    });

    it('should send postMessage instead of opening lightbox when photo is clicked', () => {
      render(
        <EmbedProvider>
          <PhotoGallery photos={mockPhotos} itemName="Test Item" />
        </EmbedProvider>,
      );

      // Get photo buttons
      const allButtons = screen.getAllByRole('button');
      const photoButtons = allButtons.filter(
        (btn) => !btn.textContent?.includes('Carousel') && !btn.textContent?.includes('Grid'),
      );
      
      fireEvent.click(photoButtons[0]);

      // Should send postMessage
      expect(postMessageSpy).toHaveBeenCalledWith(
        {
          type: 'marketplace:lightbox',
          payload: {
            action: 'open',
            index: 0,
            photo: {
              url: 'https://example.com/photo1.jpg',
              photographer: 'John Doe',
              location: 'New York',
              alt: 'New York',
            },
            photos: [
              {
                url: 'https://example.com/photo1.jpg',
                photographer: 'John Doe',
                location: 'New York',
                alt: 'New York',
              },
              {
                url: 'https://example.com/photo2.jpg',
                photographer: 'Jane Smith',
                location: 'London',
                alt: 'London',
              },
            ],
            totalCount: 2,
          },
        },
        '*',
      );

      // Lightbox should NOT be visible
      expect(screen.queryByRole('dialog', { name: 'Image lightbox' })).not.toBeInTheDocument();
    });

    it('should send postMessage with correct index when second photo is clicked', () => {
      render(
        <EmbedProvider>
          <PhotoGallery photos={mockPhotos} itemName="Test Item" />
        </EmbedProvider>,
      );

      // Get photo buttons
      const allButtons = screen.getAllByRole('button');
      const photoButtons = allButtons.filter(
        (btn) => !btn.textContent?.includes('Carousel') && !btn.textContent?.includes('Grid'),
      );
      
      fireEvent.click(photoButtons[1]);

      expect(postMessageSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'marketplace:lightbox',
          payload: expect.objectContaining({
            action: 'open',
            index: 1,
            photo: expect.objectContaining({
              url: 'https://example.com/photo2.jpg',
              photographer: 'Jane Smith',
              location: 'London',
            }),
          }),
        }),
        '*',
      );
    });
  });

  describe('view mode toggle', () => {
    beforeEach(() => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });
    });

    it('should switch between carousel and grid view', () => {
      render(
        <EmbedProvider>
          <PhotoGallery photos={mockPhotos} itemName="Test Item" />
        </EmbedProvider>,
      );

      const gridButton = screen.getByRole('button', { name: /grid/i });
      fireEvent.click(gridButton);

      // Grid view should be active (button should have secondary variant)
      expect(gridButton).toHaveClass('bg-secondary');
    });
  });
});
