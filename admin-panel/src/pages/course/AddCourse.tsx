import type { ICoursePayload } from "@satheomkar24/common-types";
import CourseForm from "../../components/course/CourseForm";
import useCourseResolver from "../../resolvers/CourseResolver";

const initialValues: ICoursePayload = {
  name: "",
  image: "",
  summery: "",
  details: "",
  price: 0,
  level: "",
  category: "",
  instructor: "",
  faqs: [],
  lessons: [],
  publish: false,
};

const AddCourse = () => {
  const { createCourseMutation } = useCourseResolver();

  const submitHandler = async (values: ICoursePayload) => {
    createCourseMutation.mutate(values);
  };
  return <CourseForm initialValues={initialValues} onSubmit={submitHandler} />;
};

export default AddCourse;
