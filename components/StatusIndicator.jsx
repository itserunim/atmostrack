"use client";
import React from "react";

export default function StatusIndicator({ status }) {
  const color = status === "Online" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="neumorph flex items-center justify-center w-30 h-12 space-x-2">
      <span className={`w-3 h-3 rounded-full ${color}`}></span>
      <span className="font-semibold text-sm text-white/95 dark:text-gray-200">{status}</span>
    </div>
  );
}
