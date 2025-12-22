import { Router } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import addWork from '../controllers/workday.addWork';

const router = Router();
router.post('/workday/add', AuthMiddleware, addWork);

export default router;
