import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export function createSupabase(tokenParams: string | undefined) {
    if (!tokenParams)
        throw new Error('No token provided');

    let token = tokenParams;
    if (tokenParams.startsWith('Bearer ')) {
        token = tokenParams.split(' ')[1];
    }

    const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    return userSupabase;
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
