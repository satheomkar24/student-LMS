import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import InstructorCard from "../../components/instructor/InstructorCard";
import useInstructorResolver from "../../resolvers/InstructorResolver";

const Instructor = () => {
  const { instructors } = useInstructorResolver();
  return (
    <>
      <div className="text-end">
        <Link to="/instructors/add" className="btn btn-primary mb-3 ">
          Add New Instructor
        </Link>
      </div>
      <Row className="g-3">
        {instructors.map((instructor, index) => (
          <Col md={6} lg={4} xxl={3} key={index}>
            <InstructorCard instructor={instructor} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Instructor;
