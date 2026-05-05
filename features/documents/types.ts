export type TabId = "prompt" | "github" | "url";

export interface DocumentModel {
  id: string;
  account_id: string;
  content: string;
  deleted: boolean;
  created_at?: string;
  updated_at?: string;
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
