import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PhotoShowcase } from '../photo-showcase';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ ...props }: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe('PhotoShowcase', () => {
  const mockCategories = ['Nature', 'Urban', 'Architecture'];
  const mockPhotographers = ['John Doe', 'Jane Smith', 'Bob Wilson'];
  const mockPhoto = {
    category: 'Nature',
    file: 'https://example.com/photo1.jpg',
    photographer: 'John Doe',
    location: 'Yosemite National Park',
    camera: 'Canon EOS R5',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<PhotoShowcase />);

    expect(screen.getByText('Loading beautiful photography...')).toBeInTheDocument();
  });

  it('fetches and displays photos on mount', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotographers,
      })
      .mockResolvedValue({
        ok: true,
        json: async () => mockPhoto,
      });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(screen.queryByText('Loading beautiful photography...')).not.toBeInTheDocument();
    });

    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
  });

  it('displays error message when API fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load photos. Please try again later.'),
      ).toBeInTheDocument();
    });
  });

  it('displays error when API response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load photos. Please try again later.'),
      ).toBeInTheDocument();
    });
  });

  it('renders category filter buttons', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotographers,
      })
      .mockResolvedValue({
        ok: true,
        json: async () => mockPhoto,
      });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'All Categories' })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Nature' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Urban' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Architecture' })).toBeInTheDocument();
  });

  it('filters photos by category', async () => {
    const naturePhoto = { ...mockPhoto, category: 'Nature', photographer: 'Nature Photographer' };
    const urbanPhoto = { ...mockPhoto, category: 'Urban', photographer: 'Urban Photographer' };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ['Nature', 'Urban'],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotographers,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => naturePhoto,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => urbanPhoto,
      });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Urban' })).toBeInTheDocument();
    });

    const urbanButton = screen.getByRole('button', { name: 'Urban' });
    fireEvent.click(urbanButton);

    await waitFor(() => {
      expect(screen.getAllByText('Urban Photographer').length).toBeGreaterThan(0);
      expect(screen.queryByText('Nature Photographer')).not.toBeInTheDocument();
    });
  });

  it('displays photographer and category stats', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotographers,
      })
      .mockResolvedValue({
        ok: true,
        json: async () => mockPhoto,
      });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(screen.getByText('photographers')).toBeInTheDocument();
    });

    expect(screen.getByText('categories')).toBeInTheDocument();
  });

  it('opens lightbox when photo is clicked', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotographers,
      })
      .mockResolvedValue({
        ok: true,
        json: async () => mockPhoto,
      });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    });

    const photoButton = screen.getAllByText('John Doe')[0].closest('button');
    fireEvent.click(photoButton!);

    await waitFor(() => {
      expect(screen.getByLabelText('Image lightbox')).toBeInTheDocument();
    });
  });

  it('closes lightbox when close button is clicked', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotographers,
      })
      .mockResolvedValue({
        ok: true,
        json: async () => mockPhoto,
      });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    });

    const photoButton = screen.getAllByText('John Doe')[0].closest('button');
    fireEvent.click(photoButton!);

    const closeButton = screen.getByLabelText('Close lightbox');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByLabelText('Image lightbox')).not.toBeInTheDocument();
    });
  });

  it('displays "no photos" message when filtered category has no photos', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ['Nature', 'Urban'],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotographers,
      })
      .mockResolvedValue({
        ok: true,
        json: async () => ({ ...mockPhoto, category: 'Nature' }),
      });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(screen.getByText('Urban')).toBeInTheDocument();
    });

    const urbanButton = screen.getByText('Urban');
    fireEvent.click(urbanButton);

    await waitFor(() => {
      expect(
        screen.getByText('No photos found in this category. Try selecting a different one.'),
      ).toBeInTheDocument();
    });
  });

  it('renders photo with location and camera info in hover overlay', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotographers,
      })
      .mockResolvedValue({
        ok: true,
        json: async () => mockPhoto,
      });

    render(<PhotoShowcase />);

    await waitFor(() => {
      expect(screen.getAllByText('Yosemite National Park').length).toBeGreaterThan(0);
    });
  });
});
