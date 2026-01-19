import { useContext, useEffect } from "react";
import {
  showError,
  SpinnerContext,
  type IStudent,
  type IStudentPayload,
} from "@satheomkar24/common-types";
import { useApiMutation, useApiQuery } from "../services/queryService";
import { studentsService } from "../services/studentService";
import toast from "react-hot-toast";

type Props = {
  studentId?: string;
};
const useStudentResolver = ({ studentId }: Props = {}) => {
  const { setIsLoading } = useContext(SpinnerContext);

  //  Fetch by ID
  const { data: studentById } = useApiQuery<IStudent | undefined>(
    ["student", studentId],
    () => studentsService.getById(studentId!),
    {
      enabled: !!studentId,
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
      updateStudentMutation.isPending || deleteStudentMutation.isPending,
    );
  }, [
    updateStudentMutation.isPending,
    deleteStudentMutation.isPending,
    setIsLoading,
  ]);

  return {
    studentById,
    updateStudentMutation,
    deleteStudentMutation,
  };
};

export default useStudentResolver;
