import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';

export default async function ListOfIngridents(req: Request, res: Response) {
    try {
        const { search } = req.query;

        if( search ) {
            const { data, error } = await createSupabaseAdmin().from('ingredients').select('*').eq('name', search);
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json({ data });
        }

        else {
            const { data, error } = await createSupabaseAdmin().from('ingredients').select('*');
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(200).json({ data });
        }
    } catch (error :any) {
        return res.status(500).json({ error });
    }
}
