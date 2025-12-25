import { Router } from 'express';
import decodeTokenController from '../controllers/tools.decode';
import AuthMiddleware from '../middleware/auth.middleware';
import ListUsersController from '../controllers/tools.listusers';
import ListEmployeesController from '../controllers/tools.listemployee';

const router = Router();
router.post('/tools/decode',       AuthMiddleware, decodeTokenController);
router.post('/tools/listallusers', ListUsersController);
router.post('/tools/listemployee', ListEmployeesController);

export default router;
