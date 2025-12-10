import { Router } from 'express';
import { getHello, getTest } from '../controllers/api.controller';

const router = Router();

router.get('/hello', getHello);
router.get('/test', getTest);

export default router;
