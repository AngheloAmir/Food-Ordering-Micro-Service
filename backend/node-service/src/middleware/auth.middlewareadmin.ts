import { Request, Response, NextFunction } from 'express';

import { createSupabaseAdmin } from '../config/supabase';
import { ErrorCodes, ErrorMessages } from '../utils/errorCodes';
import generateUserCookie from '../utils/generateUserCookie';
import decodeToken, { JwtPayload } from '../utils/tokenDecoder';

//Refrence for string sanitizer
//https://www.npmjs.com/package/string-sanitizer

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
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
        res.status(401).json({
            error: ErrorMessages.NO_AUTH_TOKEN,
            code: ErrorCodes.NO_AUTH_TOKEN
        });
        return;
    }

    //Determin if this is a valid JWT token========================================================
    if (!process.env.SUPABASE_JWT_SECRET) {
        console.error('SUPABASE_JWT_SECRET is not set in environment variables');
        res.status(500).json({ error: 'Internal server configuration error' });
        return;
    }

    try {
        const decoded: JwtPayload = decodeToken(token);
        
        // Check if user is an admin in the employee table
        const { data: employeeData, error: employeeError } = await createSupabaseAdmin()
            .from('employee')
            .select('role')
            .eq('employee_id', decoded.sub)
            .single();

        if (employeeError || !employeeData || employeeData.role !== 'admin') {
            res.status(403).json({
                error: ErrorMessages.UNAUTHORIZED,
                code: ErrorCodes.UNAUTHORIZED
            });
            return;
        }

        req.user = {
            id: decoded.sub,
            role: decoded.role,
        };

    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                res.status(401).json({
                    error: ErrorMessages.TOKEN_EXPIRED,
                    code: ErrorCodes.TOKEN_EXPIRED
                });
                return;
            }

            try {
                const { data, error } = await createSupabaseAdmin().auth.refreshSession({ refresh_token: refreshToken });

                if (error || !data.session) {
                    res.clearCookie('access_token');
                    res.clearCookie('refresh_token');
                    res.status(401).json({
                        error: 'Session expired, please login again',
                        code: ErrorCodes.SESSION_EXPIRED
                    });
                    return;
                }

                // Check if refreshed user is an admin
                const { data: employeeData, error: employeeError } = await createSupabaseAdmin()
                    .from('employee')
                    .select('role')
                    .eq('employee_id', data.session.user.id)
                    .single();

                if (employeeError || !employeeData || employeeData.role !== 'admin') {
                     res.status(403).json({
                        error: 'Unauthorized: Admin privileges required',
                        code: 'UNAUTHORIZED_ADMIN_ACCESS'
                    });
                    return;
                }

                // Update cookies with new tokens
                generateUserCookie(res, data.session.access_token, data.session.refresh_token);

                // Attach user and proceed
                req.user = {
                    id: data.session.user.id,
                    role: data.session.user.role,
                };

                next();
                return;

            } catch (refreshErr) {
                console.error('Auto-refresh failed:', refreshErr);
                res.status(401).json({
                    error: ErrorMessages.SESSION_EXPIRED,
                    code: ErrorCodes.SESSION_EXPIRED
                });
                return;
            }
        }
        console.error('JWT Verification failed:', err);
        res.status(401).json({
            error: ErrorMessages.INVALID_AUTH_TOKEN,
            code: ErrorCodes.INVALID_AUTH_TOKEN
        });
        return;
    }

    next();
};
