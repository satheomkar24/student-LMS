import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  showError,
  SpinnerContext,
  type IInstructor,
  type IInstructorPayload,
} from "@satheomkar24/common-types";
import { useApiMutation, useApiQuery } from "../services/queryService";
import { instructorsService } from "../services/instructorService";
import { setInstructors } from "../store/instructorSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  instructorId?: string;
};
const useInstructorResolver = ({ instructorId }: Props = {}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  // Mutation: create new
  const createInstructorMutation = useApiMutation(
    (data: IInstructorPayload) => instructorsService.create(data),
    {
      onSuccess: () => {
        toast.success("Instructor added successfully");
        navigate(`/instructors`);
      },
      onError: (error) => {
        showError(error, "Failed to add Instructor.");
      },
      invalidateKeys: [["instructors"]],
    },
  );

  //  Mutation: update values
  const updateInstructorMutation = useApiMutation(
    ({ id, data }: { id: string; data: IInstructorPayload }) =>
      instructorsService.update(id, data),
    {
      onSuccess: () => {
        toast.success("Instructor updated successfully");
      },
      onError: (error) => {
        showError(error, "Failed to update instructor");
      },
      invalidateKeys: [["instructors"]],
    },
  );

  //  Mutation: delete values
  const deleteInstructorMutation = useApiMutation(
    (id: string) => instructorsService.delete(id),
    {
      onSuccess: () => {
        toast.success("Instructor deleted successfully");
      },
      onError: (error) => {
        showError(error, "Failed to delete instructor");
      },
      invalidateKeys: [["instructors"]],
    },
  );

  //  Set loading spinner based on mutation state
  useEffect(() => {
    setIsLoading(
      isInstructorLoading ||
        createInstructorMutation.isPending ||
        updateInstructorMutation.isPending ||
        deleteInstructorMutation.isPending,
    );
  }, [
    isInstructorLoading,
    createInstructorMutation.isPending,
    updateInstructorMutation.isPending,
    deleteInstructorMutation.isPending,
    setIsLoading,
  ]);

  return {
    instructors,
    instructorById,
    isInstructorByIdLoading,
    createInstructorMutation,
    updateInstructorMutation,
    deleteInstructorMutation,
  };
};

export default useInstructorResolver;
