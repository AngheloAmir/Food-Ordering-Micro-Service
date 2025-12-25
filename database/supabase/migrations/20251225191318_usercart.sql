CREATE TABLE public.usercart (
    usercart_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    products JSONB DEFAULT '[]',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.usercart ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own usercart data"
ON public.usercart
FOR SELECT
USING (auth.uid() = usercart_id);

CREATE POLICY "Users can only update their own usercart data"
ON public.usercart
FOR UPDATE
USING (auth.uid() = usercart_id);

CREATE POLICY "Users can only insert their own usercart data"
ON public.usercart
FOR INSERT
WITH CHECK (auth.uid() = usercart_id);
