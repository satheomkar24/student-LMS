// import { useContext, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks/redux";
// import { useNavigate } from "react-router-dom";
// import { SpinnerContext } from "@satheomkar24/common-types";

// interface Props {
//   userId?: string;
// }

// const useUserResolver = ({ userId }: Props = {}) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { setIsLoading } = useContext(SpinnerContext);

//   const { user } = useAppSelector((state) => state.auth);

//   // ✅ Fetch all
//   const { data, isSuccess, isLoading, error, refetch } = useApiQuery<IUser[]>(
//     ["users"],
//     userService.fetchAll
//   );

//   useEffect(() => {
//     if (isSuccess && data) {
//       dispatch(setUsers(data));
//     }
//   }, [isSuccess, data, dispatch]);

//   // ✅ Fetch  by ID (on demand)
//   const {
//     data: userById,
//     isLoading: isUserLoading,
//     error: userError,
//   } = useApiQuery<IUser | undefined>(
//     ["users", userId],
//     () => userService.getById(userId!),
//     {
//       enabled: !!userId,
//     }
//   );

//   // ✅ Mutation: create new
//   const createUserMutation = useApiMutation(
//     (data: Partial<IUser>) => userService.add(data),
//     {
//       onSuccess: (data: IUser) => {
//         invalidateByKey(["users"]);
//         refetch();
//         toast.success("User added successfully");
//         navigate(`/admin/users/edit/${data._id}`);
//       },
//       onError: () => {
//         toast.error("Failed to add user.");
//       },
//     }
//   );

//   // ✅ Mutation: update values
//   const updateUserMutation = useApiMutation(
//     ({ id, data }: { id: string; data: Partial<IUser> }) =>
//       userService.update(id, data),
//     {
//       onSuccess: () => {
//         invalidateByKey(["users"]);
//         refetch();
//         setTimeout(() => {
//           navigate("/admin/users");
//           toast.success("User updated successfully");
//         }, 200);
//       },
//       onError: () => {
//         toast.error("Failed to update user");
//       },
//     }
//   );

//   // ✅ Mutation: delete values
//   const deleteUserMutation = useApiMutation(
//     (id: string) => userService.delete(id),
//     {
//       invalidateByKey: [["users"]],
//       onSuccess: () => {
//         refetch();
//         toast.success("User deleted successfully");
//       },
//       onError: () => {
//         toast.error("Failed to delete user");
//       },
//     }
//   );

//   // ✅ Set loading spinner based on mutation state
//   useEffect(() => {
//     setIsLoading(
//       isUserLoading ||
//         createUserMutation.isPending ||
//         updateUserMutation.isPending ||
//         deleteUserMutation.isPending
//     );
//   }, [
//     isUserLoading,
//     createUserMutation.isPending,
//     updateUserMutation.isPending,
//     deleteUserMutation.isPending,
//     setIsLoading,
//   ]);

//   // ============== normal state functions=========
//   const getUserName = (username: string) => {
//     username = username || "";
//     const name = userNameMap[username];
//     return name ? name : username;
//   };

//   return {
//     users,
//     isLoading,
//     error,
//     userById,
//     isUserLoading,
//     userError,
//     createUserMutation,
//     updateUserMutation,
//     deleteUserMutation,
//     getUserName,
//   };
// };

// export default useUserResolver;
