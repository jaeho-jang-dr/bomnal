import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'font-bold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary/30';

    const variantStyles = {
      primary: 'bg-primary hover:bg-primary-hover active:bg-primary-active text-white shadow-md hover:shadow-lg',
      secondary: 'bg-warm-cream hover:bg-oak-border border-2 border-oak-border text-primary dark:bg-white/5 dark:border-white/10 dark:text-white',
      ghost: 'bg-transparent hover:bg-warm-cream text-primary dark:hover:bg-white/5 dark:text-white',
      success: 'bg-success hover:bg-success-light text-white shadow-md hover:shadow-lg',
    };

    const sizeStyles = {
      sm: 'min-h-[44px] px-4 text-base',
      md: 'min-h-[56px] px-6 text-lg',
      lg: 'min-h-[64px] px-8 text-xl',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
