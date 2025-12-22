import { Request, Response } from 'express';

export default async function addWork(req: Request, res: Response) {

    res.json({
        message: 'This is the work'
    });
}