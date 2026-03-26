import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  describe('accessibility', () => {
    it('renders without a11y violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('renders loading state without a11y violations', async () => {
      const { container } = render(<Button isLoading>Submit</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('renders destructive variant without a11y violations', async () => {
      const { container } = render(<Button variant="destructive">Delete</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Button>Add to Cart</Button>);
      expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
    });

    it('defaults to type="button" to prevent accidental form submission', () => {
      render(<Button>Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('allows overriding type to "submit"', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('polymorphic rendering', () => {
    it('renders as an anchor element', () => {
      render(
        <Button as="a" href="/products">
          Shop Now
        </Button>,
      );
      const link = screen.getByRole('link', { name: 'Shop Now' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/products');
    });

    it('renders as a span', () => {
      render(<Button as="span">Span Button</Button>);
      expect(screen.getByText('Span Button').tagName).toBe('SPAN');
    });
  });

  describe('loading state', () => {
    it('sets aria-busy when loading', () => {
      render(<Button isLoading>Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('disables the button when loading', () => {
      render(<Button isLoading>Submit</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('shows the loading label for screen readers', () => {
      render(<Button isLoading loadingLabel="Processing your order">Submit</Button>);
      expect(screen.getByText('Processing your order')).toBeInTheDocument();
    });

    it('does not block click when not loading', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Button onClick={handler}>Click</Button>);
      await user.click(screen.getByRole('button'));
      expect(handler).toHaveBeenCalledOnce();
    });

    it('prevents click when loading', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Button isLoading onClick={handler}>Click</Button>);
      await user.click(screen.getByRole('button'));
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('disables via disabled prop', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('prevents click when disabled', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Button disabled onClick={handler}>Disabled</Button>);
      await user.click(screen.getByRole('button'));
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('variants', () => {
    it.each(['primary', 'secondary', 'ghost', 'destructive', 'outline', 'link'] as const)(
      'renders %s variant',
      (variant) => {
        render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      },
    );
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg', 'icon'] as const)('renders %s size', (size) => {
      render(<Button size={size}>{size}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('keyboard interaction', () => {
    it('is focusable via keyboard', async () => {
      const user = userEvent.setup();
      render(<Button>Focus me</Button>);
      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('triggers click on Enter key', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Button onClick={handler}>Press Enter</Button>);
      screen.getByRole('button').focus();
      await user.keyboard('{Enter}');
      expect(handler).toHaveBeenCalledOnce();
    });

    it('triggers click on Space key', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Button onClick={handler}>Press Space</Button>);
      screen.getByRole('button').focus();
      await user.keyboard(' ');
      expect(handler).toHaveBeenCalledOnce();
    });
  });
});
