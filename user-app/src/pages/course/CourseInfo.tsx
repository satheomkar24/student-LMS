import { useParams } from "react-router-dom";
import CourseDetails from "../../components/course/CourseDetails";
import useCourseResolver from "../../resolvers/CourseResolver";
import { Alert } from "reactstrap";
import SectionHeading from "../../reusables/SectionHeading";

const CourseInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { courseById, isCourseByIdLoading } = useCourseResolver({
    courseId: id,
  });

  if (isCourseByIdLoading) return null;

  if (!courseById) {
    return (
      <>
        <SectionHeading name="Course Info" />
        <section className="container my-4">
          <Alert variant="danger">Course not found</Alert>
        </section>
      </>
    );
  }
  return (
    <>
      <SectionHeading name="Course Info" />
      <section className="container my-4">
        <CourseDetails course={courseById} />
      </section>
    </>
  );
};

export default CourseInfo;
