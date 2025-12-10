"use client";
import React from "react";
import { WiStrongWind, WiWindy, WiCloudyWindy } from "react-icons/wi";

export default function WindCard({ speed = null, heading = null }) {
  if (speed === null || heading === null) {
    return (
      <div className="neumorph flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-white/95 uppercase mt-1">Wind</h2>
        <div className="text-7xl text-white/50">--</div>
        <div className="text-2xl font-bold text-white/50 mt-2">--</div>
        <div className="text-sm text-white/80 mt-6">Waiting for data...</div>
      </div>
    );
  }

  let deg360 = ((heading % 360) + 360) % 360;
  const quadrantIndex = Math.floor(deg360 / 90);
  let deg90 = deg360 % 90;
  const TOLERANCE = 5;

  let direction = "";
  switch (quadrantIndex) {
    case 0: direction = deg90 <= TOLERANCE ? "N" : "NE"; break;
    case 1: direction = deg90 <= TOLERANCE ? "E" : "SE"; break;
    case 2: direction = deg90 <= TOLERANCE ? "S" : "SW"; break;
    case 3: direction = deg90 <= TOLERANCE ? "W" : "NW"; break;
  }

  const mirrorMap = {
    "N": "S", "S": "N", "E": "W", "W": "E",
    "NE": "SW", "SW": "NE", "SE": "NW", "NW": "SE"
  };
  const mirroredDirection = mirrorMap[direction] || direction;
  let displayDeg = mirroredDirection.length === 2 ? 90 - deg90 : deg90;

  let Icon = WiWindy;
  let description = "";
  if (speed <= 10) { Icon = WiWindy; description = "Calm conditions"; }
  else if (speed <= 30) { Icon = WiCloudyWindy; description = "A gentle breeze"; }
  else { Icon = WiStrongWind; description = "Strong wind"; }

  return (
    <div className="neumorph flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold text-white/95 uppercase mt-1">Wind</h2>
      <div className="text-7xl text-white/95 transition-transform"><Icon /></div>
      <div className="text-2xl font-bold text-white/95 -mt-2">
        {displayDeg.toFixed(0)}° {mirroredDirection}
      </div>
      <div className="text-md text-white/80 mt-1">{speed.toFixed(1)} m/s</div>
      <p className="text-sm text-white/95 mt-2">{description}</p>
    </div>
  );
}
