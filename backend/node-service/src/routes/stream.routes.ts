import { Router } from 'express';
import testRoute from '../controllers/stream.testroute';
const router = Router();

router.post('/stream/test', testRoute);

export default router;
