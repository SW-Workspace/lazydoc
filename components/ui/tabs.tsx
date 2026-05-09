'use client';

import {
  createContext,
  useContext,
  useId,
} from 'react';
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from '@/core/utils/utils';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps<T extends string = string> {
  value: T;
  onValueChange: (value: T) => void;
  children: ReactNode;
  className?: string;
}

export default function Tabs<T extends string = string>({
  value,
  onValueChange,
  children,
  className,
}: TabsProps<T>) {
  const baseId = useId();

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: (next) => { onValueChange(next as T); },
        baseId,
      }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs subcomponents must be used inside <Tabs>.');
  return ctx;
}

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn('flex border-b border-[rgba(255,255,255,0.06)]', className)}
      {...props}
    />
  );
}

interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  color?: string;
  glow?: string;
  inactiveColor?: string;
  indicatorClassName?: string;
}

export function TabsTrigger({
  value,
  color = '#f0f0f0',
  glow,
  inactiveColor = '#6b6b6b',
  className,
  indicatorClassName,
  onClick,
  children,
  ...props
}: TabsTriggerProps) {
  const { value: currentValue, onValueChange, baseId } = useTabsContext();
  const isActive = currentValue === value;
  const triggerId = `${baseId}-trigger-${value}`;
  const contentId = `${baseId}-content-${value}`;

  return (
    <button
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={isActive}
      aria-controls={contentId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onValueChange(value);
      }}
      className={cn(
        'relative flex-1 flex items-center justify-center gap-1.5 py-3.5 text-[13px] font-medium transition-all duration-200 cursor-pointer',
        className,
      )}
      style={{ color: isActive ? color : inactiveColor }}
      {...props}
    >
      <span
        className="relative z-10 flex items-center gap-1.5"
        style={{ color: isActive ? color : inactiveColor }}
      >
        {children}
      </span>
      {isActive ? (
        <span
          className={cn('absolute bottom-0 inset-x-0 h-[2px]', indicatorClassName)}
          style={{
            background: color,
            boxShadow: glow ? `0 0 8px ${glow}` : undefined,
          }}
        />
      ) : null}
    </button>
  );
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

export function TabsContent({
  value,
  forceMount = false,
  className,
  children,
  ...props
}: TabsContentProps) {
  const { value: currentValue, baseId } = useTabsContext();
  const isActive = currentValue === value;

  if (!forceMount && !isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-content-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      hidden={!isActive}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
