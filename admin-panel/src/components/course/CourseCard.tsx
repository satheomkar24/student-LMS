import { CustomSwal, type ICourse } from "@satheomkar24/common-types";
import { FiBarChart, FiEdit, FiTrash, FiVideo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import useCourseResolver from "../../resolvers/CourseResolver";

type Props = {
  course: ICourse;
};

const CourseCard = ({ course }: Props) => {
  const { deleteCourseMutation } = useCourseResolver();
  const deleteHandler = async () => {
    const result = await CustomSwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
    });
    if (result.isConfirmed) {
      deleteCourseMutation.mutate(course._id);
    }
  };

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
          <div className="border-bottom pb-3 mb-2">
            <Row className="g-3">
              <Col sm={6}>
                <FiVideo /> {course.category}
              </Col>
              <Col sm={6}>
                <FiBarChart /> {course.level}
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs-4 fw-bolder text-warning">
              ₹ {course.price}
            </span>
            <div>
              <Link to={`/courses/edit/${course._id}`}>
                <FiEdit className="text-success me-3" />
              </Link>
              <FiTrash
                className="text-danger"
                onClick={(e) => {
                  e.preventDefault(); // stops Link navigation
                  e.stopPropagation(); // stops bubbling
                  deleteHandler();
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
