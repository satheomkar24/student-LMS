import { useParams } from "react-router-dom";
import { Alert } from "reactstrap";
import InstructorForm from "../../components/instructor/InstructorForm";
import useInstructorResolver from "../../resolvers/InstructorResolver";
import type { IInstructorPayload } from "@satheomkar24/common-types";

const EditInstructor = () => {
  const { id } = useParams<{ id: string }>();
  const { instructorById, isInstructorByIdLoading, updateInstructorMutation } =
    useInstructorResolver({
      instructorId: id,
    });

  const submitHandler = async (values: IInstructorPayload) => {
    updateInstructorMutation.mutate({ id: id!, data: values });
  };

  if (isInstructorByIdLoading) return null;

  if (!instructorById) {
    return <Alert variant="danger">Instructor not found</Alert>;
  }

  return (
    <InstructorForm initialValues={instructorById!} onSubmit={submitHandler} />
  );
};

export default EditInstructor;
