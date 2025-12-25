import { Router } from 'express';
import AuthMiddlewareAdmin from '../middleware/auth.middlewareadmin';
import ListOfIngridents from '../controllers/inventory.listOfIngridents';
import AddInventory from '../controllers/inventory.addInventory';

const router = Router();

router.get('/inventory/list', AuthMiddlewareAdmin, ListOfIngridents);
router.post('/inventory/add', AuthMiddlewareAdmin, AddInventory);

export default router;
