import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { AuthGuard } from "@satheomkar24/common-types";
import Course from "./pages/course/Course";
import EditCourse from "./pages/course/EditCourse";
import AddCourse from "./pages/course/AddCourse";
import Instructor from "./pages/instructor/Instructor";
import AddInstructor from "./pages/instructor/AddInstructor";
import EditInstructor from "./pages/instructor/EditInstructor";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import InstructorInfo from "./pages/instructor/InstructorInfo";

const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

const NotFound = lazy(() =>
  import("@satheomkar24/common-types").then((module) => ({
    default: module.NotFound,
  })),
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "courses",
        children: [
          {
            index: true,
            Component: Course,
          },
          {
            path: "add",
            Component: AddCourse,
          },
          {
            path: "edit/:id",
            Component: EditCourse,
          },
          {
            path: "details/:id",
            element: <h4>Not Implemented</h4>,
          },
        ],
      },
      {
        path: "instructors",
        children: [
          {
            index: true,
            Component: Instructor,
          },
          {
            path: "add",
            Component: AddInstructor,
          },
          {
            path: "edit/:id",
            Component: EditInstructor,
          },
          {
            path: "details/:id",
            Component: InstructorInfo,
          },
        ],
      },
      {
        path: "students",
        Component: Student,
      },
      {
        path: "admins",
        Component: Admin,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "reset-password/:token",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default routes;
