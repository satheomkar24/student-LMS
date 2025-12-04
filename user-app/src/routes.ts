import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
]);

export default routes;
