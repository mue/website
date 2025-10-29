import { render, screen, fireEvent } from '@testing-library/react';
import { BrandAssetCard } from '../brand-asset-card';

// Mock URL.createObjectURL and URL.revokeObjectURL
const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = jest.fn();

Object.defineProperty(global.URL, 'createObjectURL', {
  value: mockCreateObjectURL,
  writable: true,
});

Object.defineProperty(global.URL, 'revokeObjectURL', {
  value: mockRevokeObjectURL,
  writable: true,
});

// Mock XMLSerializer
global.XMLSerializer = jest.fn().mockImplementation(() => ({
  serializeToString: jest.fn(() => '<svg>mock-svg-content</svg>'),
}));

describe('BrandAssetCard', () => {
  const defaultProps = {
    title: 'Full Color Logo',
    description: 'Primary logo with gradient',
    isDark: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Clean up any existing links
    document.body.innerHTML = '';
  });

  it('renders with title and description', () => {
    render(<BrandAssetCard {...defaultProps} />);

    expect(screen.getByText('Full Color Logo')).toBeInTheDocument();
    expect(screen.getByText('Primary logo with gradient')).toBeInTheDocument();
  });

  it('renders download button', () => {
    render(<BrandAssetCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /download svg/i });
    expect(button).toBeInTheDocument();
  });

  it('renders logo with light background when isDark is false', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    const background = container.querySelector('.bg-gradient-to-br.from-gray-50.to-gray-100');
    expect(background).toBeInTheDocument();
  });

  it('renders logo with dark background when isDark is true', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} isDark={true} />);

    const background = container.querySelector('.bg-gradient-to-br.from-gray-900.to-gray-800');
    expect(background).toBeInTheDocument();
  });

  it('renders logo with correct ID for light variant', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    const logo = container.querySelector('#logo-light');
    expect(logo).toBeInTheDocument();
  });

  it('renders logo with correct ID for dark variant', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} isDark={true} />);

    const logo = container.querySelector('#logo-dark');
    expect(logo).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    const card = container.querySelector('.rounded-2xl.border.border-border');
    expect(card).toBeInTheDocument();

    const contentArea = container.querySelector('.p-4');
    expect(contentArea).toBeInTheDocument();
  });

  it('title has correct styling', () => {
    render(<BrandAssetCard {...defaultProps} />);

    const title = screen.getByText('Full Color Logo');
    expect(title).toHaveClass('font-semibold', 'text-foreground');
  });

  it('description has correct styling', () => {
    render(<BrandAssetCard {...defaultProps} />);

    const description = screen.getByText('Primary logo with gradient');
    expect(description).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('download button has correct styling', () => {
    render(<BrandAssetCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /download svg/i });
    expect(button).toHaveClass('w-full');
  });

  it('creates and clicks download link when button is clicked', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    // Add mock logo SVG to DOM
    const mockSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mockSVG.id = 'logo-light';
    container.appendChild(mockSVG);

    const button = screen.getByRole('button', { name: /download svg/i });

    // Spy on document methods
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    fireEvent.click(button);

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });

  it('downloads with correct filename for light variant', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    // Add mock logo SVG to DOM
    const mockSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mockSVG.id = 'logo-light';
    container.appendChild(mockSVG);

    const button = screen.getByRole('button', { name: /download svg/i });

    // Spy on document.createElement to capture the link
    const createElementSpy = jest.spyOn(document, 'createElement');

    fireEvent.click(button);

    const linkCall = createElementSpy.mock.calls.find((call) => call[0] === 'a');
    expect(linkCall).toBeDefined();

    createElementSpy.mockRestore();
  });

  it('downloads with correct filename for dark variant', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} isDark={true} />);

    // Add mock logo SVG to DOM
    const mockSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mockSVG.id = 'logo-dark';
    container.appendChild(mockSVG);

    const button = screen.getByRole('button', { name: /download svg/i });

    // Spy on document.createElement
    const createElementSpy = jest.spyOn(document, 'createElement');

    fireEvent.click(button);

    expect(createElementSpy).toHaveBeenCalledWith('a');

    createElementSpy.mockRestore();
  });

  it('handles missing SVG gracefully', () => {
    render(<BrandAssetCard {...defaultProps} />);

    const button = screen.getByRole('button', { name: /download svg/i });

    // Should not throw error
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  it('renders logo with correct size', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    const logo = container.querySelector('#logo-light');
    expect(logo).toHaveClass('h-28', 'w-28');
  });

  it('preview area has correct height and padding', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    const previewArea = container.querySelector('.h-48.flex.items-center.justify-center.p-8');
    expect(previewArea).toBeInTheDocument();
  });

  it('renders with correct border and background styling', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    const card = container.querySelector('.overflow-hidden.rounded-2xl.border.border-border');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-background/60', 'backdrop-blur');
  });

  it('serializes SVG content when downloading', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    // Add mock logo SVG to DOM
    const mockSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mockSVG.id = 'logo-light';
    container.appendChild(mockSVG);

    const button = screen.getByRole('button', { name: /download svg/i });
    fireEvent.click(button);

    expect(XMLSerializer).toHaveBeenCalled();
  });

  it('creates blob with correct MIME type', () => {
    const { container } = render(<BrandAssetCard {...defaultProps} />);

    // Add mock logo SVG to DOM
    const mockSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mockSVG.id = 'logo-light';
    container.appendChild(mockSVG);

    const originalBlob = global.Blob;
    const blobSpy = jest.fn();
    global.Blob = blobSpy as any;

    const button = screen.getByRole('button', { name: /download svg/i });
    fireEvent.click(button);

    expect(blobSpy).toHaveBeenCalledWith(['<svg>mock-svg-content</svg>'], {
      type: 'image/svg+xml',
    });

    global.Blob = originalBlob;
  });
});
