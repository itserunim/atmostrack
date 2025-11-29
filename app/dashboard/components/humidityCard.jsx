import React from "react";

const HumidityCard = ({ humidity }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-60">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Humidity</h2>
      <p className="text-3xl font-bold text-blue-500">{humidity}%</p>
      <p className="text-sm text-gray-500 mt-1">
        {humidity > 70 ? "Wetter environment." : "Comfortable environment."}
      </p>
    </div>
  );
};

export default HumidityCard;
