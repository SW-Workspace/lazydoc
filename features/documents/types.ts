export type TabId = 'prompt' | 'github' | 'url';

export interface DocumentModel {
  id: string;
  repository_id?: string;
  account_id: string;
  content: string;
  deleted: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RepositoryModel {
  id: string;
  account_id: string;
  languages: string[];
  link?: string;
  review_duration?: number;
  created_at: string;
}

export interface ActivityItem {
  id: string;
  icon: 'generate' | 'scrape' | 'github';
  description: string;
  timestamp: string;
}
export interface WrapSyntax {
  type: "wrap";
  before: string;
  after: string;
}

export interface LineSyntax {
  type: "line";
  prefix: string;
}

export type Syntax = WrapSyntax | LineSyntax;
