CREATE TABLE public.workday (
    workday_id  BIGINT PRIMARY KEY,
    employee_id UUID REFERENCES public.employee(employee_id),
    login_time TIMESTAMPTZ,
    logout_time TIMESTAMPTZ
);

ALTER TABLE public.workday ENABLE ROW LEVEL SECURITY;  

CREATE POLICY "Employees can manage all workdays"
ON public.workday
FOR ALL
USING (auth.uid() = employee_id);

-- allow admin to manage all workdays
CREATE POLICY "Allow write access to admins only"
ON public.workday
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.employee 
    WHERE employee_id = auth.uid() 
    AND role = 'admin'
  )
);