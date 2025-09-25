import React from "react";
import CircularProgressBar from "../../components/CircularProgressBar";

const DashboardCard = ({
  title,
  value,
  description,
  percentage,
  progressBarColor = "blue-500",
  icon: IconComponent,
}) => {
  const showProgressBar = percentage !== undefined && percentage !== null;

  return (
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mb-6 px-3 animate-fade-in-up">
      {" "}
      <div className="bg-gray-800 rounded-xl shadow-xl p-6 h-full flex flex-col justify-between transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-700">
        {" "}
        <div className="flex items-center justify-between pb-4 border-b border-gray-700 mb-4">
          <h3 className="text-xl font-bold text-gray-50">{title}</h3>
          {IconComponent && (
            <IconComponent className="text-blue-400 text-3xl" />
          )}
        </div>
        <div className="flex-grow">
          {" "}
          {value && (
            <p className="text-3xl font-extrabold text-blue-300 mb-2">
              {typeof value === "number" ? `$${value.toFixed(2)}` : value}{" "}
            </p>
          )}
          {description && (
            <p className="text-gray-300 text-sm mb-4">{description}</p>
          )}
        </div>
        {showProgressBar && (
          <div className="flex justify-center mt-4">
            <CircularProgressBar
              percentage={percentage}
              color={progressBarColor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
