import { Request, Response } from 'express';

export const getHello = (req: Request, res: Response) => {
    res.json({ message: 'Hello World from Node.js with TypeScript! hehe' });
};

export const getTest = (req: Request, res: Response) => {
    res.json({ message: 'This is a test endpoint', timestamp: new Date() });
};
