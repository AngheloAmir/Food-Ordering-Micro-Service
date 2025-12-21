import { Request, Response } from 'express';
import supabase from '../config/supabase';

export const getHello = (req: Request, res: Response) => {
    res.json({ message: 'Hello World from Node.js with TypeScript! hehe' });
};

export const getTest = (req: Request, res: Response) => {
    res.json({ message: 'This is a test endpoint', timestamp: new Date() });
};

export const getTestDb = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('test')
            .select('*')
            .eq('testtext', 'test 2');

        if (error) {
            console.error('Supabase error:', error);
            res.status(500).json({ error: error.message });
            return;
        }

        if (data && data.length > 0) {
            res.json({ message: 'test 2 is found', data });
        } else {
            res.status(404).json({ message: 'test 2 not found' });
        }
    } catch (err: any) {
        console.error('Server error:', err);
        res.status(500).json({ error: err.message });
    }
};

export const postLogin = async (req: Request, res: Response) => {
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

        res.json({ message: 'Login successful', session: data.session, user: data.user });

    } catch (err: any) {
        console.error('Server error during login:', err);
        res.status(500).json({ error: err.message });
    }
};

export const getVerifyToken = (req: Request, res: Response) => {
    // req.user is populated by the middleware
    res.json({
        message: 'Token is valid',
        user: {
            id: req.user.id,
            email: req.user.email,
            aud: req.user.aud
        }
    });
};

export const postLogout = async (req: Request, res: Response) => {
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

export const postVerifyLogin = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    // 1. Check if user is already logged in via token
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            const { data: { user }, error } = await supabase.auth.getUser(token);
            if (user && !error) {
                res.status(400).json({ error: 'User is already logged in. Please logout first.' });
                return;
            }
        }
    }

    // 2. If not logged in, proceed with credential verification
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

        // Return specific token info as requested
        res.json({
            message: 'Login verification successful',
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            user: {
                id: data.user.id,
                email: data.user.email,
                role: data.user.role
            }
        });

    } catch (err: any) {
        console.error('Server error during login verification:', err);
        res.status(500).json({ error: err.message });
    }
};
