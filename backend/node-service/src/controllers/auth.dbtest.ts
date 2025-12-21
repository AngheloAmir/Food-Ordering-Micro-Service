import { createSupabase } from "../config/supabase";
import { Request, Response } from 'express';

/**
    This controller just checks the authentication of the application.
    So it checks if the user has token and if the token is valid.
    If the token is valid, it will return the user data.
    If the token is not valid, it will return an error.

    @example
    //in the frontend app
    const response = await axios.get('/authdbtest', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    //this will return all data owned by the user in table testuser
    console.log(response.data);
 */
export default async function getAuthDbTest(req: Request, res: Response) {
    try {
        // Retrieve token from cookie or header
        const token = req.cookies.access_token || req.headers.authorization;
        const userSupabase = createSupabase(token);
        const { data, error } = await userSupabase
            .from('testuser')
            .select('*');

        if (error) {
            console.error('RLS Query Error:', error);
            res.status(500).json({ error: error.message });
            return;
        }

        res.json(data);

    } catch (err: any) {
        console.error('Server error during auth db test:', err);
        res.status(500).json({ error: err.message });
    }
};