import { Request, Response } from 'express';
import { ErrorMessages, ErrorCodes } from '../utils/errorCodes';
import decodeToken from '../utils/tokenDecoder';

export default function decodeTokenController(req: Request, res: Response) {
    const token = req.cookies.access_token;

    if (!token) {
        res.status(401).json({
            error: ErrorMessages.NO_AUTH_TOKEN,
            code: ErrorCodes.NO_AUTH_TOKEN
        });
        return;
    }

    if (req.body.code !== "En8aZ5y1Al7a" || req.body.pass !== "9cm4hHMetlb8") {
        res.status(401).json({
            code: "You are not allowed to use this tool"
        });
        return;
    }

    try {
        const decoded = decodeToken(token);
        res.json(decoded);
    } catch (err: any) {
        console.error('Token decoding failed:', err);
        res.status(500).json({
            error: ErrorMessages.INVALID_AUTH_TOKEN,
            code: ErrorCodes.INVALID_AUTH_TOKEN
        });
    }
}