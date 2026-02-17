
export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  is_premium?: boolean;
  role?: 'user' | 'admin';
}

export interface ChatMessage {
  id: string;
  user_id: string;
  user_name: string;
  text: string;
  created_at: string;
}

export interface DeploymentRecord {
  id: string;
  project_name: string;
  status: 'success' | 'failed' | 'processing';
  region: string;
  timestamp: string;
}

export enum AppRoute {
  HOME = '/',
  DASHBOARD = '/dashboard',
  ADMIN = '/admin',
  TERMS = '/terms',
  PRIVACY = '/privacy'
}
