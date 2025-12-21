import { Request, Response, NextFunction } from 'express';
import supabase from '../config/supabase';

// Extend Express Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any; // Using any for simplicity, can be User type from supabase
        }
    }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: 'No authorization header provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Malformed authorization header. Expected "Bearer <token>"' });
        return;
    }

    next();

    //This is commented because calling the getUser method consume API requests
    // try {
    //     const { data: { user }, error } = await supabase.auth.getUser(token);

    //     if (error || !user) {
    //         console.error('Auth error:', error);
    //         res.status(401).json({ error: 'Invalid or expired token' });
    //         return;
    //     }

    //     req.user = user;
    //     next();

    // } catch (err) {
    //     console.error('Auth Middleware Error:', err);
    //     res.status(500).json({ error: 'Internal server error during auth check' });
    // }
};
