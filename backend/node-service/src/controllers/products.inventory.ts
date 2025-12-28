import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';
import sanitizer from '../utils/stringSanitizer';

interface InventoryRequest {
    name?: string;
    cost_per_unit?: number;
    available_quantity?: number;
    modify?: string;
    delete?: string;
    search?: string;
}

export default async function InventoryController(req: Request, res: Response) {
    try {
        const productRequest = req.body;
        const supabaseAdmin = createSupabaseAdmin();

    //delete a ingredients==================================================================
        if( productRequest.delete ) {
            const deleteProduct = await supabaseAdmin.from('ingredients').delete()
            .eq('name', productRequest.delete)
            .select();

            if( deleteProduct.error )
                return res.status(500).json({ error: "Failed to delete product" });
            return res.json({
                message: "Product deleted successfully",
                auth:    req.newToken && req.newRefreshToken ?
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }

    //modify a ingredients==================================================================
        if( productRequest.modify ) {
            const modifyProduct = await supabaseAdmin.from('ingredients').update({
                name:           sanitizer.sanitize.keepSpace(productRequest.name ?? ""),
                cost_per_unit:  productRequest.cost_per_unit,
                available_quantity: productRequest.available_quantity
            })
            .eq('name', productRequest.modify)
            .select();

            if( modifyProduct.error )
                return res.status(500).json({ error: "Failed to modify product" });
            if( modifyProduct.data.length === 0 )
                return res.json({ message: "Product not found" });
            
            return res.json({
                message: "Product modified successfully",
                auth:    req.newToken && req.newRefreshToken ?
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }

    //search a Ingredients==================================================================
    //using fuzzy search
        if(productRequest.search) {
            const searchPattern = productRequest.search.split('').join('%');
            const searchProduct = await supabaseAdmin.from('ingredients').select("*").ilike('name', `%${searchPattern}%`);
            if( searchProduct.error )
                return res.status(500).json({ error: "Failed to search product" });
            return res.json({
                data: searchProduct.data,
                auth: req.newToken && req.newRefreshToken ?
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }

    //Get all Ingredients==================================================================
        if( !productRequest.name ) {
            const productRequestList = await supabaseAdmin.from('ingredients').select("*");
            if( productRequestList.error )
                return res.status(500).json({ error: "Failed to get products" });
            return res.json({
                data: productRequestList.data,
                auth: req.newToken && req.newRefreshToken ?
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }

    //Add a Ingredients==================================================================
        const { data, error } = await supabaseAdmin.from('ingredients').insert([
            {
                name:               sanitizer.sanitize.keepSpace(productRequest.name ?? "unknown"),
                cost_per_unit:      productRequest.cost_per_unit,
                available_quantity: productRequest.available_quantity
            }
        ]);

        if( error ) 
            return res.status(500).json( error );
        return res.json({
            message: "Ingredients added successfully",
            auth:    req.newToken && req.newRefreshToken ?
            {
                token:        req.newToken,
                refreshToken: req.newRefreshToken
            }
            :
            null
        });

    } catch (error :any) {
        return res.status(500).json({ error });
    }
}
