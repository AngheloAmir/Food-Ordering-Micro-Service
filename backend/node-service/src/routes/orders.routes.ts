import { Router } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import GetAllOrders from '../controllers/orders.getall';

const router = Router();
router.get('/orders/getall', AuthMiddleware, GetAllOrders);

export default router;
