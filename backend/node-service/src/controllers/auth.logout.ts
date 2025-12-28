import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';
import { ErrorMessages, ErrorCodes } from '../utils/errorCodes';

export default async function Logout(req: Request, res: Response) {
    try {
        const { error } = await createSupabaseAdmin().auth.admin.signOut( req.token );

        if (error) {
            console.error('Logout error:', error);
            res.status(500).json({
                error: ErrorMessages.INVALID_AUTH_TOKEN,
                code: ErrorCodes.INVALID_AUTH_TOKEN
            });
            return;
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict' as 'strict',
            path: '/'
        };

        res.clearCookie('access_token', cookieOptions);
        res.clearCookie('refresh_token', cookieOptions);
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