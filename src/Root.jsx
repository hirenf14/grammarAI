import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./components/Loader";

export default function Root() {
  return (
    <main className="bg-gray-50 font-sans">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
}
