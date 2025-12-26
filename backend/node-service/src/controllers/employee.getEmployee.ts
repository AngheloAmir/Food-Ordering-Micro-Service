import { Request, Response } from 'express';
import { createSupabase } from '../config/supabase';
import { getToken } from '../utils/getToken';

export default async function GetEmployee(req: Request, res: Response) {
    try {
        const token        = getToken(req);
        if (!token) return res.status(401).json({ error: 'Unauthorized' });
        const userSupabase = createSupabase(token);
        const { data, error } = await userSupabase.from('employee').select('*');
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}