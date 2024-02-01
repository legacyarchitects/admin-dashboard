// import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./utils/ErrorPage.jsx";
import { Root, Finalized, Finalized2} from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    staleTime: 19000000,
  },
});

// const defaultOptions = queryClient.getDefaultOptions()

// console.log("defaultOptions", defaultOptions)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "finalize",
        // element: <Finalized />,
        element: <Finalized2 />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
