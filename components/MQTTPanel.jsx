import React from "react";

const MQTTPanel = ({ topics, lastUpdate, status }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-80">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">MQTT Panel</h2>
      <p className="text-sm text-gray-500">Status: {status ? "Connected" : "Disconnected"}</p>
      <p className="text-sm text-gray-500">Last Update: {lastUpdate}</p>
      <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default MQTTPanel;
