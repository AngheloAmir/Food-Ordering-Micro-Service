import { Router } from 'express';
import UserGettingStarted from '../controllers/user.gettingstarted';

const router = Router();
router.post('/user/gettingstarted', UserGettingStarted);

export default router;
