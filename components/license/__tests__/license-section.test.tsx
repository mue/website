import { render, screen } from '@testing-library/react';
import { LicenseSection } from '../license-section';

describe('LicenseSection', () => {
  const defaultProps = {
    title: 'Test License',
    licenseName: 'MIT',
    licenseColor: '#00FF00',
    description: <p>Test description</p>,
    copyrights: <div>Copyright info</div>,
    links: <a href="#">Link</a>,
  };

  it('renders title and license name', () => {
    render(<LicenseSection {...defaultProps} />);

    expect(screen.getByText('Test License')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('renders description content', () => {
    render(<LicenseSection {...defaultProps} />);

    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders copyright information', () => {
    render(<LicenseSection {...defaultProps} />);

    expect(screen.getByText('Copyright info')).toBeInTheDocument();
  });

  it('renders links', () => {
    render(<LicenseSection {...defaultProps} />);

    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
  });

  it('applies license color to badge', () => {
    render(<LicenseSection {...defaultProps} />);

    const badge = screen.getByText('MIT');

    expect(badge).toHaveStyle({
      borderColor: '#00FF0040',
      backgroundColor: '#00FF0010',
      color: '#00FF00',
    });
  });

  it('renders as semantic section element', () => {
    const { container } = render(<LicenseSection {...defaultProps} />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('displays license name in uppercase via CSS', () => {
    render(<LicenseSection {...defaultProps} licenseName="apache-2.0" />);

    const badge = screen.getByText('apache-2.0');
    expect(badge).toHaveClass('uppercase');
  });

  it('renders with gradient background when gradient prop is true', () => {
    const { container } = render(<LicenseSection {...defaultProps} gradient={true} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('border-border', 'bg-background/60');
  });

  it('renders without gradient when gradient prop is false', () => {
    const { container } = render(<LicenseSection {...defaultProps} gradient={false} />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('border-border', 'bg-background/60');
  });

  it('handles different license colors', () => {
    const { rerender } = render(
      <LicenseSection {...defaultProps} licenseColor="#FF0000" licenseName="GPL" />,
    );

    let badge = screen.getByText('GPL');
    expect(badge).toHaveStyle({ color: '#FF0000' });

    rerender(<LicenseSection {...defaultProps} licenseColor="#0000FF" licenseName="BSD" />);

    badge = screen.getByText('BSD');
    expect(badge).toHaveStyle({ color: '#0000FF' });
  });

  it('renders complex ReactNode children', () => {
    render(
      <LicenseSection
        {...defaultProps}
        description={
          <div>
            <p>First paragraph</p>
            <p>Second paragraph</p>
          </div>
        }
      />,
    );

    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
  });

  it('renders multiple links', () => {
    render(
      <LicenseSection
        {...defaultProps}
        links={
          <>
            <a href="#1">Link 1</a>
            <a href="#2">Link 2</a>
            <a href="#3">Link 3</a>
          </>
        }
      />,
    );

    expect(screen.getByRole('link', { name: 'Link 1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Link 2' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Link 3' })).toBeInTheDocument();
  });

  it('renders h2 heading for title', () => {
    render(<LicenseSection {...defaultProps} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test License');
  });
});
