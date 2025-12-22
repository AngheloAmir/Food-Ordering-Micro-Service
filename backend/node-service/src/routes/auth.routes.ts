import { Router } from 'express';

import getAuthDbTest from '../controllers/auth.dbtest';
import AuthMiddleware from '../middleware/auth.middleware';
import AuthLogin from '../controllers/auth.login';
import Logout from '../controllers/auth.logout';
import AuthCreateNewAccount from '../controllers/auth.create';

const router = Router();
router.get('/auth/dbtest', AuthMiddleware, getAuthDbTest);
router.post('/auth/login', AuthLogin);
router.post('/auth/logout', AuthMiddleware, Logout);
router.post('/auth/create', AuthCreateNewAccount);

export default router;
