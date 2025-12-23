import { Request, Response } from 'express';
import supabase from '../config/supabase';

export default async function ListUsers(req: Request, res: Response) {
    const string = require("string-sanitizer");

    if (req.body.code !== "En8aZ5y1Al7a" || req.body.pass !== "9cm4hHMetlb8") {
        res.status(401).json({
            code: "You are not allowed to use this tool"
        });
        return;
    }

    if(!req.body.email) {
        const { data, error } = await supabase.from('users').select('*');
        if(error) {
            res.status(500).json({
                code: "Failed to list users",
                message: "Failed to list users"
            });
            return;
        }
        res.json(data);
        return;
    }
    
    let email = req.body.email;
    email = string.validate.isEmail(email);
    email = email.toLowerCase();
    const { data, error } = await supabase.from('users').select('*').eq('email', email);
    if(error) {
        res.status(500).json({
            code: "Failed to list users",
            message: "Failed to list users"
        });
        return;
    }
    res.json(data);
}