import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  showError,
  SpinnerContext,
  type IStudent,
  type IStudentPayload,
} from "@satheomkar24/common-types";
import { useApiMutation, useApiQuery } from "../services/queryService";
import { studentsService } from "../services/studentService";
import { setStudents } from "../store/studentSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  studentId?: string;
};
const useStudentResolver = ({ studentId }: Props = {}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setIsLoading } = useContext(SpinnerContext);
  const { students } = useAppSelector((state) => state.student);

  //  Fetch all
  const {
    data,
    isSuccess,
    isLoading: isStudentLoading,
  } = useApiQuery<IStudent[]>(["students"], () => studentsService.getAll());

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setStudents(data));
    }
  }, [isSuccess, data, dispatch]);

  //  Fetch by ID
  const { data: studentById } = useApiQuery<IStudent | undefined>(
    ["student", studentId],
    () => studentsService.getById(studentId!),
    {
      enabled: !!studentId,
    },
  );

  // Mutation: create new
  const createStudentMutation = useApiMutation(
    (data: IStudentPayload) => studentsService.create(data),
    {
      onSuccess: () => {
        toast.success("Student added successfully");
        navigate(`/students`);
      },
      onError: (error) => {
        showError(error, "Failed to add Student.");
      },
      invalidateKeys: [["students"]],
    },
  );

  //  Mutation: update values
  const updateStudentMutation = useApiMutation(
    ({ id, data }: { id: string; data: IStudentPayload }) =>
      studentsService.update(id, data),
    {
      onSuccess: () => {
        toast.success("Student updated successfully");
      },
      onError: (error) => {
        showError(error, "Failed to update student");
      },
      invalidateKeys: [["students"]],
    },
  );

  //  Mutation: delete values
  const deleteStudentMutation = useApiMutation(
    (id: string) => studentsService.delete(id),
    {
      onSuccess: () => {
        toast.success("Student deleted successfully");
      },
      onError: (error) => {
        showError(error, "Failed to delete student");
      },
      invalidateKeys: [["students"]],
    },
  );

  //  Set loading spinner based on mutation state
  useEffect(() => {
    setIsLoading(
      isStudentLoading ||
        createStudentMutation.isPending ||
        updateStudentMutation.isPending ||
        deleteStudentMutation.isPending,
    );
  }, [
    isStudentLoading,
    createStudentMutation.isPending,
    updateStudentMutation.isPending,
    deleteStudentMutation.isPending,
    setIsLoading,
  ]);

  return {
    students,
    studentById,
    createStudentMutation,
    updateStudentMutation,
    deleteStudentMutation,
  };
};

export default useStudentResolver;
