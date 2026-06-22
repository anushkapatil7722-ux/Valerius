import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables dynamically for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

const isPlaceholder = 
  !supabaseUrl || 
  !supabaseAnonKey || 
  supabaseUrl.includes('your-project-id') || 
  supabaseAnonKey.includes('your_supabase_anon_public_key');

const isInvalid = !isValidUrl(supabaseUrl);

if (isPlaceholder || isInvalid) {
  console.warn(
    `Supabase configuration warning: ${
      isInvalid 
        ? "VITE_SUPABASE_URL must be a valid URL starting with http:// or https://" 
        : "Credentials are using placeholder values."
    } The application will fall back to local mock data and localStorage.`
  );
}

// Export the client initialized if valid, otherwise export null for graceful fallback
export const supabase = (isPlaceholder || isInvalid)
  ? null 
  : createClient(supabaseUrl, supabaseAnonKey);
