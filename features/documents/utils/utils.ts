import type { DocumentModel, RepositoryModel } from '../types';

export function getDocumentTitle(doc: DocumentModel, repos: RepositoryModel[]): string {
  if (doc.repository_id) {
    const repo = repos.find((r) => r.id === doc.repository_id);
    if (repo?.link) {
      const parts = repo.link.split('/');
      return parts[parts.length - 1] ?? 'Untitled';
    }
  }
  return 'Prompt-generated README';
}

export function getContentPreview(content: string, max = 120): string {
  const stripped = content.replace(/^#+\s.*$/m, '').trim();
  return stripped.length > max ? stripped.slice(0, max).trimEnd() + '…' : stripped;
}

export function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name?.trim()) {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return 'U';
}

export function truncateEmail(email: string | null | undefined, max = 22): string {
  if (!email) return '';
  return email.length <= max ? email : email.slice(0, max) + '…';
}

