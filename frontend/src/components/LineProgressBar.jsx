import React, { useEffect, useState } from "react";

const colorMap = {
  "blue-500": "bg-blue-500",
  "green-500": "bg-green-500",
  "red-500": "bg-red-500",
  "yellow-500": "bg-yellow-500",
  "purple-500": "bg-purple-500",
  "pink-500": "bg-pink-500",
  "indigo-500": "bg-indigo-500",
};

const LineProgressBar = ({ label, percentage, lineColor = "blue-500" }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full mb-4 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 text-sm md:text-base font-medium">
          {label}
        </span>
        <span className="text-gray-200 text-sm md:text-base font-semibold">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            colorMap[lineColor] || "bg-blue-500"
          }`}
          role="progressbar"
          style={{ width: `${animatedPercentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default LineProgressBar;
