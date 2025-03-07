import { useRouteError } from "react-router-dom";

export default function ErrorView() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <h3 className="text-2xl">{error.statusText || error.message}</h3>
    </div>
  );
}
