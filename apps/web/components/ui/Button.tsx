import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-6 py-3 rounded-lg transition-colors',
        {
          'bg-orange-600 text-white hover:bg-orange-700': variant === 'primary',
          'bg-white text-orange-600 border border-orange-600 hover:bg-orange-50':
            variant === 'outline',
          'bg-gray-100 text-gray-900 hover:bg-gray-200':
            variant === 'secondary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
