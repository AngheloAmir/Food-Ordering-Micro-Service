import { Router } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import GetAllProducts from '../controllers/products.getall';

const router = Router();
router.get('/products/getall', AuthMiddleware, GetAllProducts);

export default router;
