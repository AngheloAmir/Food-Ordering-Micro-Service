CREATE TABLE public.users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone1 VARCHAR(20),
    phone2 VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip VARCHAR(20),
    country VARCHAR(100),
    icon VARCHAR(255),
    gender VARCHAR(50),
    delivery_notes TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own user data"
ON public.users
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can only update their own user data"
ON public.users
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own user data"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = user_id);
