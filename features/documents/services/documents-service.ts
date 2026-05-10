import { supabaseClient } from '@/core/config/supabase';
import { handleSupabaseQuery } from '@/core/lib/supabase-handler';
import type { DocumentModel } from '../types';

export function createDocummentService(
  document_data: DocumentModel,
): Promise<DocumentModel[] | null> {
  return handleSupabaseQuery(
    async () =>
      await supabaseClient
        .from('documents_generated')
        .insert(document_data)
        .select('*'),
  );
}

export function getDocummentByAccountIdService(
  account_id: string,
): Promise<DocumentModel[] | null> {
  return handleSupabaseQuery(
    async () =>
      await supabaseClient
        .from('documents_generated')
        .select('*')
        .eq('account_id', account_id),
  );
}

export function updateDocumentByIdService(
  document_data: DocumentModel,
  document_id: string,
): Promise<DocumentModel[] | null> {
  return handleSupabaseQuery(
    async () =>
      await supabaseClient
        .from('documents_generated')
        .update(document_data)
        .eq('id', document_id)
        .single(),
  );
}

export function markDeletedDocumentByIdService(
  document_id: string,
): Promise<DocumentModel[] | null> {
  return handleSupabaseQuery(
    async () =>
      await supabaseClient
        .from('documents_generated')
        .update({ deleted: true })
        .eq('id', document_id),
  );
}
