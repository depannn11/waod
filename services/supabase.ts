
import { createClient } from '@supabase/supabase-js';

/**
 * DATABASE SCHEMA REQUIREMENTS:
 * 
 * 1. Table: 'profiles'
 *    - id (uuid, primary key)
 *    - email (text)
 *    - full_name (text)
 *    - avatar_url (text)
 *    - is_premium (boolean, default false)
 *    - created_at (timestamp)
 * 
 * 2. Table: 'deployments'
 *    - id (uuid, primary key)
 *    - project_name (text)
 *    - status (text: 'success', 'processing', 'failed')
 *    - region (text)
 *    - created_at (timestamp)
 * 
 * 3. Table: 'messages'
 *    - id (uuid, primary key)
 *    - user_id (uuid, references auth.users)
 *    - user_name (text)
 *    - text (text)
 *    - created_at (timestamp)
 */

const SUPABASE_URL = 'https://tojnwagjixprzjcmvkgg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvam53YWdqaXhwcnpqY212a2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODgwNzksImV4cCI6MjA4Njg2NDA3OX0.TZkcyoeWAF819mVYcz1jZD_YltIVxneBFaR9qvacRSE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
