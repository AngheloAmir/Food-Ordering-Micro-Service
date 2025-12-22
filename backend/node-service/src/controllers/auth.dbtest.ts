import { createSupabase } from "../config/supabase";
import { Request, Response } from 'express';
import { ErrorMessages, ErrorCodes } from "../utils/errorCodes";

export default async function getAuthDbTest(req: Request, res: Response) {
    try {
        // Retrieve token from cookie or header
        const token = req.cookies.access_token || req.headers.authorization;
        const userSupabase = createSupabase(token);
        const { data, error } = await userSupabase
            .from('testuser')
            .select('*');

        if (error) {
            console.error('RLS Query Error:', error);
            res.status(500).json({
                error: ErrorMessages.SQL_ERROR,
                code: ErrorCodes.SQL_ERROR
            });
            return;
        }

        res.json(data);

    } catch (err: any) {
        console.error('Server error during auth db test:', err);
        res.status(500).json({
            error: ErrorMessages.SERVER_ERROR + ' ' + err,
            code: ErrorCodes.SERVER_ERROR
        });
    }
};