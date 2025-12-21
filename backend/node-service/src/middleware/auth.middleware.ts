import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

interface JwtPayload {
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    email: string;
    phone: string;
    app_metadata: { provider: string, providers: string[] };
    user_metadata: { email_verified: boolean };
    role: string;
    aal: string;
    amr: [{ method: string, timestamp: number }],
    session_id: string;
    is_anonymous: boolean;
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    //Check the if the request has the authorization header========================================
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

    //Determin if this is a valid JWT token========================================================
    if (!process.env.SUPABASE_JWT_SECRET) {
        console.error('SUPABASE_JWT_SECRET is not set in environment variables');
        res.status(500).json({ error: 'Internal server configuration error' });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.SUPABASE_JWT_SECRET
        ) as JwtPayload;

        req.user = {
            id: decoded.sub,
            role: decoded.role,
        };

    } catch (err) {
        console.error('JWT Verification failed:', err);
        res.status(401).json({ error: 'Invalid token' });
        return;
    }

    next();
};
