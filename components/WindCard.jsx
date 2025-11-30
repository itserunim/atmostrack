"use client";
import React from "react";
import { WiStrongWind, WiWindy, WiCloudyWindy } from 'react-icons/wi';

const WindCard = ({ speed = 8, direction = 'SE' }) => {
  // determine wind category
  let category = 'calm';
  if (speed >= 0 && speed <= 19) category = 'calm';
  else if (speed > 19 && speed <= 38) category = 'breeze';
  else category = 'strong';

  // choose icon and description based on category
  let Icon = WiWindy;
  let iconSize = 'text-6xl';
  let description = 'The breeze makes you feel comfortable.';

  if (category === 'calm') {
    Icon = WiWindy;
    iconSize = 'text-8xl';
    description = 'Calm conditions — pleasant and still.';
  } else if (category === 'breeze') {
    Icon = WiCloudyWindy;
    iconSize = 'text-8xl';
    description = 'The breeze makes you feel comfortable.';
  } else {
    Icon = WiStrongWind;
    iconSize = 'text-6xl';
    description = 'Strong wind — secure loose objects and take care.';
  }

  return (
    <div className="neumorph p-6 flex flex-col items-center justify-center h-full w-full text-center">
      <h2 className="text-sm font-bold text-white/90 uppercase">Wind</h2>
      <div className={`${iconSize} text-white/95 my-2 transition-transform`}>
        <Icon />
      </div>
      <div className="text-4xl font-bold text-white/95">{speed} {direction}</div>
      <div className="text-sm text-white/80 mt-1">{speed} km/h</div>
      <p className="text-sm text-white/70 mt-3">{description}</p>
    </div>
  );
};

export default WindCard;
