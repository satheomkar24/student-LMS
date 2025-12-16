import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

const NotFound = lazy(() =>
  import("@satheomkar24/common-types").then((module) => ({
    default: module.NotFound,
  }))
);

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
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
        path: "contact",
        element: <div>contact page</div>,
      },
      {
        path: "about",
        element: <div>about page</div>,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default routes;
