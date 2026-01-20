import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const uniqueId = useId();
    const inputId = id || `input-${uniqueId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-lg font-bold text-primary dark:text-white mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full min-h-[56px] px-4 text-lg
            bg-white dark:bg-white/5
            border-2 rounded-xl
            ${error
              ? 'border-error focus:border-error focus:ring-error/30'
              : 'border-oak-border dark:border-white/10 focus:border-primary focus:ring-primary/30'
            }
            text-primary dark:text-white
            placeholder:text-text-tertiary dark:placeholder:text-text-tertiary-dark
            focus:outline-none focus:ring-4
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-2 text-base text-error font-semibold" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-2 text-base text-text-tertiary dark:text-text-tertiary-dark">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
