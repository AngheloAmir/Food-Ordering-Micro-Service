import { Router } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import GetAllProducts from '../controllers/products.getall';
import Category from '../controllers/products.category';
import AuthMiddlewareAdmin from '../middleware/auth.middlewareadmin';
import GetAllCategories from '../controllers/products.getcategory';
import Product from '../controllers/products.product';
import InventoryController from '../controllers/products.inventory';

const router = Router();
router.get('/products/getall',      AuthMiddleware, GetAllProducts);
router.post('/products/category',   AuthMiddlewareAdmin, Category);
router.get('/products/getcategory', GetAllCategories);
router.post('/products/product',    AuthMiddlewareAdmin, Product);
router.post('/products/inventory', AuthMiddlewareAdmin, InventoryController);

export default router;
