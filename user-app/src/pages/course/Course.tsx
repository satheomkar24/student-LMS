import { Col, Row } from "reactstrap";
import CourseCard from "../../components/course/CourseCard";
import useCourseResolver from "../../resolvers/CourseResolver";
import SectionHeading from "../../reusables/SectionHeading";

const Course = () => {
  const { courses } = useCourseResolver();
  return (
    <>
      <SectionHeading name="Courses" />
      <section className="container my-4">
        <Row className="g-3 ">
          {courses.map((course, index) => (
            <Col md={6} lg={4} xxl={3} key={index}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
};

export default Course;
