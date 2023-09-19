import { handleInsertAction } from "./common/api";

const AuthService = {
  userLogin: (body: any) => {
    return handleInsertAction({ url: `/account/login`, data: body });
  },
};

export default AuthService;
