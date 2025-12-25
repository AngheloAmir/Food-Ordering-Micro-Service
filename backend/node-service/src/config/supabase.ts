import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';

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

export function createSupabaseAdmin() {
    return createClient(supabaseUrl, supabaseServiceRoleKey);
}

