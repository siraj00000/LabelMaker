import React from "react";

type FormTitleProps = {
  title: String;
};

const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
  return (
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      {title}
    </h2>
  );
};

export default FormTitle;
