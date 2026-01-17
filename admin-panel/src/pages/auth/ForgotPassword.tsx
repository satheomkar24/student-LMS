import {
  ForgotPasswordForm,
  type IForgotPassword,
} from "@satheomkar24/common-types";
import { authService } from "../../services/authService";

const ForgotPassword = () => {
  const handleSubmit = async (values: IForgotPassword) => {
    await authService.forgotPassword(values);
  };
  return <ForgotPasswordForm onSubmit={handleSubmit} />;
};

export default ForgotPassword;
