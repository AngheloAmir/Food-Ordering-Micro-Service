import { Router } from 'express';
import decodeTokenController from '../controllers/tools.decode';
import AuthMiddleware from '../middleware/auth.middleware';

const router = Router();
router.post('/tools/decode', AuthMiddleware, decodeTokenController);

export default router;
