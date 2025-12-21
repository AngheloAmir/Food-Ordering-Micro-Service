import { Request, Response } from 'express';
import supabase from '../config/supabase';
import { UAParser } from 'ua-parser-js';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';

export default async function AuthLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Login error:', error);
            res.status(401).json({ error: error.message });
            return;
        }

        //user info
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

        console.log("user login data");
        console.log(login_info);

        res.json({
            message: 'success',
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
        });

    } catch (err: any) {
        console.error('Server error during login:', err);
        res.status(500).json({ error: err.message });
    }
};