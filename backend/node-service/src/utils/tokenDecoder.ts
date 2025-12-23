import jwt from "jsonwebtoken";

export interface JwtPayload {
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    email: string;
    phone: string;
    app_metadata: { provider: string, providers: string[] };
    user_metadata: { email_verified: boolean };
    role: string;
    aal: string;
    amr: [{ method: string, timestamp: number }],
    session_id: string;
    is_anonymous: boolean;
}

/**
 * Decodes a JWT token and returns the payload.
 * @param token The JWT token to decode.
 * @returns The decoded payload.
 * 
 * @example
 * JwtPayload {
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    email: string;
    phone: string;
    app_metadata: { provider: string, providers: string[] };
    user_metadata: { email_verified: boolean };
    role: string;
    aal: string;
    amr: [{ method: string, timestamp: number }],
    session_id: string;
    is_anonymous: boolean;
}
 */
export default function decodeToken(token: string) {
    if (!process.env.SUPABASE_JWT_SECRET) {
        throw new Error("SUPABASE_JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(
        token,
        process.env.SUPABASE_JWT_SECRET
    ) as unknown as JwtPayload;

    return decoded;
}
