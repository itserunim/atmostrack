"use client";
import React from "react";

const StatusIndicator = ({ status }) => {
  const color = status === "online" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="neumorph flex items-center justify-center w-28 h-12 space-x-2">
      <span className={`w-3 h-3 rounded-full ${color}`}></span>
      <span className="font-semibold text-sm text-white/95 dark:text-gray-200">{status}</span>
    </div>
  );
};

export default StatusIndicator;
