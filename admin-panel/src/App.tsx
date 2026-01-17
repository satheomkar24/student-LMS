import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Spinner, SpinnerContextProvider } from "@satheomkar24/common-types";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <Toaster />
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
