import { Request, Response } from 'express';

export default async function GetEmployee(req: Request, res: Response) {

    res.json({
        message: 'This is the employee'
    });
}