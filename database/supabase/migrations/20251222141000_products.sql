CREATE TABLE public.products (
    product_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    price    DECIMAL NOT NULL DEFAULT 0,
    discount DECIMAL NOT NULL DEFAULT 0,
    description TEXT,
    image TEXT,
    price_per_unit DECIMAL NOT NULL,
    est_cook_time INT DEFAULT 0,
    category text,
    ingredient_ids BIGINT[],
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

ALTER TABLE public.products
ADD COLUMN prefix TEXT DEFAULT '';

ALTER TABLE public.products
ADD COLUMN special TEXT DEFAULT '';
