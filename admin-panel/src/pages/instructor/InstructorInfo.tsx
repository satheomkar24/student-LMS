import { useParams } from "react-router-dom";
import InstructorDetails from "../../components/instructor/InstructorDetails";
import useInstructorResolver from "../../resolvers/InstructorResolver";
import { Alert } from "reactstrap";

const InstructorInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { instructorById, isInstructorByIdLoading } = useInstructorResolver({
    instructorId: id,
  });

  if (isInstructorByIdLoading) return null;

  if (!instructorById) {
    return <Alert variant="danger">Instructor not found</Alert>;
  }
  return <InstructorDetails instructor={instructorById} />;
};

export default InstructorInfo;
