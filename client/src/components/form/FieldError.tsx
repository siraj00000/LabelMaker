type ErrorProps = {
  errorName: any;
};

const FieldError = ({ errorName }: ErrorProps) => {
  return (
    <>
      {errorName && (
        <span className="text-red-400 text-sm mt-2">{errorName.message}</span>
      )}
    </>
  );
};

export default FieldError;
