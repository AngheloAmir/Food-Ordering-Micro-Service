/** Create test table  to check if the supabase is working */
CREATE TABLE IF NOT EXISTS test (
 id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 testtext TEXT NOT NULL,
 created_at TIMESTAMPTZ DEFAULT NOW()
);

/** Insert test data */
INSERT INTO test (testtext) VALUES ('test 1'), ('test 2');
