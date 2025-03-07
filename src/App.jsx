import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./Root";
import Loader from "./components/Loader";
import ErrorView from "./components/ErrorView";
import { lazy } from "react";
import { useAuthStore } from "./store/auth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorView />,
    children: [
      {
        path: "login",
        Component: lazy(() => import("./pages/Login")),
      },
      {
        path: "logout",
        loader: async () => {
          await useAuthStore.getState().logout();
          return redirect("/login");
        },
      },
      {
        index: true,
        loader: async () => {
          const token = useAuthStore.getState().token;
          if (!token) {
            return redirect("/login");
          }
        },
        Component: lazy(() => import("./pages/Home")),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
