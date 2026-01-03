import { render, screen } from '@testing-library/react';
import FeaturedCollections from '../featured-collections';

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

// Mock carousel components
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-item">{children}</div>
  ),
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-previous">Previous</button>,
}));

describe('FeaturedCollections', () => {
  const mockCollections = [
    {
      name: 'nature-pack',
      display_name: 'Nature Pack',
      description: 'Beautiful nature photographs',
      img: 'https://example.com/nature.jpg',
      contentTypes: ['photo_pack', 'quote_pack'],
    },
    {
      name: 'minimal-pack',
      display_name: 'Minimal Pack',
      description: 'Clean and minimal designs',
      img: 'https://example.com/minimal.jpg',
      contentTypes: ['preset'],
    },
  ];

  describe('normal mode (not embed)', () => {
    it('should render collection with default styling', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={false} />
      );

      const article = container.querySelector('article');
      expect(article).toHaveClass('rounded-2xl');
      expect(article).not.toHaveClass('rounded-lg');
    });

    it('should use default grid layout', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={false} />
      );

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('lg:grid-cols-[2fr_3fr]');
      expect(grid).not.toHaveClass('lg:grid-cols-[80px_1fr]');
    });

    it('should display full-size image', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={false} />
      );

      const imageContainer = container.querySelector('.relative');
      expect(imageContainer).toHaveClass('lg:min-h-[220px]');
      expect(imageContainer).not.toHaveClass('lg:h-20');
      expect(imageContainer).not.toHaveClass('lg:w-20');
    });

    it('should use default padding', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={false} />
      );

      const content = container.querySelector('.flex.flex-col');
      expect(content).toHaveClass('p-6');
      expect(content).not.toHaveClass('p-3');
    });

    it('should use default text sizes', () => {
      render(<FeaturedCollections randomCollections={mockCollections} isEmbed={false} />);

      const title = screen.getByText('Nature Pack');
      expect(title).toHaveClass('text-2xl');
      expect(title).not.toHaveClass('text-lg');
    });
  });

  describe('embed mode', () => {
    it('should apply compact styling', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={true} />
      );

      const article = container.querySelector('article');
      expect(article).toHaveClass('rounded-lg');
    });

    it('should use compact grid layout', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={true} />
      );

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('lg:grid-cols-[80px_1fr]');
      expect(grid).toHaveClass('gap-2');
    });

    it('should display small thumbnail image', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={true} />
      );

      const imageContainer = container.querySelector('.relative');
      expect(imageContainer).toHaveClass('lg:h-20');
      expect(imageContainer).toHaveClass('lg:w-20');
      expect(imageContainer).toHaveClass('hidden'); // Hidden on mobile
    });

    it('should use compact padding', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={true} />
      );

      const content = container.querySelector('.flex.flex-col');
      expect(content).toHaveClass('p-3');
      expect(content).toHaveClass('lg:p-4');
    });

    it('should use smaller text sizes', () => {
      render(<FeaturedCollections randomCollections={mockCollections} isEmbed={true} />);

      const title = screen.getByText('Nature Pack');
      expect(title).toHaveClass('text-lg');
      expect(title).toHaveClass('lg:text-xl');
    });

    it('should have smaller badges', () => {
      const { container } = render(
        <FeaturedCollections randomCollections={mockCollections} isEmbed={true} />
      );

      const badges = container.querySelectorAll('.text-xs');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('should preserve embed param in collection links', () => {
      render(<FeaturedCollections randomCollections={mockCollections} isEmbed={true} />);

      const link = screen.getByText('Explore collection').closest('a');
      expect(link).toHaveAttribute('href', expect.stringContaining('?embed=true'));
    });

    it('should have compact button styling', () => {
      render(<FeaturedCollections randomCollections={mockCollections} isEmbed={true} />);

      const button = screen.getByText('Explore collection');
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-xs');
    });
  });

  describe('common features', () => {
    it('should render collection title', () => {
      render(<FeaturedCollections randomCollections={mockCollections} />);
      expect(screen.getByText('Nature Pack')).toBeInTheDocument();
    });

    it('should render collection description', () => {
      render(<FeaturedCollections randomCollections={mockCollections} />);
      expect(screen.getByText('Beautiful nature photographs')).toBeInTheDocument();
    });

    it('should render content type badges', () => {
      render(<FeaturedCollections randomCollections={mockCollections} />);
      expect(screen.getByText('Photo Pack')).toBeInTheDocument();
      expect(screen.getByText('Quote Pack')).toBeInTheDocument();
    });

    it('should render multiple collections', () => {
      render(<FeaturedCollections randomCollections={mockCollections} />);
      expect(screen.getByText('Nature Pack')).toBeInTheDocument();
      expect(screen.getByText('Minimal Pack')).toBeInTheDocument();
    });

    it('should render "Explore collection" button for each collection', () => {
      render(<FeaturedCollections randomCollections={mockCollections} />);
      const buttons = screen.getAllByText('Explore collection');
      expect(buttons).toHaveLength(2);
    });

    it('should return null when no collections provided', () => {
      const { container } = render(<FeaturedCollections randomCollections={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('should render image when img URL is provided', () => {
      const { container } = render(<FeaturedCollections randomCollections={mockCollections} />);
      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
    });

    it('should render placeholder when img URL is missing', () => {
      const collectionsWithoutImg = [
        {
          ...mockCollections[0],
          img: undefined,
        },
      ];

      const { container } = render(
        <FeaturedCollections randomCollections={collectionsWithoutImg as any} />
      );
      const placeholder = container.querySelector('.bg-muted');
      expect(placeholder).toBeInTheDocument();
    });

    it('should render carousel controls', () => {
      render(<FeaturedCollections randomCollections={mockCollections} />);
      expect(screen.getByTestId('carousel-next')).toBeInTheDocument();
      expect(screen.getByTestId('carousel-previous')).toBeInTheDocument();
    });
  });
});
