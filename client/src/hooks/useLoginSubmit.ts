import { useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";

const useLoginSubmit = () => {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors: err },
  } = useForm();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Create a FormData object and append the form fields
    const formData = new FormData(event.currentTarget);

    // Use the submit function to send the FormData
    submit(formData);
  };

  return {
    register,
    handleSubmit,
    err,
    onSubmit,
  };
};

export default useLoginSubmit;
