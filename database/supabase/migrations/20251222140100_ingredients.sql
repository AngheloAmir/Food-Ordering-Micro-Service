CREATE TABLE public.ingredients (
    ingredient_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    cost_per_unit DECIMAL DEFAULT 0,
    available_quantity DECIMAL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;

-- Only the admin can write to the employee table
CREATE POLICY "Allow write access to admins only"
ON public.ingredients
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employee 
    WHERE employee_id = auth.uid() 
    AND role = 'admin'
  )
);