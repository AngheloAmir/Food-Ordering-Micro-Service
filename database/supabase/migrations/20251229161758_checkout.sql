CREATE TABLE public.checkout (
    checkout_id      BIGINT      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id          UUID        REFERENCES auth.users(id) ON DELETE CASCADE,
    products         JSONB       DEFAULT '[]',
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.checkout ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own checkout data"
ON public.checkout
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can only update their own checkout data"
ON public.checkout
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own checkout data"
ON public.checkout
FOR INSERT
WITH CHECK (auth.uid() = user_id); 