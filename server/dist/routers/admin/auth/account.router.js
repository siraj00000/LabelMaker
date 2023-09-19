import express from 'express';
import AccountController from '../../../controllers/admin/auth/account.controller.js';
const router = express.Router();
router
    // Register a new account and send a verification email
    .post('/register', AccountController.createAccount)
    // Verify an account using a verification token
    .post('/verify', AccountController.verifyAccount)
    // Login to an account
    .post('/login', AccountController.accountLogin)
    // Forget Password: Initiate the password reset process
    .post('/forgot-password', AccountController.forgotPassword)
    // Reset Password: Handle password reset with a token
    .post('/reset-password', AccountController.resetPassword);
export default router;
//# sourceMappingURL=account.router.js.map