import { Request, Response } from 'express';

export default async function AddProduct(req: Request, res: Response) {
    

    return res.json({ message: "Product added successfully" });
}
