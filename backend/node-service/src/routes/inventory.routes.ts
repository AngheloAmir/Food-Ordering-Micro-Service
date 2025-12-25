import { Router } from 'express';
import ListOfIngridents from '../controllers/inventory.listOfIngridents';

const router = Router();

router.get('/inventory/list', ListOfIngridents);

export default router;
