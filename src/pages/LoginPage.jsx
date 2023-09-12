import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../store/AuthProvider";

export default function LoginPage() {
  const ctx = useAuth();
  const isLoggedIn = ctx.isLoggedIn;

  if (isLoggedIn) {
    return <Navigate to="/shops" />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-md shadow-md mt-5 text-white">
        <h2 className="text-3xl mb-4 text-center">Login Page</h2>
        <p className="text-center">To use our website, you must log in.</p>
        <LoginForm />

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
