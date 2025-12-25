import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';

export default async function GetAllProducts(req: Request, res: Response) {
    const { search, category } :any = req.query;

    let databaseResult : any;
    if (search && category) {
        databaseResult =
            await createSupabaseAdmin()
            .from('products')
            .select('*')
            .eq('category', category)
            .ilike('name', `%${search}%`);
    } else if (search) {
        databaseResult =
            await createSupabaseAdmin()
            .from('products')
            .select('*')
            .ilike('name', `%${search}%`);
    } else if (category) {
        databaseResult =
            await createSupabaseAdmin()
            .from('products')
            .select('*')
            .eq('category', category);
    } else {
        databaseResult =
            await createSupabaseAdmin()
            .from('products')
            .select('*');
    }

    if (databaseResult.error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            reason: databaseResult.error
        });
    }

    res.json({
        message: 'Products fetched successfully',
        data: databaseResult.data
    });
}
