import { Router } from 'express';

import AuthMiddleware from '../middleware/auth.middleware';
import AuthLogin from '../controllers/auth.login';
import Logout from '../controllers/auth.logout';
import AuthCreateNewAccount from '../controllers/auth.register';

const router = Router();
router.post('/auth/login', AuthLogin);
router.post('/auth/logout', AuthMiddleware, Logout);
router.post('/auth/register', AuthCreateNewAccount);

export default router;
