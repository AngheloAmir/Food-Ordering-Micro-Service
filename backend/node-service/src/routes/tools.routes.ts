import { Router } from 'express';
import decodeTokenController from '../controllers/tools.decode';
import AuthMiddleware from '../middleware/auth.middleware';
import ListUsersController from '../controllers/tools.listusers';
import ListEmployeesController from '../controllers/tools.listemployee';
import ListCartsController from '../controllers/tools.listcarts';
import ListCheckoutController from '../controllers/tools.listcheckout';

const router = Router();
router.post('/tools/decode',       AuthMiddleware, decodeTokenController);
router.post('/tools/listallusers', ListUsersController);
router.post('/tools/listemployee', ListEmployeesController);
router.post('/tools/listcarts',    ListCartsController);
router.post('/tools/listcheckout', ListCheckoutController);

export default router;
