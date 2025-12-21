import { Request, Response } from 'express';
import supabase from '../config/supabase';

export default async function Logout(req: Request, res: Response) {
    const token = req.cookies.access_token;

    if (!token) {
        res.status(401).json({ error: 'No active session' });
        return;
    }

    try {
        const { error } = await supabase.auth.admin.signOut(token);

        if (error) {
            console.error('Logout error:', error);
            res.status(500).json({ error: error.message });
            return;
        }

        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.json({ message: 'Logout successful' });

    } catch (err: any) {
        console.error('Server error during logout:', err);
        res.status(500).json({ error: err.message });
    }
};