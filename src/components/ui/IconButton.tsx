import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  size?: 'md' | 'lg';
  variant?: 'default' | 'primary';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, size = 'md', variant = 'default', className = '', ...props }, ref) => {
    const sizeStyles = {
      md: 'size-12',
      lg: 'size-16',
    };

    const iconSizes = {
      md: '28px',
      lg: '32px',
    };

    const variantStyles = {
      default: 'bg-warm-cream dark:bg-white/5 border border-oak-border dark:border-white/10 text-primary dark:text-white',
      primary: 'bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg',
    };

    return (
      <button
        ref={ref}
        className={`
          flex items-center justify-center rounded-full
          transition-all duration-200 active:scale-90
          focus:outline-none focus:ring-4 focus:ring-primary/30
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${className}
        `}
        aria-label={label}
        {...props}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: iconSizes[size] }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
