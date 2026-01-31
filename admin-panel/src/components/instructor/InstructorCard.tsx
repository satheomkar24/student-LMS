import { CustomSwal, type IInstructor } from "@satheomkar24/common-types";
import {
  FiAnchor,
  FiEdit,
  FiStar,
  FiTrash,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import useInstructorResolver from "../../resolvers/InstructorResolver";

type Props = {
  instructor: IInstructor;
};
const InstructorCard = ({ instructor }: Props) => {
  const { deleteInstructorMutation } = useInstructorResolver();
  const deleteHandler = async () => {
    const result = await CustomSwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
    });
    if (result.isConfirmed) {
      deleteInstructorMutation.mutate(instructor._id);
    }
  };

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
          <div className="border-bottom pb-3 mb-2">
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
          <div className="text-end">
            <Link to={`/instructors/edit/${instructor._id}`}>
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
      </Card>
    </Link>
  );
};

export default InstructorCard;
