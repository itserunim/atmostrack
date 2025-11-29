import React from "react";

const StatusIndicator = ({ status }) => {
  const color = status === "online" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="flex items-center space-x-2">
      <span className={`w-3 h-3 rounded-full ${color}`}></span>
      <span className="text-sm text-gray-700 dark:text-gray-200">{status}</span>
    </div>
  );
};

export default StatusIndicator;
