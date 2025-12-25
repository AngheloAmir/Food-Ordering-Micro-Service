import { Router } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import GetAllProducts from '../controllers/products.getall';
import Category from '../controllers/products.category';
import AuthMiddlewareAdmin from '../middleware/auth.middlewareadmin';
import GetAllCategories from '../controllers/products.getcategory';
import AddProduct from '../controllers/products.addproduct';

const router = Router();
router.get('/products/getall',      AuthMiddleware, GetAllProducts);
router.post('/products/category',   AuthMiddlewareAdmin, Category);
router.get('/products/getcategory', GetAllCategories);
router.post('/products/add',        AuthMiddlewareAdmin, AddProduct);

export default router;
