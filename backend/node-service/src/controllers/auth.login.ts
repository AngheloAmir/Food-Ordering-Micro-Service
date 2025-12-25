import { Request, Response } from 'express';
import { createSupabaseAdmin } from '../config/supabase';
import { UAParser } from 'ua-parser-js';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';
import { ErrorMessages, ErrorCodes } from '../utils/errorCodes';
import generateUserCookie from '../utils/generateUserCookie';
import santizer from "../utils/stringSanitizer";

export default async function AuthLogin(req: Request, res: Response) {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            error: ErrorMessages.USER_LOGIN_FAILED,
            code: ErrorCodes.USER_LOGIN_FAILED
        });
        return;
    }

    if( !santizer.validate.isEmail(email) ) {
        res.status(400).json({
            error: ErrorMessages.INVALID_EMAIL_OR_PASS,
            code: ErrorCodes.INVALID_EMAIL_OR_PASS,
        });
        return;
    }

    if( !santizer.validate.isPassword6to20(password) ) {
        res.status(400).json({
            error: ErrorMessages.INVALID_EMAIL_OR_PASS,
            code: ErrorCodes.INVALID_EMAIL_OR_PASS,
        });
        return;
    }
    
    try {
        const { data, error } = await createSupabaseAdmin().auth.signInWithPassword({
            email: santizer.validate.isEmail(email) as string,
            password: santizer.validate.isPassword6to20(password) as string,
        });

        if (error) {
            console.error('Login error:', error);
            res.status(401).json({
                error: error.message,
                code: ErrorCodes.USER_LOGIN_FAILED
            });
            return;
        }

        //user info=============================================================================
        const userAgent = req.headers['user-agent'] || '';
        const parser = new UAParser(userAgent);
        const deviceResult = parser.getResult();

        const clientIp = requestIp.getClientIp(req) || '';
        const geo = geoip.lookup(clientIp);
        const login_info = {
            ip_address: clientIp,
            device: {
                browser: deviceResult.browser.name,
                version: deviceResult.browser.version,
                os: `${deviceResult.os.name} ${deviceResult.os.version}`,
                type: deviceResult.device.type || 'desktop/unknown'
            },
            location: geo ? {
                country: geo.country,
                region: geo.region,
                city: geo.city,
                timezone: geo.timezone
            } : {
                message: "Location not found (likely localhost or private IP)"
            }
        }

        //THIS SHOULD BE STORING THE LOGIN DATA IN THE DB====================================
        console.log("user login data");
        console.log(login_info);

        // Set HTTP-only cookie
        generateUserCookie(res, data.session.access_token, data.session.refresh_token);

        res.json({
            message: 'user logged in successfully',
            code: 'LOGIN_SUCCESS'
        });

    } catch (err: any) {
        console.error('Server error during login:', err);
        res.status(500).json({
            error: ErrorMessages.SERVER_ERROR + ' ' + err,
            code: ErrorCodes.SERVER_ERROR
        });
    }
};