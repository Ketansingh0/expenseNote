import React, { useEffect, useState } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI } from "../utils/API";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
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
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (!email || !password) {
      toast.error("Email and Password are required.", toastOptions);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(loginAPI, { email, password });

      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      console.error("Login API error:", error);
      toast.error("Login failed. Please try again later.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 md:p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-2xl animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <AccountBalanceWalletIcon
            sx={{ fontSize: 60, color: "#93c5fd" }}
            className="mb-2 text-blue-300 animate-bounce-slow"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-50 tracking-tight">
            ExpenseNote
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mt-4">
            Login to your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
              onChange={handleChange}
              value={values.password}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
              required
            />
          </div>

          <div className="flex flex-col items-center space-y-4 mt-6">
            <Link
              to="#"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition duration-300 ease-in-out"
            >
              Forgot Password?
            </Link>

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
                  Signing In...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-gray-400 text-sm md:text-base">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition duration-300 ease-in-out"
              >
                Register Here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
