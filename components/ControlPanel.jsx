"use client";
import React, { useState } from "react";
import { GiLightBulb } from 'react-icons/gi';

const ControlPanel = ({ initial = true }) => {
  const [on, setOn] = useState(initial);

  return (
    <div className="neumorph p-8 flex flex-col items-center justify-center w-full h-full text-center">
      <h3 className="text-sm uppercase text-white/90 mb-4">Control Panel</h3>
      <div className="text-6xl text-yellow-300 mb-4"><GiLightBulb /></div>
      <div className="text-sm text-white/80 mb-6">LED</div>
      <div className="flex items-center space-x-3">
        <div className={`px-6 py-2 rounded-full text-white font-semibold ${on ? 'bg-green-400' : 'bg-gray-400'}`}>{on ? 'ON' : 'OFF'}</div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={on} onChange={() => setOn(!on)} />
          <div className="w-12 h-6 bg-white/90 rounded-full peer-checked:bg-green-400 peer-focus:ring-2 peer-focus:ring-green-300 transition-colors" />
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform peer-checked:translate-x-6 transition-transform shadow" />
        </label>
      </div>
    </div>
  );
};

export default ControlPanel;
