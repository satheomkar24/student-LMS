import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { SpinnerContext, type IInstructor } from "@satheomkar24/common-types";
import { useApiQuery } from "../services/queryService";
import { instructorsService } from "../services/instructorService";
import { setInstructors } from "../store/instructorSlice";

type Props = {
  instructorId?: string;
};
const useInstructorResolver = ({ instructorId }: Props = {}) => {
  const dispatch = useAppDispatch();
  const { setIsLoading } = useContext(SpinnerContext);
  const { instructors } = useAppSelector((state) => state.instructor);

  //  Fetch all
  const {
    data,
    isSuccess,
    isLoading: isInstructorLoading,
  } = useApiQuery<IInstructor[]>(["instructors"], () =>
    instructorsService.getAll(),
  );

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setInstructors(data));
    }
  }, [isSuccess, data, dispatch]);

  //  Fetch by ID
  const { data: instructorById, isLoading: isInstructorByIdLoading } =
    useApiQuery<IInstructor | undefined>(
      ["instructor", instructorId],
      () => instructorsService.getById(instructorId!),
      {
        enabled: !!instructorId,
      },
    );

  //  Set loading spinner based on mutation state
  useEffect(() => {
    setIsLoading(isInstructorLoading);
  }, [isInstructorLoading, setIsLoading]);

  return {
    instructors,
    instructorById,
    isInstructorByIdLoading,
  };
};

export default useInstructorResolver;
