import { Request, Response } from 'express';

export default async function GetAllProducts(req: Request, res: Response) {

    res.json({
        message: 'Get All Products'
    });
}