import { Router } from 'express';

import UserGettingStarted from '../controllers/user.gettingstarted';
import AuthMiddleware from '../middleware/auth.middleware';
import UserInfo from '../controllers/user.info';
import UserCart from '../controllers/user.cart';
import UserCheckout from '../controllers/user.checkout';

const router = Router();
router.post('/user/gettingstarted', AuthMiddleware, UserGettingStarted);
router.get('/user/info', AuthMiddleware, UserInfo);
router.post('/user/cart', AuthMiddleware, UserCart);
router.post('/user/checkout', AuthMiddleware, UserCheckout);

export default router;
