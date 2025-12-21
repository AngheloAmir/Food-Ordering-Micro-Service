import { createSupabase } from "../config/supabase";
import { Request, Response } from 'express';

export const getAuthDbTest = async (req: Request, res: Response) => {
    try {
        const userSupabase = createSupabase(req.headers.authorization);
        const { data, error } = await userSupabase
            .from('testuser')
            .select('*');

        if (error) {
            console.error('RLS Query Error:', error);
            res.status(500).json({ error: error.message });
            return;
        }

        res.json({
            message: 'Authenticated DB query successful',
            data: data,
            rls_note: 'If data is empty but you are logged in, ensure you own the records.',
            user_id_used: req.user?.id // Provided by middleware
        });

    } catch (err: any) {
        console.error('Server error during auth db test:', err);
        res.status(500).json({ error: err.message });
    }
};