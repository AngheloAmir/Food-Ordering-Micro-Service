
export const enum ErrorCodes {
    METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
    SERVER_ERROR = 'SERVER_ERROR',

    //auth
    NO_AUTH_TOKEN = 'NO_AUTH_TOKEN',
    INVALID_AUTH_TOKEN = 'INVALID_AUTH_TOKEN',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN',
    SESSION_EXPIRED = 'SESSION_EXPIRED',

    //users
    USER_CREATION_ERROR = 'USER_CREATION_ERROR',
    USER_CREATED_LOGIN_FAILED = 'USER_CREATED_LOGIN_FAILED',

    //SQL
    SQL_ERROR = 'SQL_ERROR',

}

export const enum ErrorMessages {
    METHOD_NOT_ALLOWED = 'Method Not Allowed',
    SERVER_ERROR = 'Server Error',

    //auth
    NO_AUTH_TOKEN = 'No authentication token provided',
    INVALID_AUTH_TOKEN = 'Invalid authentication token',
    TOKEN_EXPIRED = 'Token expired',
    INVALID_REFRESH_TOKEN = 'Invalid refresh token',
    SESSION_EXPIRED = 'Session expired',

    //users
    USER_CREATION_ERROR = 'Unable to create a new user',
    USER_CREATED_LOGIN_FAILED = 'User created but auto-login failed. Please log in manually.',

    //SQL
    SQL_ERROR = 'Database query error',

}