import type { ActivityItem } from './types';

export const MODELS = [
  { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', badge: 'Default' },
  { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', badge: 'Pro' },
  { value: 'gpt-4o', label: 'GPT-4o', badge: 'OpenAI' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini', badge: 'Fast' },
  { value: 'claude-sonnet-4-6', label: 'Claude Sonnet', badge: 'Anthropic' },
];

export const PRODUCT_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Changelog', href: '/changelog' },
];

export const RESOURCE_LINKS = [
  { label: 'Documentation', href: '/docs' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'API Reference', href: '/api-reference' },
];

export const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
];

export const ICON_COLORS: Record<ActivityItem['icon'], { bg: string; text: string }> = {
  github: { bg: 'rgba(255,255,255,0.06)', text: '#9198a1' },
  generate: { bg: 'rgba(124,58,237,0.15)', text: '#9f5fff' },
  scrape: { bg: 'rgba(6,182,212,0.12)', text: '#22d3ee' },
};

export const LANG_COLORS: Record<string, string> = {
  TypeScript: 'rgba(49,120,198,0.25)',
  JavaScript: 'rgba(240,219,79,0.2)',
  CSS: 'rgba(86,61,124,0.25)',
  MDX: 'rgba(16,185,129,0.2)',
  Python: 'rgba(53,114,165,0.25)',
  Go: 'rgba(0,173,216,0.2)',
  Rust: 'rgba(222,165,132,0.2)',
};

export const LANG_TEXT: Record<string, string> = {
  TypeScript: '#60a5fa',
  JavaScript: '#fbbf24',
  CSS: '#c084fc',
  MDX: '#34d399',
  Python: '#60a5fa',
  Go: '#22d3ee',
  Rust: '#fb923c',
};
