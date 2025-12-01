"use client";
import React, { useState } from "react";
import { PiLightbulbFilamentFill } from "react-icons/pi";

const ControlPanel = ({ initial = true }) => {
  const [on, setOn] = useState(initial);

  return (
    <div className="neumorph flex flex-col items-center justify-center w-full h-full text-center">
      <h3 className="font-bold text-xl uppercase tracking-wide text-white/95 mb-4">Control Panel</h3>
      <div className={`text-9xl mb-4 transition-colors duration-200 ${on ? 'text-yellow-300' : 'text-gray-400'}`}>
        <PiLightbulbFilamentFill />
      </div>
      <div className="text-m text-white/95 mb-4">LED</div>
      <div className="flex flex-col items-center space-y-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={on} onChange={() => setOn(!on)} />
          <div className={`w-20 h-8 bg-white/80 rounded-full peer-checked:bg-green-400 peer-focus:ring-2 peer-focus:ring-green-300 transition-colors px-5 py-1 rounded-full text-center text-white font-semibold ${on ? 'bg-green-400' : 'bg-gray-400'}`}>{on ? 'ON' : 'OFF'}</div>
          <span className="absolute left-1 top-2 w-4 h-4 bg-white rounded-full transform peer-checked:translate-x-14 transition-transform shadow" />
        </label>
      </div>
    </div>
  );
};

export default ControlPanel;
