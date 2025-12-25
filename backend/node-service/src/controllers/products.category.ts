import { Request, Response } from 'express';
import supabase, { createSupabase } from '../config/supabase';
import stringSanitizer from '../utils/stringSanitizer';

export default async function category(req: Request, res: Response) {
    try {
        const requestType  = req.body.request  ? stringSanitizer.sanitize(req.body.request) : "";
        const category     = req.body.category ? stringSanitizer.sanitize.keepSpace(req.body.category) : "";
        const newname      = req.body.newname  ? stringSanitizer.sanitize.keepSpace(req.body.newname) : "";

        switch( requestType ) {
            case 'insert':
                console.log(category);
                const insertSupa = await supabase
                    .from('category')
                    .insert({
                        name: category,
                    });

                if (insertSupa.error) {
                    console.log(insertSupa.error);
                    return res.status(401).json({
                        error: insertSupa.error,
                        code:  401,
                    });
                }

                return res.json({
                    message: 'Category inserted successfully',
                    data: insertSupa.data
                });

            case 'modify':
                const modifySupa = await supabase
                    .from('category')
                    .update({
                        name: newname,
                    })
                    .eq('name', category);

                if (modifySupa.error) {
                    console.log(modifySupa.error);
                    return res.status(401).json({
                        error: modifySupa.error,
                        code:  401,
                    });
                }

                return res.json({
                    message: 'Category modified successfully',
                    data: modifySupa.data
                });

            case 'delete':
                const deleteSupa = await supabase
                    .from('category')
                    .delete()
                    .eq('id', req.body.id);

                if (deleteSupa.error) {
                    console.log(deleteSupa.error);
                    return res.status(401).json({
                        error: deleteSupa.error,
                        code:  401,
                    });
                }

                return res.json({
                    message: 'Category deleted successfully',
                    data: deleteSupa.data
                });
        }

        const token        = req.cookies.access_token || req.headers.authorization;
        const userSupabase = createSupabase(token);
        const getAllSupa = await userSupabase
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
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            code:  500,
        });
    }

}