import { render, screen } from '@testing-library/react';
import { Home, Settings, User } from 'lucide-react';
import { PageHeader } from '../page-header';

describe('PageHeader', () => {
  it('renders with title and subtitle', () => {
    render(
      <PageHeader
        icon={Home}
        title="Welcome"
        subtitle="This is a subtitle"
      />
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  it('renders the icon component', () => {
    const { container } = render(
      <PageHeader
        icon={Settings}
        title="Settings"
        subtitle="Configure your app"
      />
    );

    // Check that the icon container exists with correct styling
    const iconContainer = container.querySelector('.from-\\[\\#FF5C25\\]\\/20');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass(
      'flex',
      'h-16',
      'w-16',
      'items-center',
      'justify-center',
      'rounded-2xl',
      'border',
      'border-border',
      'bg-gradient-to-br'
    );
  });

  it('renders with correct heading level', () => {
    render(
      <PageHeader
        icon={User}
        title="User Profile"
        subtitle="Manage your profile"
      />
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('User Profile');
  });

  it('renders title with correct classes', () => {
    render(
      <PageHeader
        icon={Home}
        title="Test Title"
        subtitle="Test Subtitle"
      />
    );

    const heading = screen.getByRole('heading', { name: 'Test Title' });
    expect(heading).toHaveClass('text-4xl', 'font-semibold', 'tracking-tight', 'text-foreground');
  });

  it('renders subtitle with correct classes', () => {
    render(
      <PageHeader
        icon={Home}
        title="Title"
        subtitle="Subtitle Text"
      />
    );

    const subtitle = screen.getByText('Subtitle Text');
    expect(subtitle).toHaveClass('mt-2', 'text-sm', 'text-muted-foreground');
    expect(subtitle.tagName).toBe('P');
  });

  it('renders with correct layout structure', () => {
    const { container } = render(
      <PageHeader
        icon={Settings}
        title="Layout Test"
        subtitle="Testing layout"
      />
    );

    const wrapper = container.querySelector('.mb-12.flex.items-center.gap-4');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders different icons correctly', () => {
    const { rerender, container } = render(
      <PageHeader
        icon={Home}
        title="Home"
        subtitle="Home page"
      />
    );

    let iconContainer = container.querySelector('.from-\\[\\#FF5C25\\]\\/20');
    expect(iconContainer).toBeInTheDocument();

    rerender(
      <PageHeader
        icon={User}
        title="User"
        subtitle="User page"
      />
    );

    iconContainer = container.querySelector('.from-\\[\\#FF5C25\\]\\/20');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders icon with correct styling', () => {
    const { container } = render(
      <PageHeader
        icon={Settings}
        title="Settings"
        subtitle="App settings"
      />
    );

    const iconElement = container.querySelector('.text-\\[\\#FF5C25\\]');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('h-8', 'w-8');
  });

  it('renders text content in correct container', () => {
    render(
      <PageHeader
        icon={Home}
        title="Content Test"
        subtitle="Testing content container"
      />
    );

    const title = screen.getByText('Content Test');
    const subtitle = screen.getByText('Testing content container');

    // Both title and subtitle should have the same parent div
    expect(title.parentElement).toBe(subtitle.parentElement);
    expect(title.parentElement?.tagName).toBe('DIV');
  });

  it('maintains proper spacing between elements', () => {
    const { container } = render(
      <PageHeader
        icon={Settings}
        title="Spacing Test"
        subtitle="Test subtitle"
      />
    );

    const mainContainer = container.querySelector('.mb-12.flex.items-center.gap-4');
    expect(mainContainer).toBeInTheDocument();
  });
});
