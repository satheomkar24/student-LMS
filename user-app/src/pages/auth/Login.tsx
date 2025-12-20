import { LoginForm, type ILogin } from "@satheomkar24/common-types";

const Register = () => {
  const handleSubmit = async (values: ILogin) => {
    console.log(values, values);
  };
  return <LoginForm onSubmit={handleSubmit} />;
};

export default Register;
