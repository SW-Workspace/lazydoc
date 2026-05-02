export type TabId = "prompt" | "github" | "url";

export interface DocumentModel {
  id: string;
  account_id: string;
  content: string;
  deleted: boolean;
  created_at?: string;
  updated_at?: string;
}
