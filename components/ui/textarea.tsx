'use client';

import { cn } from '@/core/utils/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  hint?: string;
  resize?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export default function Textarea({
  error,
  label,
  hint,
  resize = false,
  className,
  id,
  ref,
  ...props
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium tracking-wide text-[#a0a0a0] uppercase"
          style={{ letterSpacing: '0.06em' }}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-lg outline-none',
          'bg-[#111111] text-[#f0f0f0] placeholder:text-[#3a3a3a]',
          'px-3.5 py-3 text-sm min-h-[120px] leading-relaxed',
          'transition-all duration-200',
          error
            ? [
                'border border-[rgba(248,113,113,0.4)]',
                'shadow-[0_0_0_1px_rgba(248,113,113,0.15)]',
                'focus:border-[rgba(248,113,113,0.7)] focus:shadow-[0_0_0_3px_rgba(248,113,113,0.1),0_0_16px_rgba(248,113,113,0.08)]',
              ].join(' ')
            : [
                'border border-[rgba(255,255,255,0.07)]',
                'hover:border-[rgba(255,255,255,0.12)]',
                'focus:border-[rgba(124,58,237,0.6)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12),0_0_20px_rgba(124,58,237,0.06)]',
              ].join(' '),
          'disabled:opacity-40 disabled:cursor-not-allowed',
          !resize && 'resize-none',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-[#f87171] flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
            <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.25" />
            <path d="M6 3.5v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            <circle cx="6" cy="8.5" r="0.625" fill="currentColor" />
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-[#6b6b6b]">{hint}</p>
      )}
    </div>
  );
}
