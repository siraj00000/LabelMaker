import { Route } from "react-router-dom";
import { ForgotPassword, SignIn, SignInAction, ForgotPasswordAction, ResetPassword, ResetPasswordAction, VerifyAccount } from "../../pages";

const AuthRoutes = (
  <>
    <Route path="verify/:email/:token" element={<VerifyAccount />} />
    <Route path="signin" element={<SignIn />} action={SignInAction} />
    <Route path="forgot-password" element={<ForgotPassword />} action={ForgotPasswordAction} />
    <Route path="reset-password/:token" element={<ResetPassword />} action={ResetPasswordAction} />
  </>
);

export default AuthRoutes;
