import { Router } from 'express';
import decodeTokenController from '../controllers/tools.decode';
import AuthMiddleware from '../middleware/auth.middleware';
import ListUsersController from '../controllers/tools.listusers';

const router = Router();
router.post('/tools/decode',       AuthMiddleware, decodeTokenController);
router.post('/tools/listallusers', ListUsersController);

export default router;
