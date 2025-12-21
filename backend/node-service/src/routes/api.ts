import { Router } from 'express';

import getAuthDbTest from '../controllers/auth.dbtest';
import verifyUser from '../middleware/auth.middleware';
import AuthLogin from '../controllers/auth.login';
import Logout from '../controllers/auth.logout';

const router = Router();
router.get('/authdbtest', verifyUser, getAuthDbTest);
router.post('/login', AuthLogin);
router.post('/logout', verifyUser, Logout);


export default router;
