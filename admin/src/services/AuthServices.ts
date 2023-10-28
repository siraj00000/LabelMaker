import { handleInsertAction } from "./common/API";

const AuthService = {
  userSignIn: (body: any) => {
    return handleInsertAction({ url: `/account/login`, data: body });
  },
  forgotPassword: (body: any) => {
    return handleInsertAction({ url: `/account/forgot-password`, data: body });
  },
  verifyAccount: (email: string, token: string) => {
    return handleInsertAction({ url: `/account/verify?email=${email}&token=${token}`});
  },
  resetPassword: (body: any) => {
    return handleInsertAction({ url: `/account/reset-password`, data: body });
  },
};

export default AuthService;
