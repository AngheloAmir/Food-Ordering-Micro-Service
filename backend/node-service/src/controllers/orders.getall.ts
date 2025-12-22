import { Request, Response } from 'express';

export default async function GetAllOrders(req: Request, res: Response) {

    res.json({
        message: 'Get All Orders'
    });
}