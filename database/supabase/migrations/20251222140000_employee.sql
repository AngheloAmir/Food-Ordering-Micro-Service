CREATE TYPE employee_role AS ENUM ('employee', 'staff', 'admin', 'csr', 'chef', 'rider');

CREATE TABLE public.employee (
    employee_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role employee_role DEFAULT 'employee',
    hired_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    schedule JSONB DEFAULT '{}',
    admin_notes TEXT,
    tasks JSONB DEFAULT '[]',
    hourly_rate DECIMAL DEFAULT 0,
    have_read_contract BOOLEAN DEFAULT FALSE,
    have_read_code_of_conduct BOOLEAN DEFAULT FALSE,
    have_read_privacy_policy BOOLEAN DEFAULT FALSE,
    have_read_terms_of_service BOOLEAN DEFAULT FALSE,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    required_training_completed BOOLEAN DEFAULT FALSE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    middle_name VARCHAR(50),
    gender VARCHAR(10),
    phone_number VARCHAR(15),
    address VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    country VARCHAR(50),
    emergency_contacts JSONB DEFAULT '[]' -- Removed the comma here
);

ALTER TABLE public.employee ENABLE ROW LEVEL SECURITY;

-- Helper function to avoid infinite recursion in RLS policies by bypassing RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.employee
    WHERE employee_id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Employees can only see their own user data
CREATE POLICY "Employees can only see their own user data" 
ON public.employee FOR SELECT 
USING (auth.uid() = employee_id);

-- Admins can do everything (Select, Insert, Update, Delete)
CREATE POLICY "Admins can do everything" 
ON public.employee FOR ALL 
USING (public.is_admin());

-- Seed data for Admin
-- Note: Replace 'PLACEHOLDER_AUTH_USER_ID' with the actual UUID of the admin user from auth.users
/*
INSERT INTO public.employee (
    employee_id,
    role,
    admin_notes,
    first_name,
    last_name,
    middle_name,
    gender,
    phone_number,
    address,
    city,
    state,
    zip_code,
    country,
    emergency_contacts
) VALUES (
    '1d483a9b-9e18-42b8-bfb8-c374420948a7',
    'admin',
    'This is the the admin account',
    'Admin',
    'Admin',
    '.',
    'ultimate',
    '123456789',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    '[]'
);
*/
