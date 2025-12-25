import { Request, Response } from 'express';
import supabase from '../config/supabase';

export default async function GetAllProducts(req: Request, res: Response) {
    //get the url params
    const { search, category } = req.query;

    let databaseResult : any;
    if (search && category) {
        databaseResult = await supabase.from('products').select('*').eq('category', category).eq('name', search);
    } else if (search) {
        databaseResult = await supabase.from('products').select('*').eq('name', search);
    } else if (category) {
        databaseResult = await supabase.from('products').select('*').eq('category', category);
    } else {
        databaseResult = await supabase.from('products').select('*');
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
