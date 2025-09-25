import React, { useEffect, useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../utils/API";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { name, email, password } = values;
    if (!name.trim()) {
      toast.error("Name is required.", toastOptions);
      return false;
    }
    if (!email) {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error(
        "Password should be at least 6 characters long.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { name, email, password } = values;

      setLoading(true);
      try {
        const { data } = await axios.post(registerAPI, {
          name,
          email,
          password,
        });

        if (data.success === true) {
          delete data.user.password;
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success(data.message, toastOptions);
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          toast.error(data.message, toastOptions);
        }
      } catch (error) {
        console.error("Registration API error:", error);
        toast.error(
          "Registration failed. Please try again later.",
          toastOptions
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md mx-auto p-6 md:p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-2xl animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <AccountBalanceWalletIcon
            sx={{ fontSize: 60, color: "#93c5fd" }}
            className="mb-2 text-blue-300 animate-bounce-slow"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-50 tracking-tight">
            ExpenseNote
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mt-4">
            Create an Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              value={values.name}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={values.email}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              value={values.password}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>

          <div className="flex flex-col items-center space-y-4 mt-6">
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-md font-bold text-lg text-white
                ${
                  loading
                    ? "bg-blue-700 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                transition duration-300 ease-in-out transform hover:scale-105`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-gray-400 text-sm md:text-base">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition duration-300 ease-in-out"
              >
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
