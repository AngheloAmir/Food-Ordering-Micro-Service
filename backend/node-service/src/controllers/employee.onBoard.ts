import { Request, Response } from 'express';
import santizer from "../utils/stringSanitizer";
import decodeToken from '../utils/tokenDecoder';
import { createSupabaseAdmin } from '../config/supabase';

export default async function OnBoardAnEmployee(req: Request, res: Response) {
    const { passkey } = req.body;
    if (passkey !== 'adminallow') {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    const {
        role,
        admin_notes,
        first_name,
        last_name,
        middle_name,
        gender,
        phone_number,
        address,
        city,
        state,
        zip_code,
        country,
        emergency_contacts
    } = req.body;
    
    const tokenData    = decodeToken(req.token);
    const { data, error } = await createSupabaseAdmin().from('employee').insert([
        {
            employee_id:    tokenData.sub,
            role:           santizer.sanitize(role),
            admin_notes:    santizer.sanitize.keepSpace(admin_notes),
            first_name:     santizer.sanitize.keepSpace(first_name),
            last_name:      santizer.sanitize.keepSpace(last_name),
            middle_name:    santizer.sanitize.keepSpace(middle_name),
            gender:         santizer.sanitize(gender),
            phone_number:   santizer.sanitize.keepNumber(phone_number),
            address:        santizer.sanitize.keepSpace(address),
            city:           santizer.sanitize.keepSpace(city),
            state:          santizer.sanitize.keepSpace(state),
            zip_code:       santizer.sanitize.keepNumber(zip_code),
            country:        santizer.sanitize.keepSpace(country),
            emergency_contacts: emergency_contacts
        }
    ]);
    
    if (error) 
        return res.status(500).json({
            message: 'Internal Server Error',
            reason: error
        });

    res.json({
        message: 'Employee created successfully',
        data
    });
}