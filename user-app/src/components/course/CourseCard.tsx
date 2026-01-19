import { type ICourse } from "@satheomkar24/common-types";
import { FiBarChart, FiVideo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

type Props = {
  course: ICourse;
};

const CourseCard = ({ course }: Props) => {
  return (
    <Link to={`/courses/details/${course._id}`} className="h-100">
      <Card className="rounded-4 overflow-hidden h-100">
        <div className="ratio ratio-16x9">
          <img
            src={course.image}
            alt="image"
            className="image-fluid  object-fit-cover"
          />
        </div>
        <div className="p-2">
          <h4>{course.name}</h4>
          <div className=" pb-3 mb-2">
            <Row className="g-3">
              <Col sm={6}>
                <FiVideo /> {course.category}
              </Col>
              <Col sm={6}>
                <FiBarChart /> {course.level}
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
