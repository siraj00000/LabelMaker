import { LoginForm } from "../../components";
import { ActionFunctionArgs } from "react-router-dom";
import { LoginResponse } from "../../types/response.types";
import AuthService from "../../services/AuthService";
import { handleLoginError, handleSuccessfulLogin } from "../../utils/authUtils";

const LoginPage = () => {
  return (
    <main className="p-10 h-screen">
      <aside className="w-4/5 h-full mx-auto flex items-center rounded-xl shadow-md justify-center overflow-hidden">
        <section className="w-1/2 h-full bg-black">
          <img
            className="object-cover object-left-bottom w-full h-full"
            src={require("../../assets/img/create-account-office.jpeg")}
            alt="create-office-account"
          />
        </section>
        <section className="w-1/2 p-8 flex items-center justify-center">
          <LoginForm />
        </section>
      </aside>
    </main>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const response = (await AuthService.userLogin(formData)) as LoginResponse;

    if (response.data.success) {
      handleSuccessfulLogin(response.data.token);
      return { success: true };
    }
  } catch (err) {
    const error = err as LoginResponse;
    const errorRes = handleLoginError(error);
    return { success: false, error: errorRes };
  }
};

export default LoginPage;
