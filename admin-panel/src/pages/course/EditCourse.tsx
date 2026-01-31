import { useParams } from "react-router-dom";
import CourseForm from "../../components/course/CourseForm";
import useCourseResolver from "../../resolvers/CourseResolver";
import { Alert } from "reactstrap";
import type { ICoursePayload } from "@satheomkar24/common-types";

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const { courseById, isCourseByIdLoading, updateCourseMutation } =
    useCourseResolver({
      courseId: id,
    });

  const submitHandler = async (values: ICoursePayload) => {
    updateCourseMutation.mutate({ id: id!, data: values });
  };

  if (isCourseByIdLoading) return null;

  if (!courseById) {
    return <Alert variant="danger">Course not found</Alert>;
  }

  return (
    <CourseForm
      initialValues={{
        ...courseById,
        instructor: courseById.instructor?._id || "",
      }}
      onSubmit={submitHandler}
    />
  );
};

export default EditCourse;
