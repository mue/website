import { render, screen } from '@testing-library/react';
import { NumberedStep } from '../numbered-step';

describe('NumberedStep', () => {
  it('renders number, title, and description', () => {
    render(<NumberedStep number={1} title="First Step" description="This is the first step" />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('First Step')).toBeInTheDocument();
    expect(screen.getByText('This is the first step')).toBeInTheDocument();
  });

  it('renders number in gradient circle', () => {
    const { container } = render(
      <NumberedStep number={2} title="Step Two" description="Description" />,
    );

    const numberCircle = container.querySelector('.bg-gradient-to-br.from-\\[\\#FF5C25\\]');
    expect(numberCircle).toBeInTheDocument();
    expect(numberCircle).toHaveTextContent('2');
  });

  it('renders h3 heading for title', () => {
    render(<NumberedStep number={1} title="Step Title" description="Description" />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Step Title');
  });

  it('applies gradient colors to number circle', () => {
    const { container } = render(<NumberedStep number={3} title="Step" description="Desc" />);

    const circle = container.querySelector('.bg-gradient-to-br');
    expect(circle).toHaveClass('bg-gradient-to-br', 'from-[#FF5C25]', 'to-[#FF456E]');
  });

  it('renders number circle with correct size', () => {
    const { container } = render(
      <NumberedStep number={1} title="Title" description="Description" />,
    );

    const circle = container.querySelector('.bg-gradient-to-br');
    expect(circle).toHaveClass('h-8', 'w-8', 'rounded-full');
  });

  it('renders title with correct styling', () => {
    render(<NumberedStep number={1} title="Styled Title" description="Desc" />);

    const title = screen.getByText('Styled Title');
    expect(title).toHaveClass('font-semibold', 'text-foreground');
  });

  it('renders description with correct styling', () => {
    render(<NumberedStep number={1} title="Title" description="Styled description" />);

    const description = screen.getByText('Styled description');
    expect(description).toHaveClass('mt-1', 'text-sm', 'text-muted-foreground');
  });

  it('handles different numbers', () => {
    const { rerender } = render(<NumberedStep number={1} title="Step 1" description="First" />);
    expect(screen.getByText('1')).toBeInTheDocument();

    rerender(<NumberedStep number={99} title="Step 99" description="Ninety-nine" />);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('renders with flex layout', () => {
    const { container } = render(
      <NumberedStep number={1} title="Title" description="Description" />,
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'gap-4');
  });

  it('renders number circle as shrink-0', () => {
    const { container } = render(
      <NumberedStep number={1} title="Title" description="Description" />,
    );

    const circle = container.querySelector('.bg-gradient-to-br');
    expect(circle).toHaveClass('shrink-0');
  });

  it('handles long titles', () => {
    const longTitle = 'This is a very long title that should still render correctly';
    render(<NumberedStep number={1} title={longTitle} description="Description" />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('handles long descriptions', () => {
    const longDesc =
      'This is a very long description that contains multiple sentences and should wrap properly on smaller screens.';
    render(<NumberedStep number={1} title="Title" description={longDesc} />);

    expect(screen.getByText(longDesc)).toBeInTheDocument();
  });

  it('renders number with bold font', () => {
    render(<NumberedStep number={5} title="Title" description="Desc" />);

    const number = screen.getByText('5');
    expect(number).toHaveClass('text-sm', 'font-bold', 'text-white');
  });

  it('positions number and content with gap', () => {
    const { container } = render(
      <NumberedStep number={1} title="Title" description="Description" />,
    );

    expect(container.firstChild).toHaveClass('gap-4');
  });

  it('renders content in separate div', () => {
    const { container } = render(
      <NumberedStep number={1} title="Test Title" description="Test Description" />,
    );

    const contentDiv = container.querySelector('div > div');
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toContainElement(screen.getByText('Test Title'));
    expect(contentDiv).toContainElement(screen.getByText('Test Description'));
  });
});
