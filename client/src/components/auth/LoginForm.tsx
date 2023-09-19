import React from "react";
import FormLayout from "../form/FormLayout";
import InputField from "../form/InputField";
import Button from "../form/Button";
import FormTitle from "../form/FormTitle";
import { NavLink } from "react-router-dom";
import useLoginSubmit from "../../hooks/useLoginSubmit";

const LoginForm: React.FC = () => {
  const { onSubmit } = useLoginSubmit();
  return (
    <FormLayout onSubmit={onSubmit} action="/login" method="POST">
      <FormTitle title="Sign in to your account" />

      <div>
        <div>
          <InputField
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="mark@example.com"
            required
          />
        </div>
      </div>

      <div>
        <div>
          <InputField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="***#22"
            required
          />
        </div>
      </div>

      <div className="text-sm">
        <NavLink
          to="/"
          className="font-semibold text-primary hover:text-primary ml-auto"
        >
          Forget Password
        </NavLink>
      </div>

      <div>
        <Button type="submit" text="Sign in" />
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{" "}
        <NavLink
          to="/"
          className="font-semibold leading-6 text-primary hover:text-primary"
        >
          Create your account
        </NavLink>
      </p>
    </FormLayout>
  );
};

export default LoginForm;
