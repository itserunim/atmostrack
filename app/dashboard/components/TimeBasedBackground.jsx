import React, { useEffect, useState } from "react";

const TimeBasedBackground = ({ children }) => {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);
  }, []);

  return (
    <div className={`${isDay ? "bg-yellow-50" : "bg-gray-900"} min-h-screen transition-colors duration-500`}>
      {children}
    </div>
  );
};

export default TimeBasedBackground;
