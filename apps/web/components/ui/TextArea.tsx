import { TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className, ...props }: TextAreaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-orange-500 focus:border-transparent',
          className,
        )}
        {...props}
      />
    </div>
  );
}
