import { Router } from 'express';
import AuthMiddlewareAdmin from '../middleware/auth.middlewareadmin';
import ListOfIngridents from '../controllers/inventory.listOfIngridents';

const router = Router();

router.get('/inventory/list', AuthMiddlewareAdmin, ListOfIngridents);

export default router;
