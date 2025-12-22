CREATE TABLE public.category (
    category_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

ALTER TABLE public.category ENABLE ROW LEVEL SECURITY;

-- Enables the public to view categories
CREATE POLICY "Allow public read access"
ON public.category
FOR SELECT
TO public
USING (true);

-- Only the admin can write to the category table
CREATE POLICY "Allow write access to admins only"
ON public.category
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employee 
    WHERE employee_id = auth.uid() 
    AND role = 'admin'
  )
);