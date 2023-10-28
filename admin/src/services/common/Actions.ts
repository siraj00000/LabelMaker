import { ActionFunctionArgs } from "react-router-dom";
import AuthService from "../AuthServices";
import {
  ApiGetResponse,
  ErrorResponse,
  ForgetOrResetPasswordResponse,
  PostAPIResponse,
  SignInResponse,
} from "../../types/response.type";
import {
  handleError,
  handleSuccessfulSignIn,
  redirectToHomePageAfterDelay,
} from "../../utils/authActions";
import { notifySuccess } from "../../utils/toast";
import CategoryService from "../CategoryServices";

const AuthActions = {
  SignInAction: async ({ request }: ActionFunctionArgs) => {
    try {
      const formData = await request.formData();
      const response = (await AuthService.userSignIn(
        formData
      )) as SignInResponse;

      if (response.data.success) {
        handleSuccessfulSignIn(response.data.token);
        return { success: true, data: response.data };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  forgotPasswordAction: async ({ request }: ActionFunctionArgs) => {
    try {
      const formData = await request.formData();
      const response = (await AuthService.forgotPassword(
        formData
      )) as ForgetOrResetPasswordResponse;

      if (response.data.success) {
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  resetPasswordActions: async ({ request }: ActionFunctionArgs) => {
    try {
      const formData = await request.formData();
      const response = (await AuthService.resetPassword(
        formData
      )) as ForgetOrResetPasswordResponse;

      if (response.data.success) {
        notifySuccess(response.data.message);
        redirectToHomePageAfterDelay();
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
};

const DashboardLoaders = {
  // Category
  fetchLoaderData: async (loader: Promise<unknown>) => {
    try {
      const { data } =
        (await loader) as ApiGetResponse;

      if (data.success) {
        return { data: data.data, pagination: data.pagination };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
};

const DashboardActions = {
  createCategoryAction: async (formData: any) => {
    try {
      const response = (await CategoryService.create(
        formData
      )) as PostAPIResponse;

      if (response.data.success) {
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  updateCategoryAction: async (id: string, formData: any) => {
    try {
      const response = (await CategoryService.update(
        id, formData
      )) as PostAPIResponse;

      if (response.data.success) {
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  updateCategoryStatusAction: async (id: string) => {
    try {
      const response = (await CategoryService.updateStatus(
        id
      )) as PostAPIResponse;

      if (response.data.success) {
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  updateMultipleCategoryStatusAction: async (ids: string[], status: string) => {
    try {
      const response = (await CategoryService.updateMultipleStatus(
        ids, status
      )) as PostAPIResponse;

      if (response.data.success) {
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  deleteOneCategoryStatusAction: async (id: string, revalidate: () => void) => {
    try {
      const response = (await CategoryService.deleteOneCategory(
        id
      )) as PostAPIResponse;

      if (response.data.success) {
        revalidate();
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  deleteAllCategoryStatusAction: async (ids: string[], revalidate: () => void) => {
    try {
      const response = (await CategoryService.deleteAllCategory(
        ids
      )) as PostAPIResponse;

      if (response.data.success) {
        revalidate();
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },

  createAction: async (action: Promise<any>) => {
    try {
      const response = (await action) as PostAPIResponse;

      if (response.data.success) {
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  updateAction: async (updateAction: Promise<any>) => {
    try {
      const response = (await updateAction) as PostAPIResponse;

      if (response.data.success) {
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
  deleteAction: async (deleteAction: Promise<any>, revalidate: () => void) => {
    try {
      const response = (await deleteAction) as PostAPIResponse;

      if (response.data.success) {
        revalidate();
        notifySuccess(response.data.message);
        return { success: true };
      }
    } catch (err) {
      const error = err as ErrorResponse;
      const errorRes = handleError(error);
      return { success: false, error: errorRes };
    }
  },
}

export { AuthActions, DashboardLoaders, DashboardActions };
