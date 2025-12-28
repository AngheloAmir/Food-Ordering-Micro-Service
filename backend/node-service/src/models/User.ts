export interface User {
  user_id: string;          // UUID (auth.users.id)
  email: string;
  name: string;

  phone1?: string | null;
  phone2?: string | null;

  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;

  icon?: string | null;
  gender?: string | null;

  delivery_notes?: string | null;
  notes?: string | null;

  created_at: string;      // ISO timestamp
  updated_at: string;      // ISO timestamp
}
