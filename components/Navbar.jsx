import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700 dark:text-gray-200">AtmosTrack</h1>
      <div className="flex items-center space-x-4">
        <a href="#dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Dashboard</a>
        <a href="#controls" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Controls</a>
        <a href="#settings" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;
