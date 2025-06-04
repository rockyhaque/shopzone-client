import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Lock, User, Eye, EyeOff, LogIn } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from "../validation/userValidation";
import type { IUserLogin } from "../types/IUser";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: zodResolver(loginValidation),
  });

  const onSubmit = async (data: IUserLogin) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      const token = result.token;

      const expires = data.rememberMe ? 7 : 0.0208; // 30 minutes = 30/1440 ≈ 0.0208

      Cookies.set("token", token, {
        domain:
          window.location.hostname === "localhost"
            ? ".localhost"
            : ".shopzone-teal.vercel.app",
        // domain: ".shopzone.local",
        expires,
        secure: process.env.NODE_ENV === "production",
        // sameSite: "lax",
        path: "/",
        // httpOnly: true
      });

      toast.success("Login successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-gray-600">Login to your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                {...register("username")}
                id="username"
                placeholder="Enter your username"
                className={`w-full pl-10 h-11 border rounded-md focus:outline-none ${
                  errors.username
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-gray-200 focus:border-sky-500"
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-sm text-rose-500">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className={`w-full pl-10 pr-10 h-11 border rounded-md focus:outline-none ${
                  errors.password
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-gray-200 focus:border-sky-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-rose-500">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("rememberMe")}
              id="rememberMe"
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember Me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-medium rounded-md flex items-center justify-center hover:from-sky-700 hover:to-teal-700 transition-all"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              <>
                Login <LogIn className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>
        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-sky-600 hover:text-sky-500"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
