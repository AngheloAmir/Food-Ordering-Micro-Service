import { createSupabase } from "../config/supabase";
import { Request, Response } from 'express';
import { ErrorMessages, ErrorCodes } from "../utils/errorCodes";
import decodeToken from "../utils/tokenDecoder";

export default async function UserGettingStarted(req: Request, res: Response) {
    const string       = require("string-sanitizer");
    const userSupabase = createSupabase(req.token);
    const tokenData    = decodeToken(req.token);

    if(!req.body.name || req.body.name.trim() === "") 
        return res.status(400).json({
            error: ErrorMessages.USER_CREATION_ERROR,
            code: ErrorCodes.USER_CREATION_ERROR,
            message: "Name is required"
        });
    
    const { data, error } = await userSupabase
        .from('users')
        .insert({
            user_id: tokenData.sub,
            email:   tokenData.email,
            name:    string.sanitize.keepSpace(req.body.name),
            phone1:  req.body.phone1    ? string.sanitize.keepNumber(req.body.phone1) : "0",
            phone2:  req.body.phone2    ? string.sanitize.keepNumber(req.body.phone2) : "0",
            address: req.body.address   ? string.sanitize.keepSpace(req.body.address) : "Unknown",
            city:    req.body.city      ? string.sanitize.keepSpace(req.body.city)    : "Unknown",
            state:   req.body.state     ? string.sanitize.keepSpace(req.body.state)   : "Unknown",
            zip:     req.body.zip       ? string.sanitize.keepSpace(req.body.zip)     : "Unknown",
            country: req.body.country   ? string.sanitize.keepSpace(req.body.country) : "Unknown",
            icon:    req.body.icon      ? string.sanitize.keepSpace(req.body.icon)    : "default",
            notes:   req.body.notes     ? string.sanitize.keepSpace(req.body.notes)   : "",
            gender:  req.body.gender    ? string.sanitize(req.body.gender)  : "",
            delivery_notes: req.body.delivery_notes ? string.sanitize.keepSpace(req.body.delivery_notes) : "",
        });

    if (error) {
        console.log(error);
        return res.status(401).json({
            error: ErrorMessages.ALREADY_EXISTS,
            code:  ErrorCodes.ALREADY_EXISTS,
        });
    }

    res.json({
        message: 'User Getting Started',
        data: data
    });
}