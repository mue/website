import { render, screen } from '@testing-library/react';
import { ContentSection } from '../content-section';

describe('ContentSection', () => {
  it('renders with title and children', () => {
    render(
      <ContentSection title="Test Title">
        <p>Test content</p>
      </ContentSection>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with default large title size', () => {
    render(
      <ContentSection title="Large Title">
        <p>Content</p>
      </ContentSection>,
    );

    const heading = screen.getByRole('heading', { name: 'Large Title' });
    expect(heading).toHaveClass('text-2xl', 'font-semibold', 'text-foreground');
  });

  it('renders with small title size', () => {
    render(
      <ContentSection title="Small Title" titleSize="sm">
        <p>Content</p>
      </ContentSection>,
    );

    const heading = screen.getByRole('heading', { name: 'Small Title' });
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'text-foreground');
  });

  it('renders with medium title size', () => {
    render(
      <ContentSection title="Medium Title" titleSize="md">
        <p>Content</p>
      </ContentSection>,
    );

    const heading = screen.getByRole('heading', { name: 'Medium Title' });
    expect(heading).toHaveClass('text-xl', 'font-semibold', 'text-foreground');
  });

  it('renders with large title size when explicitly set', () => {
    render(
      <ContentSection title="Explicit Large" titleSize="lg">
        <p>Content</p>
      </ContentSection>,
    );

    const heading = screen.getByRole('heading', { name: 'Explicit Large' });
    expect(heading).toHaveClass('text-2xl', 'font-semibold', 'text-foreground');
  });

  it('renders section with correct semantic markup', () => {
    const { container } = render(
      <ContentSection title="Test">
        <p>Content</p>
      </ContentSection>,
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('renders children in a div with correct classes', () => {
    const { container } = render(
      <ContentSection title="Test">
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </ContentSection>,
    );

    const contentDiv = container.querySelector('div.mt-4.space-y-4.text-muted-foreground');
    expect(contentDiv).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <ContentSection title="Multi Children">
        <p>First paragraph</p>
        <p>Second paragraph</p>
        <div>Third element</div>
      </ContentSection>,
    );

    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    expect(screen.getByText('Third element')).toBeInTheDocument();
  });

  it('renders heading as h2 element', () => {
    render(
      <ContentSection title="H2 Test">
        <p>Content</p>
      </ContentSection>,
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('H2 Test');
  });

  it('handles complex React node children', () => {
    render(
      <ContentSection title="Complex Content">
        <div>
          <strong>Bold text</strong>
          <em>Italic text</em>
        </div>
      </ContentSection>,
    );

    expect(screen.getByText('Bold text')).toBeInTheDocument();
    expect(screen.getByText('Italic text')).toBeInTheDocument();
  });
});
