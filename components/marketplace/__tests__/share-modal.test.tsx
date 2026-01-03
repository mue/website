import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShareModal } from '../share-modal';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
  share: undefined, // Disable native share for testing
});

describe('ShareModal', () => {
  const defaultProps = {
    url: 'https://muetab.com/marketplace/item/123',
    title: 'Test Item - Mue Marketplace',
    description: 'Check out Test Item on Mue Marketplace',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('embed mode positioning', () => {
    it('should apply top positioning when isEmbed is true', () => {
      const { container } = render(<ShareModal {...defaultProps} isEmbed={true} />);

      // Click trigger to open modal
      const trigger = screen.getByRole('button', { name: /share/i });
      fireEvent.click(trigger);

      // Find the dialog content
      const dialogContent = container.querySelector('[role="dialog"]');
      expect(dialogContent).toHaveClass('top-[10%]', 'translate-y-0');
    });

    it('should not apply top positioning when isEmbed is false', () => {
      const { container } = render(<ShareModal {...defaultProps} isEmbed={false} />);

      // Click trigger to open modal
      const trigger = screen.getByRole('button', { name: /share/i });
      fireEvent.click(trigger);

      // Find the dialog content
      const dialogContent = container.querySelector('[role="dialog"]');
      expect(dialogContent).not.toHaveClass('top-[10%]');
      expect(dialogContent).not.toHaveClass('translate-y-0');
    });

    it('should default to normal positioning when isEmbed is not provided', () => {
      const { container } = render(<ShareModal {...defaultProps} />);

      // Click trigger to open modal
      const trigger = screen.getByRole('button', { name: /share/i });
      fireEvent.click(trigger);

      // Find the dialog content
      const dialogContent = container.querySelector('[role="dialog"]');
      expect(dialogContent).not.toHaveClass('top-[10%]');
    });
  });

  describe('modal functionality', () => {
    it('should render trigger button', () => {
      render(<ShareModal {...defaultProps} />);
      expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
    });

    it('should open modal when trigger is clicked', async () => {
      render(<ShareModal {...defaultProps} />);

      const trigger = screen.getByRole('button', { name: /share/i });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Share this item')).toBeInTheDocument();
      });
    });

    it('should display the URL in the modal', async () => {
      render(<ShareModal {...defaultProps} />);

      const trigger = screen.getByRole('button', { name: /share/i });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText(defaultProps.url)).toBeInTheDocument();
      });
    });

    it('should copy URL to clipboard when copy button is clicked', async () => {
      const user = userEvent.setup();
      render(<ShareModal {...defaultProps} />);

      // Open modal
      const trigger = screen.getByRole('button', { name: /share/i });
      await user.click(trigger);

      // Click copy button
      const copyButton = screen.getByRole('button', { name: /copy/i });
      await user.click(copyButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(defaultProps.url);
      });
    });

    it('should show "Copied" text after copying', async () => {
      const user = userEvent.setup();
      render(<ShareModal {...defaultProps} />);

      // Open modal
      const trigger = screen.getByRole('button', { name: /share/i });
      await user.click(trigger);

      // Click copy button
      const copyButton = screen.getByRole('button', { name: /copy/i });
      await user.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText('Copied')).toBeInTheDocument();
      });
    });

    it('should render social media share buttons', async () => {
      render(<ShareModal {...defaultProps} />);

      const trigger = screen.getByRole('button', { name: /share/i });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Twitter')).toBeInTheDocument();
        expect(screen.getByText('Facebook')).toBeInTheDocument();
        expect(screen.getByText('Reddit')).toBeInTheDocument();
      });
    });
  });

  describe('custom trigger', () => {
    it('should render custom trigger when provided', () => {
      const customTrigger = <button>Custom Share Button</button>;
      render(<ShareModal {...defaultProps} trigger={customTrigger} />);

      expect(screen.getByText('Custom Share Button')).toBeInTheDocument();
    });

    it('should open modal when custom trigger is clicked', async () => {
      const customTrigger = <button>Custom Share Button</button>;
      render(<ShareModal {...defaultProps} trigger={customTrigger} />);

      const trigger = screen.getByText('Custom Share Button');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Share this item')).toBeInTheDocument();
      });
    });
  });

  describe('embed mode with custom trigger', () => {
    it('should apply embed positioning with custom trigger', async () => {
      const customTrigger = <button>Share</button>;
      const { container } = render(
        <ShareModal {...defaultProps} trigger={customTrigger} isEmbed={true} />
      );

      const trigger = screen.getByText('Share');
      fireEvent.click(trigger);

      await waitFor(() => {
        const dialogContent = container.querySelector('[role="dialog"]');
        expect(dialogContent).toHaveClass('top-[10%]', 'translate-y-0');
      });
    });
  });
});
