import { Request, Response } from 'express';
import supabase from '../config/supabase';

export default async function Logout(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(400).json({ error: 'No authorization header provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const { error } = await supabase.auth.admin.signOut(token);

        if (error) {
            console.error('Logout error:', error);
            res.status(500).json({ error: error.message });
            return;
        }

        res.json({ message: 'Logout successful' });

    } catch (err: any) {
        console.error('Server error during logout:', err);
        res.status(500).json({ error: err.message });
    }
};