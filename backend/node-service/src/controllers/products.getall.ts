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

    /** Return an filtered output removing any internal data to the public */
    const filterOutput = databaseResult.data.map((product: any) => {
        return {
            name:               product.name,
            price:              product.price,
            discount:           product.discount,
            description:        product.description,
            image:              product.image,
            price_per_unit:     product.price_per_unit,
            est_cook_time:      product.est_cook_time,
            category:           product.category,
            tags:               product.tags,
        };
    });

    res.json({
        message: 'Products fetched successfully',
        data: filterOutput
    });
}
