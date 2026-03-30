import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Bug } from "lucide-react"

export default function Signin() {
  const { signin, signinWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8">
        
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            {/* ✅ Lucide Bug icon */}
            <Bug className="h-8 w-8 text-green-500" />
            <h1 className="text-2xl font-bold">BugBounty</h1>
          </div>
        </div>

        {/* Welcome text */}
        <h2 className="text-center text-xl font-semibold">Welcome back</h2>
        <p className="text-center text-gray-400 mb-6">
          Sign in to your account to continue
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="text-right mt-1">
              <Link to="/forgot-password" className="text-green-500 text-sm hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 font-semibold transition"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-700" />
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <button
            type="button"
            onClick={signinWithGoogle}
            className="w-full p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            Continue with Google
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
