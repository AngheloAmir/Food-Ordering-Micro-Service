CREATE TYPE chef_status     AS ENUM ('pending', 'cooking', 'completed', 'cancelled');
CREATE TYPE delivery_status AS ENUM ('pending', 'accepted', 'completed', 'cancelled');

CREATE TABLE public.orders (
    order_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id       UUID  REFERENCES public.users(user_id),
    order_date    TIMESTAMPTZ DEFAULT NOW(),

    -- User Information about the order
    name           VARCHAR(255),
    contact        VARCHAR(255),
    address        VARCHAR(255),
    notes          TEXT,
    delivery_notes TEXT,

    -- User products orderer
    product_ids        UUID[],
    product_quantities INT[],

    -- Product processing information
    chef_status        chef_status DEFAULT 'pending',
    chef_notes         TEXT,

    -- Billing Information
    total_amount       DECIMAL(10,2),
    discount           DECIMAL(10,2),
    tax                DECIMAL(10,2),
    delivery_fee       DECIMAL(10,2),
    other_charges      DECIMAL(10,2),
    total              DECIMAL(10,2),

    -- Payment Information
    payment_method     VARCHAR(50),
    payment_status     VARCHAR(50),
    payment_id         VARCHAR(50),
    payment_date       TIMESTAMPTZ,
    payment_amount     DECIMAL(10,2),

    -- Delivery Information
    delivery_date          TIMESTAMPTZ,
    delivery_status        delivery_status DEFAULT 'pending',
    delivery_employee_id   UUID,
    delivery_employee_name VARCHAR(255),
    
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
FOR SELECT, UPDATE,
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
