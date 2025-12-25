import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';

export default async function GetAllCategories(req: Request, res: Response) {
    const getAllSupa = await createSupabaseAdmin()
        .from('category')
        .select('*');

    if (getAllSupa.error) {
        console.log(getAllSupa.error);
        return res.status(401).json({
            error: getAllSupa.error,
            code:  401,
        });
    }

    return res.json({
        message: 'categories fetched successfully',
        data: getAllSupa.data
    })        
}