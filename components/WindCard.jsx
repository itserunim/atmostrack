import React from "react";

const WindCard = ({ speed, direction }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-60">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Wind</h2>
      <p className="text-3xl font-bold text-green-500">{speed} km/h</p>
      <p className="text-sm text-gray-500 mt-1">Direction: {direction}</p>
    </div>
  );
};

export default WindCard;
