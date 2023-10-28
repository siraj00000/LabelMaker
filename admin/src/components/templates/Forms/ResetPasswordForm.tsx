import { useFormik } from "formik";
import { Form, useNavigation, useParams, useSubmit } from "react-router-dom";
import * as yup from "yup";
import { InputField } from "../Fields/InputField";
import Buttons from "../Button/Buttons";

type ResetPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
  token?: string;
};

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be 6 characters long or more"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
});

const ResetPasswordForm = () => {
  const { token } = useParams();
  const navigation = useNavigation();
  const submit = useSubmit();

  const formik = useFormik<ResetPasswordFormData>({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      token,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submit(values, { method: "post" });
    },
  });

  return (
    <Form
      method="POST"
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5"
    >
      <InputField
        id="newPassword"
        type="password"
        label="New Password"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        errormessage={
          formik.touched.newPassword ? formik.errors.newPassword : ""
        }
      />

      <InputField
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        errormessage={
          formik.touched.confirmPassword ? formik.errors.confirmPassword : ""
        }
      />

      <Buttons
        title={
          navigation.state === "submitting" ? "Submitting" : "Reset Password"
        }
        type="submit"
        disabled={navigation.state === "submitting"}
      />
    </Form>
  );
};
export default ResetPasswordForm;
