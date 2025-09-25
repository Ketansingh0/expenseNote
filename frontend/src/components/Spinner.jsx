import React from "react";
import logo from "../assets/loader.gif";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 z-20">
      {" "}
      <img
        src={logo}
        alt="Loading..."
        className="mt-5 w-64 h-64 md:w-80 md:h-80 object-contain animate-pulse"
        animation
      />
    </div>
  );
};

export default Spinner;
