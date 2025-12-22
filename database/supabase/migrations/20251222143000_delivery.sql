CREATE TABLE public.delivery (
    delivery_id UUID PRIMARY KEY,
    order_id UUID REFERENCES public.orders(order_id),
    driver_id UUID REFERENCES public.employee(employee_id),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.delivery ENABLE ROW LEVEL SECURITY;  

-- Employees (rider, csr, chef) can edit, view, delete, or add new orders
CREATE POLICY "Employees can manage all orders"
ON public.delivery
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employee 
    WHERE employee_id = auth.uid() 
    AND role IN ('rider', 'csr', 'admin')
  )
);