import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth";

export default function Login() {
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-center">
      <h1 className="text-3xl">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96 max-w-full"
      >
        <div>
          <label className="text-gray-700">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.email && (
            <p className="text-sm text-red-600">Email is required</p>
          )}
        </div>
        <div>
          <label className="text-gray-700">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full rounded border border-gray-300 p-2"
          />
          {errors.password && (
            <p className="text-sm text-red-600">Password is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-400 p-2 text-white"
        >
          {loading ? "Logging..." : "Login"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
