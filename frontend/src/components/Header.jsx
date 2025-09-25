import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLoginLogout = () => {
    if (user) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-[80px]">
      <nav className="p-4 bg-gray-900 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-blue-400 hover:text-blue-300 transition duration-300"
          >
            ExpenseNote
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`md:flex md:items-center md:space-x-4 ${
              isMenuOpen
                ? "block absolute top-full left-0 w-full bg-gray-800 py-4 shadow-md md:relative md:bg-transparent md:shadow-none"
                : "hidden"
            }`}
          >
            <nav className="flex flex-col md:flex-row md:space-x-4 text-center md:text-left">
              <button
                onClick={handleLoginLogout}
                className="mt-4 md:mt-0 px-6 py-2 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
              >
                {user ? "Logout" : "Login"}
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
