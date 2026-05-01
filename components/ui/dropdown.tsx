'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/core/utils/utils';

interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  className?: string;
}

export default function Dropdown({ value, onChange, options, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1.5 h-7 pl-2.5 pr-2 rounded-md',
          'text-[12px] font-medium text-[#a0a0a0]',
          'border transition-all duration-200 cursor-pointer',
          open
            ? 'bg-[rgba(124,58,237,0.12)] border-[rgba(124,58,237,0.35)] text-[#c4b5fd] shadow-[0_0_12px_rgba(124,58,237,0.15)]'
            : 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] hover:text-[#d0d0d0]',
        )}
      >
        <span className="max-w-[140px] truncate">{selected?.label}</span>
        <ChevronDown
          size={11}
          className={cn('shrink-0 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          className="absolute bottom-full mb-1.5 right-0 z-50 min-w-[200px] rounded-xl overflow-hidden"
          style={{
            background: '#0e0e1a',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08), 0 -2px 0 rgba(124,58,237,0.12)',
          }}
        >
          <div className="p-1">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg',
                    'text-[12px] transition-all duration-150 cursor-pointer text-left',
                    isSelected
                      ? 'bg-[rgba(124,58,237,0.15)] text-[#c4b5fd]'
                      : 'text-[#a0a0a0] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e0e0e0]',
                  )}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    {isSelected && (
                      <Check size={11} className="shrink-0 text-[#7c3aed]" />
                    )}
                    {!isSelected && <span className="w-[11px] shrink-0" />}
                    <span className="truncate font-medium">{option.label}</span>
                  </span>
                  {option.badge && (
                    <span
                      className={cn(
                        'shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded',
                        isSelected
                          ? 'bg-[rgba(124,58,237,0.2)] text-[#9f5fff]'
                          : 'bg-[rgba(255,255,255,0.06)] text-[#6b6b6b]',
                      )}
                    >
                      {option.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
