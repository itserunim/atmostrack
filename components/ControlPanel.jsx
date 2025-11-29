import React from "react";

const ControlPanel = ({ controls, onToggle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-80">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Control Panel</h2>
      <div className="mt-2 space-y-2">
        {controls.map((control) => (
          <div key={control.id} className="flex justify-between items-center">
            <span>{control.name}</span>
            <button
              className={`px-3 py-1 rounded ${control.state ? "bg-green-500" : "bg-gray-400"} text-white`}
              onClick={() => onToggle(control.id)}
            >
              {control.state ? "ON" : "OFF"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
