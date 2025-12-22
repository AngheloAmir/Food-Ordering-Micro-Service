CREATE TABLE public.products (
    product_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price    DECIMAL NOT NULL DEFAULT 0,
    discount DECIMAL NOT NULL DEFAULT 0,
    description TEXT,
    image TEXT,
    price_per_unit DECIMAL NOT NULL,
    est_cook_time INT DEFAULT 0,
    category_id UUID REFERENCES public.category(category_id),
    ingredient_ids UUID[],
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- My notes: Allow only public to read products
CREATE POLICY "Allow public read access"
ON public.products
FOR SELECT
TO public
USING (true);

-- My notes: Allow only admin to write products and do updates
CREATE POLICY "Allow write access to admins only"
ON public.products
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employee 
    WHERE employee_id = auth.uid() 
    AND role = 'admin'
  )
);