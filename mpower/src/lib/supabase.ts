import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  active: boolean;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
};

export type ServiceRequest = {
  id: string;
  user_id: string;
  service_id: string | null;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
  updated_at: string;
};

export type NewsUpdate = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};
