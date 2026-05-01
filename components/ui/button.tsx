'use client';

import { cn } from '@/core/utils/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: [
    'relative overflow-hidden',
    'bg-[#7c3aed] text-[#f0f0f0]',
    'border border-[rgba(255,255,255,0.12)]',
    'shadow-[0_0_20px_rgba(124,58,237,0.3),inset_0_1px_0_rgba(255,255,255,0.12)]',
    'hover:bg-[#8b47ff]',
    'hover:shadow-[0_0_32px_rgba(124,58,237,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]',
    'active:scale-[0.975] active:shadow-[0_0_16px_rgba(124,58,237,0.4)]',
    'before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300',
    'before:bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_50%)]',
    'hover:before:opacity-100',
  ].join(' '),
  secondary: [
    'bg-[#161616] text-[#d0d0d0]',
    'border border-[rgba(255,255,255,0.08)]',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
    'hover:bg-[#1c1c1c] hover:border-[rgba(255,255,255,0.12)] hover:text-[#f0f0f0]',
    'active:scale-[0.975]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[#6b6b6b]',
    'hover:text-[#f0f0f0] hover:bg-[rgba(255,255,255,0.04)]',
    'active:scale-[0.975]',
  ].join(' '),
  outline: [
    'bg-transparent text-[#9f5fff]',
    'border border-[rgba(124,58,237,0.4)]',
    'hover:bg-[rgba(124,58,237,0.08)] hover:border-[rgba(124,58,237,0.65)] hover:text-[#b87fff]',
    'hover:shadow-[0_0_16px_rgba(124,58,237,0.15)]',
    'active:scale-[0.975]',
  ].join(' '),
  destructive: [
    'bg-[rgba(248,113,113,0.12)] text-[#f87171]',
    'border border-[rgba(248,113,113,0.25)]',
    'hover:bg-[rgba(248,113,113,0.18)] hover:border-[rgba(248,113,113,0.4)]',
    'active:scale-[0.975]',
  ].join(' '),
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-6 text-[15px] gap-2.5 rounded-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <svg
          className="shrink-0 animate-spin"
          style={{ width: '14px', height: '14px' }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="32"
            strokeDashoffset="12"
          />
        </svg> : null}
      {children}
    </button>
  );
}
