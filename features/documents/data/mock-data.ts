import type { ActivityItem, DocumentModel, RepositoryModel } from '../types';

export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: '1', icon: 'github', description: 'Generated README for my-saas-boilerplate', timestamp: '2 minutes ago' },
  { id: '2', icon: 'generate', description: 'Generated README from prompt description', timestamp: '18 minutes ago' },
  { id: '3', icon: 'github', description: 'Generated README for lazydoc', timestamp: '1 hour ago' },
  { id: '4', icon: 'scrape', description: 'Scraped https://nextjs.org/docs', timestamp: '3 hours ago' },
  { id: '5', icon: 'github', description: 'Generated README for react-query-toolkit', timestamp: 'Yesterday at 9:41 AM' },
  { id: '6', icon: 'generate', description: 'Generated README from prompt description', timestamp: 'Yesterday at 4:12 PM' },
];

export const MOCK_DOCUMENTS: DocumentModel[] = [
  {
    id: 'd1',
    account_id: 'acc1',
    content: '# my-saas-boilerplate\n\nA production-ready SaaS boilerplate built with Next.js 16, Supabase, and TailwindCSS 4. Ships with authentication, billing, and team management out of the box.',
    deleted: false,
    created_at: '2026-05-03T14:22:00Z',
    updated_at: '2026-05-03T14:22:00Z',
    repository_id: 'repo1',
  },
  {
    id: 'd2',
    account_id: 'acc1',
    content: '# lazydoc\n\nAI-powered README generator that supports prompt mode, GitHub URL, and web scraping. Built with Next.js, GSAP, and a two-step AI pipeline for high-quality output.',
    deleted: false,
    created_at: '2026-05-03T13:01:00Z',
    updated_at: '2026-05-03T13:01:00Z',
    repository_id: 'repo2',
  },
  {
    id: 'd3',
    account_id: 'acc1',
    content: '# react-query-toolkit\n\nA collection of utilities and hooks that extend TanStack Query for common data-fetching patterns, error handling, and optimistic updates in React applications.',
    deleted: false,
    created_at: '2026-05-02T09:41:00Z',
    updated_at: '2026-05-02T09:41:00Z',
    repository_id: 'repo3',
  },
  {
    id: 'd4',
    account_id: 'acc1',
    content: '# design-system-tokens\n\nA themeable design token library for TypeScript projects. Supports light/dark mode, CSS custom properties, and Tailwind v4 integration via @theme blocks.',
    deleted: false,
    created_at: '2026-04-30T16:55:00Z',
    updated_at: '2026-04-30T16:55:00Z',
  },
];

export const MOCK_REPOSITORIES: RepositoryModel[] = [
  {
    id: 'repo1',
    account_id: 'acc1',
    languages: ['TypeScript', 'CSS'],
    link: 'https://github.com/user/my-saas-boilerplate',
    review_duration: 3200,
    created_at: '2026-05-03T14:20:00Z',
  },
  {
    id: 'repo2',
    account_id: 'acc1',
    languages: ['TypeScript', 'MDX'],
    link: 'https://github.com/SW-Workspace/lazydoc',
    review_duration: 2800,
    created_at: '2026-05-03T12:58:00Z',
  },
  {
    id: 'repo3',
    account_id: 'acc1',
    languages: ['TypeScript', 'JavaScript'],
    link: 'https://github.com/user/react-query-toolkit',
    review_duration: 1900,
    created_at: '2026-05-02T09:38:00Z',
  },
  {
    id: 'repo4',
    account_id: 'acc1',
    languages: ['TypeScript'],
    link: 'https://github.com/user/design-system-tokens',
    review_duration: 1400,
    created_at: '2026-04-30T16:50:00Z',
  },
];
