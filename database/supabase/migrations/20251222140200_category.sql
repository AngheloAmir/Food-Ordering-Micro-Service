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
