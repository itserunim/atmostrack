"use client";
import React, { useState, useEffect, useRef } from "react";

const MQTTPanel = ({ topics = ['weather/temp','weather/humidity','weather/wind'], lastUpdate = '3 sec ago', status = true }) => {
  return (
    <div className="neumorph p-6 flex flex-col items-center justify-center w-full">
      <h3 className="text-sm uppercase text-white/90 mb-2">MQTT Panel</h3>
      <div className="text-xs text-white/70">Last Update</div>
      <div className="text-sm text-white/90 mb-4">{lastUpdate}</div>
      <div className="px-6 py-2 rounded-full bg-green-400 text-white text-xl font-semibold mb-4 flex items-center justify-center w-44">
        <span className="mr-3">{status ? 'Connected' : 'Disconnected'}</span>
        <span className={`w-5 h-5 rounded-full bg-white ${status ? '' : 'opacity-40'}`} />
      </div>
      <div className="text-sm text-white/70">Topics</div>
      <div className="text-sm text-white/60 mt-2 text-center">
        {topics.join('  | ')}
      </div>
    </div>
  );
};

export default MQTTPanel;
