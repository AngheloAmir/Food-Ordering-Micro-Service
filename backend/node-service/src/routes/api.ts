import { Router } from 'express';

import getAuthDbTest from '../controllers/auth.dbtest';
import AuthMiddleware from '../middleware/auth.middleware';
import AuthLogin from '../controllers/auth.login';
import Logout from '../controllers/auth.logout';

const router = Router();
router.get('/auth/dbtest', AuthMiddleware, getAuthDbTest);
router.post('/auth/login', AuthLogin);
router.post('/auth/logout', AuthMiddleware, Logout);


export default router;
