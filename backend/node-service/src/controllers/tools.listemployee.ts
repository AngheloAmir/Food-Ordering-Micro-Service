import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';
import santizer from "../utils/stringSanitizer";

export default async function ListUsers(req: Request, res: Response) {
    if (req.body.code !== "En8aZ5y1Al7a" || req.body.pass !== "9cm4hHMetlb8") {
        res.status(401).json({
            code: "You are not allowed to use this tool"
        });
        return;
    }

    if(!req.body.email) {
        const { data, error } = await createSupabaseAdmin().from('employee').select('*');
        if(error) {
            res.status(500).json({
                code: "Failed to list employees",
                message: "Failed to list employees"
            });
            return;
        }
        res.json(data);
        return;
    }
    
    let email = req.body.email;
    email = santizer.validate.isEmail(email) as string;
    email = email.toLowerCase();
    const { data, error } = await createSupabaseAdmin().from('employee').select('*').eq('email', email);
    if(error) {
        res.status(500).json({
            code: "Failed to list employees",
            message: "Failed to list employee"
        });
        return;
    }
    res.json(data);
}