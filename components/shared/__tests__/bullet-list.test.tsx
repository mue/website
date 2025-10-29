import { render, screen } from '@testing-library/react';
import { BulletList } from '../bullet-list';

describe('BulletList', () => {
  it('renders a list with string items', () => {
    const items = ['First item', 'Second item', 'Third item'];
    render(<BulletList items={items} />);

    expect(screen.getByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Second item')).toBeInTheDocument();
    expect(screen.getByText('Third item')).toBeInTheDocument();
  });

  it('renders a list with ReactNode items', () => {
    const items = [
      <span key="1">Custom element 1</span>,
      <strong key="2">Bold text</strong>,
      <a key="3" href="#">
        Link text
      </a>,
    ];
    render(<BulletList items={items} />);

    expect(screen.getByText('Custom element 1')).toBeInTheDocument();
    expect(screen.getByText('Bold text')).toBeInTheDocument();
    expect(screen.getByText('Link text')).toBeInTheDocument();
  });

  it('renders a list with mixed string and ReactNode items', () => {
    const items = ['Plain text item', <span key="2">React node item</span>, 'Another plain text'];
    render(<BulletList items={items} />);

    expect(screen.getByText('Plain text item')).toBeInTheDocument();
    expect(screen.getByText('React node item')).toBeInTheDocument();
    expect(screen.getByText('Another plain text')).toBeInTheDocument();
  });

  it('renders an empty list when items array is empty', () => {
    const { container } = render(<BulletList items={[]} />);
    const list = container.querySelector('ul');

    expect(list).toBeInTheDocument();
    expect(list?.children).toHaveLength(0);
  });

  it('renders with correct CSS classes', () => {
    const items = ['Test item'];
    const { container } = render(<BulletList items={items} />);

    const list = container.querySelector('ul');
    expect(list).toHaveClass('mt-4', 'space-y-2', 'text-muted-foreground');
  });

  it('renders list items with correct structure', () => {
    const items = ['Test item'];
    const { container } = render(<BulletList items={items} />);

    const listItem = container.querySelector('li');
    expect(listItem).toHaveClass('flex', 'gap-3');

    const bullet = listItem?.querySelector('.bg-\\[\\#FF5C25\\]');
    expect(bullet).toBeInTheDocument();
    expect(bullet).toHaveClass(
      'mt-1.5',
      'inline-flex',
      'h-1.5',
      'w-1.5',
      'shrink-0',
      'rounded-full',
    );
  });

  it('renders correct number of items', () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    const { container } = render(<BulletList items={items} />);

    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(5);
  });
});
