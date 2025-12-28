import { Request, Response } from 'express';
import { createSupabase } from '../config/supabase';

export default async function GetEmployee(req: Request, res: Response) {
    try {
        const userSupabase = createSupabase(req.token);
        const { data, error } = await userSupabase.from('employee').select('*');
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}