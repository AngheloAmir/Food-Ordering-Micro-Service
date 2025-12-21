import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabase';

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

/**
 * This middleware checks if the user has a valid JWT token before processing the request.
 * This is ideal for protected routes.
 */
export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    // Check for token in cookies or Authorization header
    let token = req.cookies.access_token;

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) {
        res.status(401).json({ error: 'No authentication token provided' });
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

        //this will throw an error if the token is invalid
        req.user = {
            id: decoded.sub,
            role: decoded.role,
        };

    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                res.status(401).json({
                    error: 'Token expired',
                    code: 'TOKEN_EXPIRED'
                });
                return;
            }

            try {
                const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

                if (error || !data.session) {
                    res.clearCookie('access_token');
                    res.clearCookie('refresh_token');
                    res.status(401).json({
                        error: 'Session expired, please login again',
                        code: 'SESSION_EXPIRED'
                    });
                    return;
                }

                // Update cookies with new tokens
                res.cookie('access_token', data.session.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600 * 1000,
                    sameSite: 'strict',
                    path: '/'
                });

                res.cookie('refresh_token', data.session.refresh_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 30 * 24 * 3600 * 1000,
                    sameSite: 'strict',
                    path: '/'
                });

                // Attach user and proceed
                req.user = {
                    id: data.session.user.id,
                    role: data.session.user.role,
                };

                // Update the request with the new token so downstream controllers use the valid one
                req.cookies.access_token = data.session.access_token;

                next();
                return;

            } catch (refreshErr) {
                console.error('Auto-refresh failed:', refreshErr);
                res.status(401).json({
                    error: 'Session invalid',
                    code: 'SESSION_INVALID'
                });
                return;
            }
        }
        console.error('JWT Verification failed:', err);
        res.status(401).json({
            error: 'Invalid token',
            code: 'INVALID_TOKEN'
        });
        return;
    }

    next();
};
