import { render, screen, waitFor } from '@testing-library/react';
import { useSearchParams, usePathname } from 'next/navigation';
import { EmbedProvider, useEmbed, EmbedLayoutWrapper } from '../embed-context';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(() => '/marketplace'),
}));

// Mock Navbar, Footer, and ScrollToTop components
jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">Navbar</div>,
}));

jest.mock('@/components/footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('@/components/scroll-to-top', () => ({
  ScrollToTop: () => <div data-testid="scroll-to-top">ScrollToTop</div>,
}));

// Test component that uses the embed context
function TestComponent() {
  const { isEmbed, sendMessage, config } = useEmbed();
  return (
    <div>
      <p data-testid="is-embed">{isEmbed ? 'true' : 'false'}</p>
      <p data-testid="config-theme">{config.theme || 'none'}</p>
      <button type="button" onClick={() => sendMessage('test:event', { data: 'test' })}>
        Send Message
      </button>
    </div>
  );
}

describe('EmbedContext', () => {
  let mockPostMessage: jest.Mock;
  let mockAddEventListener: jest.Mock;
  let mockRemoveEventListener: jest.Mock;

  beforeEach(() => {
    mockPostMessage = jest.fn();
    mockAddEventListener = jest.fn();
    mockRemoveEventListener = jest.fn();

    // Mock window.parent.postMessage
    Object.defineProperty(window, 'parent', {
      writable: true,
      value: {
        postMessage: mockPostMessage,
      },
    });

    // Mock window event listeners
    window.addEventListener = mockAddEventListener;
    window.removeEventListener = mockRemoveEventListener;

    // Reset navigation mocks
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isEmbed detection', () => {
    it('should detect embed mode when ?embed=true is in URL', () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      expect(screen.getByTestId('is-embed')).toHaveTextContent('true');
    });

    it('should not be in embed mode when ?embed is missing', () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      expect(screen.getByTestId('is-embed')).toHaveTextContent('false');
    });

    it('should not be in embed mode when ?embed=false', () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn((key: string) => (key === 'embed' ? 'false' : null)),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      expect(screen.getByTestId('is-embed')).toHaveTextContent('false');
    });
  });

  describe('sendMessage', () => {
    it('should send postMessage when in embed mode', () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      const button = screen.getByText('Send Message');
      button.click();

      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'test:event', payload: { data: 'test' } },
        '*'
      );
    });

    it('should not send postMessage when not in embed mode', () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      const button = screen.getByText('Send Message');
      button.click();

      expect(mockPostMessage).not.toHaveBeenCalled();
    });
  });

  describe('marketplace:ready event', () => {
    it('should send marketplace:ready on mount in embed mode', async () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      await waitFor(() => {
        expect(mockPostMessage).toHaveBeenCalledWith(
          { type: 'marketplace:ready', payload: null },
          '*'
        );
      });
    });

    it('should not send marketplace:ready when not in embed mode', async () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      await waitFor(() => {
        expect(mockPostMessage).not.toHaveBeenCalled();
      });
    });
  });

  describe('message listener', () => {
    it('should add message listener in embed mode', () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      expect(mockAddEventListener).toHaveBeenCalledWith('message', expect.any(Function));
    });

    it('should not add message listener when not in embed mode', () => {
      (useSearchParams as jest.Mock).mockReturnValue({
        get: jest.fn(() => null),
      });

      render(
        <EmbedProvider>
          <TestComponent />
        </EmbedProvider>
      );

      expect(mockAddEventListener).not.toHaveBeenCalled();
    });
  });
});

describe('EmbedLayoutWrapper', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
    });
  });

  it('should render navbar, footer, and ScrollToTop in normal mode', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
    });

    render(
      <EmbedProvider>
        <EmbedLayoutWrapper>
          <div data-testid="content">Main Content</div>
        </EmbedLayoutWrapper>
      </EmbedProvider>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should only render main content in embed mode', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
    });

    render(
      <EmbedProvider>
        <EmbedLayoutWrapper>
          <div data-testid="content">Main Content</div>
        </EmbedLayoutWrapper>
      </EmbedProvider>
    );

    expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    expect(screen.queryByTestId('scroll-to-top')).not.toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should render main tag with flex-1 class in embed mode', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((key: string) => (key === 'embed' ? 'true' : null)),
    });

    const { container } = render(
      <EmbedProvider>
        <EmbedLayoutWrapper>
          <div>Content</div>
        </EmbedLayoutWrapper>
      </EmbedProvider>
    );

    const main = container.querySelector('main');
    expect(main).toHaveClass('flex-1');
  });
});
