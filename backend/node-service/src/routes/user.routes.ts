import { Router } from 'express';

import UserGettingStarted from '../controllers/user.gettingstarted';
import AuthMiddleware from '../middleware/auth.middleware';
import UserInfo from '../controllers/user.info';

const router = Router();
router.post('/user/gettingstarted', AuthMiddleware, UserGettingStarted);
router.get('/user/info', AuthMiddleware, UserInfo);

export default router;
