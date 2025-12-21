import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;



const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export function createSupabase(tokenParams: string | undefined) {
    if (!tokenParams)
        throw new Error('No token provided');

    const token = tokenParams.split(' ')[1];
    const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    return userSupabase;
}



/**
 * const token = "YOUR_ACCESS_TOKEN_HERE"; // Replace with the actual JWT token

fetch('http://localhost:8000/api/authdbtest', {
method: 'GET',
headers: {
'Authorization': `Bearer ${token}`,
'Content-Type': 'application/json'
}
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
 */