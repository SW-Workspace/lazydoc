import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Please review your environment variables');
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
