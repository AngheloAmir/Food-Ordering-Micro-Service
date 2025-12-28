import { Request, Response } from 'express';
import { ErrorMessages, ErrorCodes } from '../utils/errorCodes';
import decodeToken from '../utils/tokenDecoder';

export default function decodeTokenController(req: Request, res: Response) {
    if (req.body.code !== "En8aZ5y1Al7a" || req.body.pass !== "9cm4hHMetlb8") {
        res.status(401).json({
            code: "You are not allowed to use this tool"
        });
        return;
    }

    try {
        const decoded = decodeToken( req.token );
        res.json(decoded);
    } catch (err: any) {
        console.error('Token decoding failed:', err);
        res.status(500).json({
            error: ErrorMessages.INVALID_AUTH_TOKEN,
            code: ErrorCodes.INVALID_AUTH_TOKEN
        });
    }
}