import { cn } from '@/core/utils/utils';

type Variant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'outline';

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  default: [
    'bg-[#1c1c1c] text-[#a0a0a0]',
    'border border-[rgba(255,255,255,0.08)]',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
  ].join(' '),
  accent: [
    'bg-[rgba(124,58,237,0.12)] text-[#b87fff]',
    'border border-[rgba(124,58,237,0.25)]',
    'shadow-[inset_0_0_12px_rgba(124,58,237,0.06)]',
  ].join(' '),
  success: [
    'bg-[rgba(52,211,153,0.08)] text-[#6ee7b7]',
    'border border-[rgba(52,211,153,0.2)]',
    'shadow-[inset_0_0_10px_rgba(52,211,153,0.05)]',
  ].join(' '),
  warning: [
    'bg-[rgba(251,191,36,0.08)] text-[#fcd34d]',
    'border border-[rgba(251,191,36,0.2)]',
    'shadow-[inset_0_0_10px_rgba(251,191,36,0.05)]',
  ].join(' '),
  error: [
    'bg-[rgba(248,113,113,0.08)] text-[#fca5a5]',
    'border border-[rgba(248,113,113,0.2)]',
    'shadow-[inset_0_0_10px_rgba(248,113,113,0.05)]',
  ].join(' '),
  outline: [
    'bg-transparent text-[#6b6b6b]',
    'border border-[rgba(255,255,255,0.08)]',
  ].join(' '),
};

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full',
        'text-[11px] font-medium tracking-wide',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
