import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref
  ) => {
    // Create a wrapper div to maintain the original content's dimensions
    const contentWrapper = (content: React.ReactNode) => (
      <div className="relative w-full">
        {/* Hidden content to maintain size */}
        <div className="invisible">{content}</div>
        {/* Absolute positioned loader */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        {/* Visible content when not loading */}
        <div className={cn("absolute inset-0 flex items-center justify-center", {
          'invisible': loading
        })}>
          {content}
        </div>
      </div>
    );

    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          {React.Children.map(
            children as React.ReactElement,
            (child: React.ReactElement) => {
              return React.cloneElement(child, {
                className: cn(buttonVariants({ variant, size }), className),
                children: contentWrapper(child.props.children),
              });
            }
          )}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
        ref={ref}
        {...props}
      >
        {contentWrapper(children)}
      </button>
    );
  }
);
LoadingButton.displayName = 'LoadingButton';

export { LoadingButton, buttonVariants };
