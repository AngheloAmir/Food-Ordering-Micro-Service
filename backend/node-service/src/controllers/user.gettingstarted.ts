import { Request, Response } from 'express';

export default async function UserGettingStarted(req: Request, res: Response) {

    res.json({
        message: 'User Getting Started'
    });
}