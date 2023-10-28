import { useFormik } from "formik";
import {
  Form,
  NavLink,
  useLocation,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import * as yup from "yup";
import { InputField } from "../Fields/InputField";
import Buttons from "../Button/Buttons";

type ForgotPasswordFormData = {
  email: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgetPasswordForm = () => {
  const { state: forgottenPasswordEmail } = useLocation();
  const navigation = useNavigation();
  const submit = useSubmit();

  const formik = useFormik<ForgotPasswordFormData>({
    initialValues: {
      email: forgottenPasswordEmail,
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
        id="email"
        type="email"
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        readOnly
        errormessage={formik.touched.email ? formik.errors.email : ""}
      />

      <Buttons
        title={
          navigation.state === "submitting"
            ? "sending email..."
            : "Forgot Password"
        }
        type="submit"
        disabled={navigation.state === "submitting"}
      />
      <NavLink
        to={"/signin"}
        replace
        className="text-xs text-center font-medium text-primaryDarkGray hover:underline"
      >
        Wrong email address back to Sign In?
      </NavLink>
    </Form>
  );
};
export default ForgetPasswordForm;
