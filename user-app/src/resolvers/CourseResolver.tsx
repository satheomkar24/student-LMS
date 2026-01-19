import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { SpinnerContext, type ICourse } from "@satheomkar24/common-types";
import { useApiQuery } from "../services/queryService";
import { coursesService } from "../services/courseService";
import { setCourses } from "../store/courseSlice";

type Props = {
  courseId?: string;
};
const useCourseResolver = ({ courseId }: Props = {}) => {
  const dispatch = useAppDispatch();
  const { setIsLoading } = useContext(SpinnerContext);
  const { courses } = useAppSelector((state) => state.course);

  //  Fetch all
  const {
    data,
    isSuccess,
    isLoading: isCourseLoading,
  } = useApiQuery<ICourse[]>(["courses"], () => coursesService.getAll());

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCourses(data));
    }
  }, [isSuccess, data, dispatch]);

  //  Fetch by ID
  const { data: courseById, isLoading: isCourseByIdLoading } = useApiQuery<
    ICourse | undefined
  >(["course", courseId], () => coursesService.getById(courseId!), {
    enabled: !!courseId,
  });

  //  Set loading spinner based on mutation state
  useEffect(() => {
    setIsLoading(isCourseLoading);
  }, [isCourseLoading, setIsLoading]);

  return {
    courses,
    courseById,
    isCourseByIdLoading,
  };
};

export default useCourseResolver;
