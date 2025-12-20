import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Spinner, SpinnerContextProvider } from "@satheomkar24/common-types";
const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <Toaster
      // position="top-center"
      // reverseOrder={false}
      // gutter={8}
      // containerClassName=""
      // containerStyle={{}}
      // toasterId="default"
      // toastOptions={{
      //   // Define default options
      //   className: "",
      //   duration: 2000,
      //   style: {
      //     background: "#363636",
      //     color: "#fff",
      //   },

      //   // Default options for specific types
      //   success: {
      //     duration: 2000,
      //     iconTheme: {
      //       primary: "green",
      //       secondary: "black",
      //     },
      //   },
      // }}
      />
      <QueryClientProvider client={queryClient}>
        <SpinnerContextProvider>
          <RouterProvider router={routes} />
          <Spinner />
        </SpinnerContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
