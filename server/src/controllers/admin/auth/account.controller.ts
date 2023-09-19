// Import the 'Account' model representing user accounts
import Account from '../../../models/admin/auth/accounts.model.js';

// Import types for handling HTTP requests and responses in Express.js
import { Request, Response, NextFunction } from 'express';

// Import a custom error response utility class
import { ErrorResponse } from '../../../utils/error_response.utils.js';

// Import a utility function for sending verification emails
import sendVerificationEmail from '../../../utils/email.utils.js';

// Import a utility function for generating verification tokens
import generateVerificationToken from '../../../utils/token.utils.js';

class AccountController {
    // Method for authenticating and generating an authentication token for the user
    public async accountLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Extract email and password from the request body
            const { email, password } = req.body;

            // Check if both email and password are provided
            if (!email || !password) return next(new ErrorResponse(401, 'Please provide email and password.'));

            // Find the user account by email and include the password field for comparison
            const account = await Account.findOne({ email }).select('+password');

            // If the account doesn't exist, return an error
            if (!account) return next(new ErrorResponse(401, 'Invalid Credentials.'));

            // Check if the provided password matches the stored password for the account
            const isMatch = await account.matchPassword(password);

            // If the passwords don't match, return an error
            if (!isMatch) return next(new ErrorResponse(401, 'Invalid Credentials.'));

            // Generate an authentication token for the user
            const token = account.generateAuthToken();

            // Create an accountInfo object with the user's role
            let accountInfo = { role: account.role };

            // Respond with a success status, the authentication token, and account information
            res.status(200).json({ success: true, token, accountInfo });
        } catch (error) {
            // Handle any errors that occur during the authentication process
            next(error);
        }
    }

    // Method for creating a new user account with a verification token
    public async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Extract user account information from the request body
            const accountInfo = req.body;

            // Generate a unique verification token (consider using a crypto library)
            const verificationToken = generateVerificationToken();

            // Set the expiration time for the verification token (e.g., one hour from now)
            const verificationTokenExpires = new Date(Date.now() + 3600000);

            // Add the generated verification token and expiration to the user account information
            accountInfo.verificationToken = verificationToken;
            accountInfo.verificationTokenExpires = verificationTokenExpires;

            // Create the user account with the provided information and verification attributes
            let account = await Account.create(accountInfo);

            // Generate a verification link using the admin URL and the user's email and token
            const verificationLink = `${process.env.ADMIN_URL}/verify/${account.email}/${verificationToken}`;

            // Send a verification email to the user with the generated verification link
            await sendVerificationEmail(account.email, verificationLink);

            // Respond with a success status and a message instructing the user to check their email
            res.status(201).json({
                success: true,
                message: 'Your account has been successfully registered! Please check your email for a verification link.'
            });
        } catch (error) {
            // Handle any errors that may occur during account creation or email sending
            next(error);
        }
    }

    // Method for verifying a user account using the provided email and verification token
    public async verifyAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Extract email and token from the query parameters
            const { email, token } = req.query;

            // Find the user account by email
            const account = await Account.findOne({ email });

            // Check if the account doesn't exist or the provided token doesn't match
            if (!account || (account && account?.verificationToken !== token)) {
                // Return an error response if the account is not found or the token is incorrect
                return next(new ErrorResponse(404, `Sorry, we couldn't find your account. Please double-check your information and try again.`));
            }

            // Check if the verification token has expired
            if (account.verificationTokenExpires! < new Date()) {
                // Return an error response if the token has expired
                return next(new ErrorResponse(401, 'Oops! It looks like your verification token has expired. Please request a new one.'));
            }

            // Update the user account to mark it as verified and clear the token and expiration
            account.isVerified = true;
            account.verificationToken = undefined;
            account.verificationTokenExpires = undefined;
            await account.save();

            // Respond with a success status and a message indicating successful verification
            res.status(200).json({
                success: true,
                msg: 'Congratulations! Your account has been successfully verified!'
            });
        } catch (error) {
            // Handle any errors that may occur during the verification process
            next(error);
        }
    }

    // Method for initiating the "Forget Password" process
    public async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;

            // Find the user account by email
            const account = await Account.findOne({ email });

            // If the account doesn't exist, return an error
            if (!account) return next(new ErrorResponse(404, 'Account not found.'));

            // Generate a unique reset password token (consider using a crypto library)
            const resetPasswordToken = generateVerificationToken();

            // Set the expiration time for the reset password token (e.g., one hour from now)
            const resetPasswordTokenExpires = new Date(Date.now() + 3600000);

            // Update the user account with the reset password token and expiration
            account.resetPasswordToken = resetPasswordToken;
            account.resetPasswordTokenExpires = resetPasswordTokenExpires;
            await account.save();

            // Generate a reset password link using the admin URL and the reset password token
            const resetPasswordLink = `${process.env.ADMIN_URL}/reset-password/${resetPasswordToken}`;

            // Send a reset password email to the user with the generated link
            await sendVerificationEmail(account.email, resetPasswordLink);

            // Respond with a success status and a message instructing the user to check their email
            res.status(200).json({
                success: true,
                message: 'Password reset instructions have been sent to your email. Please follow the link to reset your password.'
            });
        } catch (error) {
            // Handle any errors that may occur during the "Forget Password" process
            next(error);
        }
    }

    // Method for resetting the user's password
    public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { token, newPassword } = req.body;

            // Find the user account by the reset password token
            const account = await Account.findOne({
                resetPasswordToken: token,
                resetPasswordTokenExpires: { $gte: new Date() } // Check if the token is still valid
            });

            // If the account doesn't exist or the token is invalid/expired, return an error
            if (!account) return next(new ErrorResponse(400, 'Invalid or expired reset password token.'));

            // Set the new password and clear the reset password token and expiration
            account.password = newPassword;
            account.resetPasswordToken = undefined;
            account.resetPasswordTokenExpires = undefined;
            await account.save();

            // Respond with a success status and a message indicating successful password reset
            res.status(200).json({
                success: true,
                message: 'Your password has been successfully reset.'
            });
        } catch (error) {
            // Handle any errors that may occur during the password reset process
            next(error);
        }
    }
}

export default new AccountController();
