"use client";
import React, { useState, useEffect } from "react";
import { GiLightBulb } from "react-icons/gi";
import mqtt from "mqtt";

const MQTT_SERVER = "wss://broker.hivemq.com:8884/mqtt";
const MQTT_LED_TOPIC = "esp32/led";

export default function ControlPanel({ initial = true }) {
  const [on, setOn] = useState(initial);
  const [client, setClient] = useState(null);

  // Connect to MQTT broker over WebSocket
  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_SERVER, {
      clientId: "webclient-" + Math.random().toString(16).substring(2, 10),
    });

    mqttClient.on("connect", () => {
      console.log("Web: Connected to MQTT Broker");
    });

    setClient(mqttClient);

    return () => mqttClient.end();
  }, []);

  // Toggle LED + publish MQTT message
  const toggle = () => {
    const newState = !on;
    setOn(newState);

    if (client) {
      client.publish(MQTT_LED_TOPIC, newState ? "ON" : "OFF");
      console.log("Web → MQTT:", newState ? "ON" : "OFF");
    }
  };

  return (
    <div className="neumorph p-10 flex flex-col items-center justify-center w-full h-full text-center">
      <h3 className="font-bold text-sm uppercase text-white/90 mb-4">Control Panel</h3>

      <div className={`text-8xl mb-4 ${on ? "text-yellow-300" : "text-gray-400"}`}>
        <GiLightBulb />
      </div>

      <div className="text-white/80 mb-4">LED</div>

      <div className="flex flex-col items-center space-y-4">
        <div className={`px-6 py-2 rounded-full font-semibold text-white ${on ? "bg-green-500" : "bg-gray-400"}`}>
          {on ? "ON" : "OFF"}
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={on}
            onChange={toggle}
          />
          <div className="w-16 h-6 bg-white/50 rounded-full peer-checked:bg-green-400 transition-colors" />
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform peer-checked:translate-x-10 transition-transform shadow" />
        </label>
      </div>
    </div>
  );
}
