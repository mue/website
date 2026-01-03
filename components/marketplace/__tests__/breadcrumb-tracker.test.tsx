import { render } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { BreadcrumbTracker } from '../breadcrumb-tracker';
import { EmbedProvider } from '@/lib/embed-context';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(() => '/marketplace'),
}));

describe('BreadcrumbTracker', () => {
  let mockPostMessage: jest.Mock;

  beforeEach(() => {
    mockPostMessage = jest.fn();
    Object.defineProperty(window, 'parent', {
      writable: true,
      value: {
        postMessage: mockPostMessage,
      },
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send breadcrumbs in embed mode', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
    });

    const breadcrumbs = [
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Photo Packs', href: '/marketplace?type=photo_packs' },
      { label: 'Mountains Pack' },
    ];

    render(
      <EmbedProvider>
        <BreadcrumbTracker breadcrumbs={breadcrumbs} />
      </EmbedProvider>
    );

    expect(mockPostMessage).toHaveBeenCalledWith(
      {
        type: 'marketplace:breadcrumbs',
        payload: { breadcrumbs },
      },
      '*'
    );
  });

  it('should not send breadcrumbs in normal mode', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
    });

    const breadcrumbs = [
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Item' },
    ];

    render(
      <EmbedProvider>
        <BreadcrumbTracker breadcrumbs={breadcrumbs} />
      </EmbedProvider>
    );

    expect(mockPostMessage).not.toHaveBeenCalled();
  });

  it('should send breadcrumbs with proper structure', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
    });

    const breadcrumbs = [
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Authors', href: '/marketplace/authors?embed=true' },
      { label: 'John Doe' },
    ];

    render(
      <EmbedProvider>
        <BreadcrumbTracker breadcrumbs={breadcrumbs} />
      </EmbedProvider>
    );

    expect(mockPostMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'marketplace:breadcrumbs',
        payload: expect.objectContaining({
          breadcrumbs: expect.arrayContaining([
            expect.objectContaining({ label: 'Marketplace' }),
            expect.objectContaining({ label: 'Authors' }),
            expect.objectContaining({ label: 'John Doe' }),
          ]),
        }),
      }),
      '*'
    );
  });

  it('should handle breadcrumbs without href', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
    });

    const breadcrumbs = [
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Current Page' }, // No href for current page
    ];

    render(
      <EmbedProvider>
        <BreadcrumbTracker breadcrumbs={breadcrumbs} />
      </EmbedProvider>
    );

    expect(mockPostMessage).toHaveBeenCalledWith(
      {
        type: 'marketplace:breadcrumbs',
        payload: {
          breadcrumbs: [
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'Current Page' },
          ],
        },
      },
      '*'
    );
  });

  it('should render nothing (null component)', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
    });

    const { container } = render(
      <EmbedProvider>
        <BreadcrumbTracker breadcrumbs={[{ label: 'Test' }]} />
      </EmbedProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should update when breadcrumbs change', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
    });

    const breadcrumbs1 = [{ label: 'Page 1' }];
    const breadcrumbs2 = [{ label: 'Page 2' }];

    const { rerender } = render(
      <EmbedProvider>
        <BreadcrumbTracker breadcrumbs={breadcrumbs1} />
      </EmbedProvider>
    );

    expect(mockPostMessage).toHaveBeenCalledWith(
      {
        type: 'marketplace:breadcrumbs',
        payload: { breadcrumbs: breadcrumbs1 },
      },
      '*'
    );

    mockPostMessage.mockClear();

    rerender(
      <EmbedProvider>
        <BreadcrumbTracker breadcrumbs={breadcrumbs2} />
      </EmbedProvider>
    );

    expect(mockPostMessage).toHaveBeenCalledWith(
      {
        type: 'marketplace:breadcrumbs',
        payload: { breadcrumbs: breadcrumbs2 },
      },
      '*'
    );
  });
});
