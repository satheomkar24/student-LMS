import {
  ForgotPasswordForm,
  type IForgotPassword,
} from "@satheomkar24/common-types";

const ForgotPassword = () => {
  const handleSubmit = async (values: IForgotPassword) => {
    console.log(values, values);
  };
  return <ForgotPasswordForm onSubmit={handleSubmit} />;
};

export default ForgotPassword;
