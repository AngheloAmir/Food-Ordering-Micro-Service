import { Request } from 'express';
import { isAllowedOutsideCookies } from '../config/authConfig';

export function getToken(req: Request): string | undefined {
    // 1. Try Cookie
    let token = req.cookies.access_token;
    
    // 2. Try Authorization Header if allowed and Cookie failed
    if (!token && isAllowedOutsideCookies && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }
    
    return token;
}
