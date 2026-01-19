import { useParams } from "react-router-dom";
import InstructorDetails from "../../components/instructor/InstructorDetails";
import useInstructorResolver from "../../resolvers/InstructorResolver";
import { Alert } from "reactstrap";
import SectionHeading from "../../reusables/SectionHeading";

const InstructorInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { instructorById, isInstructorByIdLoading } = useInstructorResolver({
    instructorId: id,
  });

  if (isInstructorByIdLoading) return null;

  if (!instructorById) {
    return (
      <>
        <SectionHeading name="Instructor Info" />
        <section className="container my-4">
          <Alert variant="danger">Instructor not found</Alert>
        </section>
      </>
    );
  }
  return (
    <>
      <SectionHeading name="Instructor Info" />
      <section className="container my-4">
        <InstructorDetails instructor={instructorById} />
      </section>
    </>
  );
};

export default InstructorInfo;
