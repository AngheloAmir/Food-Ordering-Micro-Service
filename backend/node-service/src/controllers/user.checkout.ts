import { Request, Response } from 'express';
import { createSupabase } from '../config/supabase';
import { ErrorCodes, ErrorMessages } from '../utils/errorCodes';

export default async function checkoutOrder (req: Request, res: Response) {
    try {
        const supabase = createSupabase( req.token );

        if(req.body.checkout) {
            res.json({
                message: 'checking out',
                data: null,
                auth: req.newToken && req.newRefreshToken ?
                {
                    token:        req.newToken,
                    refreshToken: req.newRefreshToken
                }
                :
                null
            })
        }
        

        res.json({
            message: 'User Order',
            data: null,
            auth: req.newToken && req.newRefreshToken ?
            {
                token:        req.newToken,
                refreshToken: req.newRefreshToken
            }
            :
            null
        })
       
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: ErrorMessages.SERVER_ERROR,
            code:  ErrorCodes.SERVER_ERROR,
        })
    }
}