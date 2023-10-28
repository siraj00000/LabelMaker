import { useFormik } from "formik";
import { Form, NavLink, useNavigation, useSubmit } from "react-router-dom";
import * as yup from "yup";
import { InputField } from "../Fields/InputField";
import Buttons from "../Button/Buttons";

type SignInFormData = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  // .min(6, "Password must be 6 characters long or more"),
});

const SignInForm = () => {
  const navigation = useNavigation();
  const submit = useSubmit();

  const formik = useFormik<SignInFormData>({
    initialValues: {
      email: "",
      password: "",
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
      className="flex flex-col gap-2"
    >
      <InputField
        id="email"
        type="email"
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        errormessage={formik.touched.email ? formik.errors.email : ""}
      />
      <InputField
        id="password"
        type="password"
        label="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        errormessage={formik.touched.password ? formik.errors.password : ""}
      />

      <div className="flex items-center justify-end gap-2 mt-3 mb-5">
        <NavLink
          to={formik.values.email ? "/forgot-password" : "#"}
          state={formik.values.email}
          className={`text-primaryGreen font-jakartaPlus sm:text-[14px] text-[12px] text-right capitalize ${
            !formik.values.email ? "disabled-link cursor-not-allowed" : "" 
            }`}
          title="Enter email to enable"
        >
          Forgot Password?
        </NavLink>
      </div>

      <Buttons
        title={navigation.state === "submitting" ? "Submitting" : "Sign In"}
        type="submit"
        disabled={navigation.state === "submitting"}
      />
    </Form>
  );
};
export default SignInForm;
