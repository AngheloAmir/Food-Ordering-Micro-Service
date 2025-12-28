import { Request, Response } from 'express';
import { User } from '../models/User';
import { createSupabase } from '../config/supabase';
import { ErrorCodes, ErrorMessages } from '../utils/errorCodes';

export default async function userInfo (req: Request, res: Response) {
    try {
        const supabase = createSupabase( req.token );
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .single();

        if (error || data.length === 0 || data === null) {
            res.status(404).json({
                error: ErrorMessages.USER_NOTFOUND,
                code:  ErrorCodes .USER_NOTFOUND,
            })
        }

    //filter out the response
        const filteredData = {
            user_id: data.user_id,
            email: data.email,
            name: data.name,
            phone1: data.phone1,
            phone2: data.phone2,
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: data.country,
            icon: data.icon,
            gender: data.gender,
            delivery_notes: data.delivery_notes,
            notes: data.notes,
        }

        res.json({
            message: 'User Info',
            data: filteredData
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