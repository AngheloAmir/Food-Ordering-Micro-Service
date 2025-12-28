import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';

export default async function ListCarts(req: Request, res: Response) {
    if (req.body.code !== "En8aZ5y1Al7a" || req.body.pass !== "9cm4hHMetlb8") {
        res.status(401).json({
            code: "You are not allowed to use this tool"
        });
        return;
    }

    const { data, error } = await createSupabaseAdmin().from('usercart').select('*');
    if(error) {
        res.status(500).json({
            code: "Failed to list carts",
            message: "Failed to list carts"
        });
        return;
    }
    res.json(data);

}