import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';
import sanitizer from '../utils/stringSanitizer';

interface AddProductRequest {
    name?: string;
    price?: number;
    discount?: number;
    description?: string;
    image?: string;
    price_per_unit?: number;
    est_cook_time?: number;
    category?: string;
    ingredient_ids?: number[];
    tags?: string[];

    modify? :string;
    delete? :string;
    search? :string;
}

export default async function ProductController(req: Request, res: Response) {
    try {
        const productRequest: AddProductRequest = req.body;
        const supabaseAdmin = createSupabaseAdmin();

    //Delete a product========================================================================
        if( productRequest.delete ) {
            const deleteProduct = await supabaseAdmin.from('products').delete()
            .eq('name', productRequest.delete)
            .select();

            if( deleteProduct.error )
                return res.status(500).json({ error: "Failed to delete product" });
            if( deleteProduct.data.length === 0 )
                return res.json({ message: "Product not found" });
            return res.json({ message: "Product deleted successfully", 
                auth: req.newToken && req.newRefreshToken ? 
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }

    //Modify product========================================================================
        if( productRequest.modify ) {
            const modifyProduct = await supabaseAdmin.from('products').update({
                name:           sanitizer.sanitize.keepSpace(productRequest.name ?? ""),
                price:          productRequest.price,
                discount:       productRequest.discount,
                description:    sanitizer.sanitize.keepSpace(productRequest.description ?? ""),
                image:          productRequest.image,
                price_per_unit: productRequest.price_per_unit,
                est_cook_time:  productRequest.est_cook_time,
                category:       productRequest.category,
                ingredient_ids: productRequest.ingredient_ids,
                tags:           productRequest.tags
            })
            .eq('name', productRequest.modify)
            .select();

            if( modifyProduct.error )
                return res.status(500).json({ error: "Failed to modify product" });
            if( modifyProduct.data.length === 0 )
                return res.json({ message: "Product not found" });
            return res.json({ message: "Product modified successfully", 
                auth: req.newToken && req.newRefreshToken ? 
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }
    
    //Search product========================================================================
        if( productRequest.search ) {
            const searchProduct = await 
                supabaseAdmin
                .from('products')
                .select("*")
                .ilike('name', `%${productRequest.search}%`);

            if( searchProduct.error )
                return res.status(500).json({ error: "Failed to search product" });
            return res.json({ data: searchProduct.data,
                auth: req.newToken && req.newRefreshToken ? 
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }
    
    //Get all products========================================================================
        if( !productRequest.name ) {
            const producstList = await supabaseAdmin.from('products').select("*");
            if( producstList.error )
                return res.status(500).json({ error: "Failed to get products" });
            return res.json({ data: producstList.data,
                auth: req.newToken && req.newRefreshToken ? 
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            });
        }
    
    //Add product========================================================================
        const sanitizeIngredient_ids = productRequest.ingredient_ids ? productRequest.ingredient_ids.map((id) => Number(id)) : [];
        const sanitizeTags           = productRequest.tags ? productRequest.tags.map((tag) => sanitizer.sanitize(tag)) : [];
        const { data, error } = await supabaseAdmin.from('products').insert([
            {
                name:           sanitizer.sanitize.keepSpace(productRequest.name ?? "unknown"),
                price:          productRequest.price,
                discount:       productRequest.discount,
                description:    sanitizer.sanitize.keepSpace(productRequest.description ?? ""),
                image:          productRequest.image,
                price_per_unit: productRequest.price_per_unit,
                est_cook_time:  productRequest.est_cook_time,
                category:       productRequest.category,
                ingredient_ids: sanitizeIngredient_ids,
                tags:           sanitizeTags
            }
        ]);

        if( error ) 
            return res.status(500).json({ error: "Failed to add product" });

        return res.json({ message: "Product added successfully",
            auth: req.newToken && req.newRefreshToken ? 
            {
                token:        req.newToken,
                refreshToken: req.newRefreshToken
            }
            :
            null
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to add product" });
    }
}
