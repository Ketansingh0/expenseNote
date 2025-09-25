import React, { useEffect, useState } from "react";

const CircularProgressBar = ({ percentage, color = "#3B82F6" }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetValue = ((100 - percentage) / 100) * circumference;

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-700"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          strokeDasharray={circumference}
          strokeDashoffset={isAnimating ? strokeDashoffsetValue : circumference}
          style={{
            transition: "stroke-dashoffset 1s ease-out",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      <div className="absolute text-lg font-semibold text-gray-100">
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
