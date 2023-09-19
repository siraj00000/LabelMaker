import React from "react";
import { Form } from "react-router-dom";

interface FormLayoutProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  action?: string;
  method: "POST" | "GET" | "PUT";
}

const FormLayout: React.FC<FormLayoutProps> = ({
  onSubmit,
  children,
  action,
  method,
}) => (
  <Form
    action={action}
    method={method}
    className="space-y-3 w-full"
    onSubmit={onSubmit}
  >
    {children}
  </Form>
);

export default FormLayout;
