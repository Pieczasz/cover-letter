import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-2xl transition-colors hover:cursor-pointer',
        {
          'bg-orange-600 text-white hover:bg-orange-600/85':
            variant === 'primary',
          'bg-white text-orange-600 border border-orange-600 hover:bg-orange-50':
            variant === 'outline',
          'bg-gray-100 text-gray-900 hover:bg-gray-200':
            variant === 'secondary',
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
