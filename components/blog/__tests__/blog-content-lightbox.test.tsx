import { render, screen, fireEvent } from '@testing-library/react';
import { BlogContentLightbox } from '../blog-content-lightbox';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ ...props }: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('BlogContentLightbox', () => {
  beforeEach(() => {
    // Create mock images in the DOM
    document.body.innerHTML = `
      <div class="docs-prose">
        <img src="/image1.jpg" alt="First image" />
        <img src="/image2.jpg" alt="Second image" />
        <img src="/image3.jpg" alt="Third image" />
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does not render lightbox initially', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens lightbox when image is clicked', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Image lightbox')).toBeInTheDocument();
  });

  it('displays correct image in lightbox', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    const lightboxImage = screen.getAllByAltText('First image')[0];
    expect(lightboxImage).toHaveAttribute('src', '/image1.jpg');
  });

  it('closes lightbox when close button is clicked', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    const closeButton = screen.getByLabelText('Close lightbox');
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes lightbox when backdrop is clicked', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows navigation buttons when multiple images exist', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('navigates to next image', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);

    expect(screen.getAllByAltText('Second image')[0]).toBeInTheDocument();
  });

  it('navigates to previous image', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const secondImage = document.querySelectorAll('.docs-prose img')[1] as HTMLImageElement;
    fireEvent.click(secondImage);

    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);

    expect(screen.getAllByAltText('First image')[0]).toBeInTheDocument();
  });

  it('wraps around when navigating past last image', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const thirdImage = document.querySelectorAll('.docs-prose img')[2] as HTMLImageElement;
    fireEvent.click(thirdImage);

    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);

    expect(screen.getAllByAltText('First image')[0]).toBeInTheDocument();
  });

  it('wraps around when navigating before first image', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    const prevButton = screen.getByLabelText('Previous image');
    fireEvent.click(prevButton);

    expect(screen.getAllByAltText('Third image')[0]).toBeInTheDocument();
  });

  it('displays image counter', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('updates counter when navigating', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    const nextButton = screen.getByLabelText('Next image');
    fireEvent.click(nextButton);

    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('navigates with arrow keys', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getAllByAltText('Second image')[0]).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getAllByAltText('First image')[0]).toBeInTheDocument();
  });

  it('adds cursor pointer to images', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const images = document.querySelectorAll('.docs-prose img') as NodeListOf<HTMLImageElement>;
    images.forEach((img) => {
      expect(img.style.cursor).toBe('zoom-in');
    });
  });

  it('stops propagation when clicking navigation buttons', () => {
    render(<BlogContentLightbox contentHtml="<p>test</p>" />);

    const firstImage = document.querySelector('.docs-prose img') as HTMLImageElement;
    fireEvent.click(firstImage);

    const nextButton = screen.getByLabelText('Next image');
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const stopPropSpy = jest.spyOn(clickEvent, 'stopPropagation');

    fireEvent(nextButton, clickEvent);

    expect(stopPropSpy).toHaveBeenCalled();
  });
});
