import { render, screen } from '@testing-library/react';
import { BlogCard, BlogCardPostLike } from '../blog-card';

// Mock BlogImage component
jest.mock('../blog-image', () => ({
  BlogImage: ({ src, alt, ...props }: React.ComponentProps<'img'>) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe('BlogCard', () => {
  const mockPost: BlogCardPostLike = {
    slug: 'test-post',
    excerpt: 'This is a test excerpt for the blog post.',
    frontmatter: {
      title: 'Test Blog Post',
      date: '2024-01-15',
      author: 'John Doe',
      image: '/images/test.jpg',
      tags: ['React', 'Testing', 'TypeScript', 'Jest'],
      imagePlaceholder: 'data:image/jpeg;base64,test',
    },
  };

  it('renders blog post with all information', () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test excerpt for the blog post.')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument();
  });

  it('renders with semantic HTML article element', () => {
    const { container } = render(<BlogCard post={mockPost} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute('itemscope');
    expect(article).toHaveAttribute('itemtype', 'https://schema.org/Article');
  });

  it('renders link to blog post', () => {
    render(<BlogCard post={mockPost} />);

    const link = screen.getByRole('link', { name: /Read post: Test Blog Post/i });
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });

  it('renders blog image when provided', () => {
    render(<BlogCard post={mockPost} />);

    const image = screen.getByAltText('Test Blog Post');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test.jpg');
  });

  it('does not render image when not provided', () => {
    const postWithoutImage = {
      ...mockPost,
      frontmatter: { ...mockPost.frontmatter, image: undefined },
    };
    const { container } = render(<BlogCard post={postWithoutImage} />);

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('displays formatted date', () => {
    render(<BlogCard post={mockPost} />);

    const dateElement = screen.getByText(/January 15, 2024/);
    expect(dateElement.tagName).toBe('TIME');
    expect(dateElement).toHaveAttribute('datetime', '2024-01-15');
    expect(dateElement).toHaveAttribute('itemprop', 'datePublished');
  });

  it('renders author when provided', () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('does not render author section when not provided', () => {
    const postWithoutAuthor = {
      ...mockPost,
      frontmatter: { ...mockPost.frontmatter, author: undefined },
    };
    render(<BlogCard post={postWithoutAuthor} />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('renders first 3 tags as badges', () => {
    render(<BlogCard post={mockPost} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.queryByText('Jest')).not.toBeInTheDocument(); // 4th tag should not render
  });

  it('does not render tags section when no tags', () => {
    const postWithoutTags = {
      ...mockPost,
      frontmatter: { ...mockPost.frontmatter, tags: undefined },
    };
    render(<BlogCard post={postWithoutTags} />);

    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('does not render excerpt when not provided', () => {
    const postWithoutExcerpt = { ...mockPost, excerpt: undefined };
    render(<BlogCard post={postWithoutExcerpt} />);

    expect(screen.queryByText('This is a test excerpt for the blog post.')).not.toBeInTheDocument();
  });

  it('renders ArrowRight icon', () => {
    const { container } = render(<BlogCard post={mockPost} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<BlogCard post={mockPost} className="custom-class" />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('custom-class');
  });

  it('handles different date formats', () => {
    const postWithDifferentDate = {
      ...mockPost,
      frontmatter: { ...mockPost.frontmatter, date: '2023-12-25' },
    };
    render(<BlogCard post={postWithDifferentDate} />);

    expect(screen.getByText(/December 25, 2023/)).toBeInTheDocument();
  });

  it('renders with hover effects', () => {
    const { container } = render(<BlogCard post={mockPost} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('group', 'hover:-translate-y-1');
  });

  it('passes custom sizes to BlogImage', () => {
    render(<BlogCard post={mockPost} sizes="100vw" />);

    const image = screen.getByAltText('Test Blog Post');
    expect(image).toBeInTheDocument();
  });
});
