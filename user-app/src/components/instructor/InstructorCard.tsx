import { type IInstructor } from "@satheomkar24/common-types";
import { FiAnchor, FiStar, FiUsers, FiVideo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

type Props = {
  instructor: IInstructor;
};
const InstructorCard = ({ instructor }: Props) => {
  return (
    <Link to={`/instructors/details/${instructor._id}`} className="h-100">
      <Card className="rounded-4 overflow-hidden h-100">
        <div className="ratio ratio-1x1 bg-warning">
          <img
            src={instructor.image}
            alt="image"
            className="image-fluid  object-fit-cover"
          />
        </div>
        <div className="p-2">
          <h4>{instructor.name}</h4>
          <div className=" pb-3 mb-2">
            <Row className="g-3">
              <Col sm={6}>
                <FiAnchor /> {instructor.profession}
              </Col>
              <Col sm={6}>
                <FiVideo /> {instructor.courseCount} Courses
              </Col>
              <Col sm={6}>
                <FiStar color="orange" /> {instructor.rating}
              </Col>
              <Col sm={6}>
                <FiUsers /> {instructor.totalStudents} Students
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default InstructorCard;
