import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-4 text-center">
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} AtmosTrack. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
