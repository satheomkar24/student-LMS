import { Col, Row } from "reactstrap";
import InstructorCard from "../../components/instructor/InstructorCard";
import useInstructorResolver from "../../resolvers/InstructorResolver";
import SectionHeading from "../../reusables/SectionHeading";

const Instructor = () => {
  const { instructors } = useInstructorResolver();
  return (
    <>
      <SectionHeading name="Instructors" />
      <section className="container my-4">
        <Row className="g-3 ">
          {instructors.map((instructor, index) => (
            <Col md={6} lg={4} xxl={3} key={index}>
              <InstructorCard instructor={instructor} />
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
};

export default Instructor;
