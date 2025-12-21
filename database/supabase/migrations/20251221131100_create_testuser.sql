create table if not exists public.testuser (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS
ALTER TABLE public.testuser ENABLE ROW LEVEL SECURITY;

-- Create Policy for SELECT
-- Users can only see rows where their auth.uid() matches the user_id column
CREATE POLICY "Users can only see their own testuser messages"
ON public.testuser
FOR SELECT
USING (auth.uid() = user_id);

-- Attempt to insert the record.
-- Note: This will fail if the user with the specified UUID does not exist in auth.users
INSERT INTO public.testuser (user_id, message)
VALUES ('0cabdcbb-b290-4347-98b2-3b743618db57', 'this is the admin, if you are seing this then you are login');
