import type { IInstructorPayload } from "@satheomkar24/common-types";
import InstructorForm from "../../components/instructor/InstructorForm";
import useInstructorResolver from "../../resolvers/InstructorResolver";

const initialValues: IInstructorPayload = {
  name: "",
  profession: "",
  about: "",
  image: "",
  contactDetails: {
    email: "",
    mobile: "",
    address: "",
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    twitter: "https://www.twitter.com/",
    instagram: "https://www.instagram.com/",
  },
};

const AddInstructor = () => {
  const { createInstructorMutation } = useInstructorResolver();

  const submitHandler = async (values: IInstructorPayload) => {
    createInstructorMutation.mutate(values);
  };

  return (
    <>
      <InstructorForm initialValues={initialValues} onSubmit={submitHandler} />
    </>
  );
};

export default AddInstructor;
