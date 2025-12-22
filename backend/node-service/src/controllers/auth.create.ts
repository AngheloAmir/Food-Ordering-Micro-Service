import supabase from "../config/supabase";
import { Request, Response } from 'express';
import { ErrorCodes, ErrorMessages } from "../utils/errorCodes";
import generateUserCookie from "../utils/generateUserCookie";

export default async function AuthCreateNewAccount(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            error: ErrorMessages.USER_CREATION_ERROR,
            code: ErrorCodes.USER_CREATION_ERROR
        });
        return;
    }

    try {
        const { error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                role: 'user'
            }
        });

        if (createError) {
            console.error('User creation error:', createError);
            res.status(500).json({
                error: ErrorMessages.USER_CREATION_ERROR + '. Reason: ' + createError.message,
                code: ErrorCodes.USER_CREATION_ERROR
            });
            return;
        }

        // Auto-login after creation
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError || !loginData.session) {
            console.error('Auto-login error:', loginError);
            res.status(201).json({
                message: ErrorMessages.USER_CREATED_LOGIN_FAILED,
                code: ErrorCodes.USER_CREATED_LOGIN_FAILED
            });
            return;
        }

        // Set cookies
        generateUserCookie(res, loginData.session.access_token, loginData.session.refresh_token);

        res.json({
            message: 'User created and logged in successfully',
            newUser: true
        });

    } catch (err: any) {
        console.error('Server error during user creation:', err);
        res.status(500).json({
            error: ErrorMessages.SERVER_ERROR + ' ' + err,
            code: ErrorCodes.SERVER_ERROR
        });
    }
}