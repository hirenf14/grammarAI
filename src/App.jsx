import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root";
import Loader from "./components/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: () => <>Test</>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
export default App;
