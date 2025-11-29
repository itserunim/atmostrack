import React from "react";

const TemperatureCard = ({ current, min, max }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-60">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Temperature</h2>
      <p className="text-3xl font-bold text-red-500">{current}°C</p>
      <div className="flex justify-between text-sm mt-2 text-gray-500">
        <span>Min: {min}°C</span>
        <span>Max: {max}°C</span>
      </div>
    </div>
  );
};

export default TemperatureCard;
