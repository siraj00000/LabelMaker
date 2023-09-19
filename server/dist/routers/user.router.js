import { Router } from 'express';
import userController from '../controllers/user.controller.js';
const router = Router();
router.post('/register-user', userController.createUser).post('/login-user', userController.userLogin);
export default router;
//# sourceMappingURL=user.router.js.map