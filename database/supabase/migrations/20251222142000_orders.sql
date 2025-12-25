CREATE TABLE public.orders (
    order_id BIGINT PRIMARY KEY,
    user_id UUID REFERENCES public.users(user_id),
    order_date    TIMESTAMPTZ DEFAULT NOW(),
    delivery_date TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'pending',

    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100), 
    zip VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(20),
    notes TEXT,
    delivery_notes TEXT,

    product_ids UUID[]
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- My notes: Users can only see their own orders
CREATE POLICY "Users can only see their own orders"
ON public.orders
FOR SELECT
USING (auth.uid() = user_id);

-- Employees (rider, csr, chef) can edit, view, delete, or add new orders
CREATE POLICY "Employees can manage all orders"
ON public.orders
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employee 
    WHERE employee_id = auth.uid() 
    AND role IN ('rider', 'csr', 'chef', 'admin')
  )
);

CREATE POLICY "Admin can manage all orders"
ON public.orders
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employee 
    WHERE employee_id = auth.uid() 
    AND role = 'admin'
  )
);
