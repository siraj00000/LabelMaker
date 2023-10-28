import { ActionFunctionArgs } from "react-router-dom";
import ResetPasswordForm from "../../components/templates/Forms/ResetPasswordForm";
import { AiOutlineTags } from "react-icons/ai";
import { AuthActions } from "../../services/common/Actions";

const ResetPassword = () => {
  return (
    <div className="bg-primaryLightGray min-h-screen flex items-center justify-center py-[2%] px-[5%]">
      <aside className="max-w-md w-full sm:px-[32px] px-[20px] py-[3%] bg-white rounded-xl shadow-md space-y-4">
        <div className="flex items-center justify-center gap-2 text-primaryDarkGray text-xl font-jakartaPlus font-semibold text-center mb-6">
          <AiOutlineTags size={30} /> <span>Label Makers</span>
        </div>
        <ResetPasswordForm />
      </aside>
    </div>
  );
};

export const ResetPasswordAction = async (actionArgs: ActionFunctionArgs) => {
  return AuthActions.resetPasswordActions(actionArgs)
};

export default ResetPassword;
