import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  showError,
  SpinnerContext,
  type IAdmin,
  type IAdminPayload,
} from "@satheomkar24/common-types";
import { useApiMutation, useApiQuery } from "../services/queryService";
import { adminsService } from "../services/adminService";
import { setAdmins } from "../store/adminSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  adminId?: string;
};
const useAdminResolver = ({ adminId }: Props = {}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setIsLoading } = useContext(SpinnerContext);
  const { admins } = useAppSelector((state) => state.admin);

  //  Fetch all
  const {
    data,
    isSuccess,
    isLoading: isAdminLoading,
  } = useApiQuery<IAdmin[]>(["admins"], () => adminsService.getAll());

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAdmins(data));
    }
  }, [isSuccess, data, dispatch]);

  //  Fetch by ID
  const { data: adminById } = useApiQuery<IAdmin | undefined>(
    ["admin", adminId],
    () => adminsService.getById(adminId!),
    {
      enabled: !!adminId,
    },
  );

  // Mutation: create new
  const createAdminMutation = useApiMutation(
    (data: IAdminPayload) => adminsService.create(data),
    {
      onSuccess: () => {
        toast.success("Admin added successfully");
        navigate(`/admins`);
      },
      onError: (error) => {
        showError(error, "Failed to add Admin.");
      },
      invalidateKeys: [["admins"]],
    },
  );

  //  Mutation: update values
  const updateAdminMutation = useApiMutation(
    ({ id, data }: { id: string; data: IAdminPayload }) =>
      adminsService.update(id, data),
    {
      onSuccess: () => {
        toast.success("Admin updated successfully");
      },
      onError: (error) => {
        showError(error, "Failed to update admin");
      },
      invalidateKeys: [["admins"]],
    },
  );

  //  Mutation: delete values
  const deleteAdminMutation = useApiMutation(
    (id: string) => adminsService.delete(id),
    {
      onSuccess: () => {
        toast.success("Admin deleted successfully");
      },
      onError: (error) => {
        showError(error, "Failed to delete admin");
      },
      invalidateKeys: [["admins"]],
    },
  );

  //  Set loading spinner based on mutation state
  useEffect(() => {
    setIsLoading(
      isAdminLoading ||
        createAdminMutation.isPending ||
        updateAdminMutation.isPending ||
        deleteAdminMutation.isPending,
    );
  }, [
    isAdminLoading,
    createAdminMutation.isPending,
    updateAdminMutation.isPending,
    deleteAdminMutation.isPending,
    setIsLoading,
  ]);

  return {
    admins,
    adminById,
    createAdminMutation,
    updateAdminMutation,
    deleteAdminMutation,
  };
};

export default useAdminResolver;
