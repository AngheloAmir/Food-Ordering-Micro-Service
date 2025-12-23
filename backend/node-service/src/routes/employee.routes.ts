import { Router } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import GetEmployee from '../controllers/employee.getEmployee';
import OnBoardAnEmployee from '../controllers/employee.onBoard';

const router = Router();
router.get('/employee/get', AuthMiddleware, GetEmployee);
router.post('/employee/onboard', AuthMiddleware, OnBoardAnEmployee);

export default router;
