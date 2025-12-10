"use client";
import React, { useState, useEffect } from "react";
import { GiLightBulb } from "react-icons/gi";
import mqtt from "mqtt";

const MQTT_SERVER = "wss://broker.hivemq.com:8884/mqtt";
const MQTT_LED_TOPIC = "esp32/led";

export default function ControlPanel({ initial = false, online = false }) {
  const [on, setOn] = useState(initial);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true; // avoid state update if unmounted
    const mqttClient = mqtt.connect(MQTT_SERVER, {
      clientId: "webclient-" + Math.random().toString(16).slice(2, 10),
      protocol: "wss",
      reconnectPeriod: 1000,
      clean: true,
    });

    mqttClient.on("connect", () => mqttClient.subscribe(MQTT_LED_TOPIC));
    mqttClient.on("message", (topic, message) => {
      if (topic === MQTT_LED_TOPIC && isMounted) {
        setOn(message.toString() === "ON");
      }
    });

    setClient(mqttClient);

    return () => {
      isMounted = false;
      mqttClient.end(true);
    };
  }, []);

  const toggle = () => {
    if (!client || !online) return;
    const newState = !on;
    setOn(newState);
    client.publish(MQTT_LED_TOPIC, newState ? "ON" : "OFF");
  };

  return (
    <div className="neumorph p-10 flex flex-col items-center justify-center w-full h-full text-center">
      <h3 className="font-bold text-lg uppercase text-white/90 mb-2">Control Panel</h3>

      <div className={`text-8xl mb-4 ${on ? "text-yellow-300" : "text-gray-400"} ${!online ? "opacity-50" : ""}`}>
        <GiLightBulb />
      </div>

      <div className="text-white/80 mb-4">LED</div>

      <div className="flex flex-col items-center space-y-4">
        <div className={`px-6 py-2 rounded-full font-semibold text-white ${on ? "bg-green-500" : "bg-gray-400"} ${!online ? "opacity-50 cursor-not-allowed" : ""}`}>
          {on ? "ON" : "OFF"}
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={on}
            onChange={toggle}
            disabled={!online}
          />
          <div className="w-16 h-6 bg-white/50 rounded-full peer-checked:bg-green-400 transition-colors" />
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform peer-checked:translate-x-10 transition-transform shadow" />
        </label>
      </div>
    </div>
  );
}
