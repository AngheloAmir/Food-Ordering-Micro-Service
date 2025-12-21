import { Router } from 'express';
import { getHello, getTest, getTestDb, postLogin, getVerifyToken, postLogout, postVerifyLogin } from '../controllers/_testControllers';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.get('/hello', getHello);
router.get('/test', getTest);
router.get('/testdb', getTestDb);
router.post('/login', postLogin);
router.get('/verify-token', authenticateUser, getVerifyToken);
router.post('/logout', authenticateUser, postLogout);
router.post('/verify-login', postVerifyLogin);



export default router;
