import { supabaseClient } from "@/core/config/supabase";
import { handleSupabaseQuery } from "@/core/lib/supabase-handler";
import type { SB_DocumentModel } from "../types";

export function createDocumment(document_data: SB_DocumentModel) {
  return handleSupabaseQuery(async () => {
    return await supabaseClient
      .from("documents_generated")
      .insert(document_data)
      .select("*");
  });
}

export function getDocummentByAccountId(account_id: string) {
  return handleSupabaseQuery(async () => {
    return await supabaseClient
      .from("documents_generated")
      .select("*")
      .eq("account_id", account_id);
  });
}

export function updateDocumentById(
  document_data: SB_DocumentModel,
  document_id: string,
) {
  return handleSupabaseQuery(async () => {
    return await supabaseClient
      .from("documents_generated")
      .update(document_data)
      .eq("id", document_id)
      .single();
  });
}

export function deletedDocumentByID(document_id) {
  return handleSupabaseQuery(async () => {
    return await supabaseClient
      .from("documents_generated")
      .delete()
      .eq("id", document_id);
  });
}
