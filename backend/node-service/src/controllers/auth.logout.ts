import { Request, Response } from 'express';
import supabase from '../config/supabase';
import { ErrorMessages, ErrorCodes } from '../utils/errorCodes';

export default async function Logout(req: Request, res: Response) {
    if (req.method !== 'POST') {
        res.status(405).json({
            error: ErrorMessages.METHOD_NOT_ALLOWED,
            code: ErrorCodes.METHOD_NOT_ALLOWED
        });
        return;
    }

    const token = req.cookies.access_token;

    if (!token) {
        res.status(401).json({
            error: ErrorMessages.NO_AUTH_TOKEN,
            code: ErrorCodes.NO_AUTH_TOKEN
        });
        return;
    }

    try {
        const { error } = await supabase.auth.admin.signOut(token);

        if (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                error: ErrorMessages.INVALID_AUTH_TOKEN,
                code: ErrorCodes.INVALID_AUTH_TOKEN
            });
            return;
        }

        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.json({
            message: 'Logout successful',
            code: 'LOGOUT_SUCCESS'
        });

    } catch (err: any) {
        console.error('Server error during logout:', err);
        res.status(500).json({
            error: ErrorMessages.SERVER_ERROR + ' ' + err,
            code: ErrorCodes.SERVER_ERROR
        });
    }
};