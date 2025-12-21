import { Router } from 'express';
import { getHello, getTest, getTestDb } from '../controllers/_testControllers';

const router = Router();

router.get('/hello', getHello);
router.get('/test', getTest);
router.get('/testdb', getTestDb);



export default router;
