import {
  ResetPasswordForm,
  type IResetPassword,
} from "@satheomkar24/common-types";

const ResetPassword = () => {
  const handleSubmit = async (values: IResetPassword) => {
    console.log(values, values);
  };
  return <ResetPasswordForm onSubmit={handleSubmit} />;
};

export default ResetPassword;
