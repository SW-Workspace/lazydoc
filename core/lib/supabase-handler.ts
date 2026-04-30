import type { PostgrestError } from '@supabase/supabase-js';

export async function handleSupabaseQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>
): Promise<T | null> {
  const { data, error } = await queryFn();

  if (error) {
    console.error('Error in Supabase:', error);
    throw new Error(error.message);
  }

  return data;
}
