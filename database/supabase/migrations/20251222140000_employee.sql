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
    emergency_contacts JSONB DEFAULT '[]',
);

ALTER TABLE public.employee ENABLE ROW LEVEL SECURITY;

-- Employees can only see their own user data but not edit them
CREATE POLICY "Employees can only see their own user data"
ON public.employee
FOR SELECT
USING (auth.uid() = employee_id);

-- Only the admin can write to the employee table
CREATE POLICY "Allow write access to admins only"
ON public.employee
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employee 
    WHERE employee_id = auth.uid() 
    AND role = 'admin'
  )
);
