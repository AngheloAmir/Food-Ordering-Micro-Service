import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
