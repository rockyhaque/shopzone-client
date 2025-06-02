import { Store, User, Lock, ArrowRight, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { IUser } from "../types/IUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "../validation/userValidation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(userValidation),
  });

  const onSubmit = async (data: IUser) => {
    setLoading(true);
    const payload = {
      username: data.username,
      password: data.password,
      shops: data.shops.split(",").map((shop: string) => shop.trim()),
      role: "user",
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      await res.json();

      if (res.ok) {
        toast.success("Account created successfully!");
        reset();

        // Redirect to login page
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo + Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-sky-600 to-teal-600 rounded-full mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join us and start managing your shops today
          </p>
        </div>

        {/* Card container */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Register</h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 block"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  {...register("username")}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className={`w-full pl-10 h-11 border rounded-md focus:outline-none ${
                    errors.username
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100"
                      : "border-gray-200 focus:border-sky-500 focus:ring-sky-100"
                  }`}
                  required
                />
              </div>
              {errors.username && (
                <p className="text-sm text-rose-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Shop name */}
            <div className="space-y-2">
              <label
                htmlFor="shops"
                className="text-sm font-medium text-gray-700 block"
              >
                Shops
              </label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  {...register("shops")}
                  type="text"
                  id="shops"
                  name="shops"
                  placeholder="Enter shop names, separated by commas"
                  className={`w-full pl-10 h-11 border rounded-md focus:outline-none ${
                    errors.shops
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100"
                      : "border-gray-200 focus:border-sky-500 focus:ring-sky-100"
                  }`}
                  required
                />
              </div>
              {errors.shops && (
                <p className="text-sm text-rose-500">{errors.shops.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  className={`w-full pl-10 pr-10 h-11 border rounded-md focus:outline-none ${
                    errors.password
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100"
                      : "border-gray-200 focus:border-sky-500 focus:ring-sky-100"
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
                <p className="text-sm text-rose-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-medium rounded-md hover:from-sky-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
            >
              {loading ? (
                <>
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-sky-600 hover:text-sky-500">
              Sign in here
            </a>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By creating an account, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
