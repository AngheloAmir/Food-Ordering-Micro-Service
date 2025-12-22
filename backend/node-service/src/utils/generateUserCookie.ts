import { Response } from 'express';

/** A function that will set the user cookies for the user session
 * @param res The response object
 * @param access_token The access token
 * @param refresh_token The refresh token
 */
export default function generateUserCookie(res: Response, access_token: string, refresh_token: string): void {
    res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 * 1000, // 1 hour
        sameSite: 'strict',
        path: '/'
    });

    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 3600 * 1000, // 30 days
        sameSite: 'strict',
        path: '/'
    });
}