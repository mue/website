import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BlogImage } from '../blog-image';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ onLoad, onError, ...props }: React.ComponentProps<'img'>) => {
    return (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        {...props}
        onLoad={(e) => onLoad && onLoad(e)}
        onError={(e) => onError && onError(e)}
      />
    );
  },
}));

// Mock gradients
jest.mock('@/lib/gradients', () => ({
  BLOG_IMAGE_GRADIENTS: ['bg-gradient-1', 'bg-gradient-2', 'bg-gradient-3'],
  blogImageGradientIndex: () => 0,
}));

describe('BlogImage', () => {
  it('renders image with src and alt', () => {
    render(<BlogImage src="/test.jpg" alt="Test image" />);

    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', '/test.jpg');
  });

  it('shows loading state initially', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(container.querySelector('[data-state="loading"]')).toBeInTheDocument();
  });

  it('hides loading state when image loads', async () => {
    render(<BlogImage src="/test.jpg" alt="Test" />);

    const image = screen.getByAltText('Test');
    fireEvent.load(image);

    await waitFor(() => {
      expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    });
  });

  it('handles image error', async () => {
    const { container } = render(<BlogImage src="/error.jpg" alt="Error test" />);

    const image = screen.getByAltText('Error test');
    fireEvent.error(image);

    await waitFor(() => {
      expect(container.querySelector('[data-state="error"]')).toBeInTheDocument();
    });
  });

  it('does not show skeleton when disabled', () => {
    render(<BlogImage src="/test.jpg" alt="Test" skeleton={false} />);

    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('applies rounded shape by default', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" />);

    const wrapper = container.querySelector('.rounded-xl');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies circle shape', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" shape="circle" />);

    const wrapper = container.querySelector('.rounded-full');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies square shape', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" shape="square" />);

    const wrapper = container.querySelector('.rounded-none');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies aspect ratio when provided', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" aspectRatio="16/9" />);

    const wrapper = container.querySelector('.aspect-\\[16\\/9\\]');
    expect(wrapper).toBeInTheDocument();
  });

  it('handles fill prop', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" fill />);

    const wrapper = container.querySelector('.absolute.inset-0');
    expect(wrapper).toBeInTheDocument();
  });

  it('applies custom className to image', () => {
    render(<BlogImage src="/test.jpg" alt="Test" className="custom-class" />);

    const image = screen.getByAltText('Test');
    expect(image).toHaveClass('custom-class');
  });

  it('uses blur placeholder when provided', () => {
    render(
      <BlogImage src="/test.jpg" alt="Test" blurDataURL="data:image/jpeg;base64,test" />
    );

    const image = screen.getByAltText('Test');
    expect(image).toBeInTheDocument();
  });

  it('sets priority loading when specified', () => {
    render(<BlogImage src="/test.jpg" alt="Test" priority />);

    const image = screen.getByAltText('Test');
    expect(image).toBeInTheDocument();
  });

  it('applies gradient background', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" />);

    const wrapper = container.querySelector('.bg-gradient-1');
    expect(wrapper).toBeInTheDocument();
  });

  it('handles valid aspect ratios', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" aspectRatio="4/3" />);

    expect(container.querySelector('.aspect-\\[4\\/3\\]')).toBeInTheDocument();
  });

  it('ignores invalid aspect ratios', () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" aspectRatio="5/4" />);

    expect(container.querySelector('.aspect-\\[5\\/4\\]')).not.toBeInTheDocument();
  });

  it('shows loaded state after image loads', async () => {
    const { container } = render(<BlogImage src="/test.jpg" alt="Test" />);

    const image = screen.getByAltText('Test');
    fireEvent.load(image);

    await waitFor(() => {
      expect(container.querySelector('[data-state="loaded"]')).toBeInTheDocument();
    });
  });

  it('hides image on error', async () => {
    render(<BlogImage src="/error.jpg" alt="Error" />);

    const image = screen.getByAltText('Error');
    fireEvent.error(image);

    await waitFor(() => {
      expect(image).not.toBeVisible();
    });
  });
});
