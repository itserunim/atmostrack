"use client";
import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

const MQTT_SERVER = "wss://broker.hivemq.com:8884/mqtt";
const MQTT_BME_TOPIC = "esp32/bme";

const Thermometer = ({ value = 28, min = 0, max = 100 }) => {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const fillHeight = `calc(${pct}% - 8px)`;

  return (
    <div className="neumorph flex flex-col items-center justify-center p-4">
      <div className="thermo w-14 h-95 bg-transparent relative flex items-center justify-center">
        <div className="thermo-track absolute left-1/2 transform -translate-x-1/2 top-3 bottom-3 w-2 bg-white/20 rounded-full" />
        <div className="thermo-bulb absolute left-1/2 transform -translate-x-1/2 bottom-0 w-8 h-8 rounded-full bg-red-500 shadow-inner" />
        <div
          className="thermo-fill absolute left-1/2 transform -translate-x-1/2 w-2 bg-red-500 rounded-full"
          style={{ bottom: 10, height: fillHeight }}
        />
        <div className="absolute -right-6 top-2 text-sm font-semibold text-red-300">{max}°C</div>
        <div className="absolute -right-6 bottom-2 text-sm font-semibold text-blue-300">{min}°C</div>
      </div>
    </div>
  );
};

const TemperatureCard = ({ min = 0, max = 100 }) => {
  const [temperature, setTemperature] = useState(0);
  const [client, setClient] = useState(null);

  // Connect to MQTT broker
  useEffect(() => {
    const mqttClient = mqtt.connect(MQTT_SERVER, {
      clientId: "webclient-temp-" + Math.random().toString(16).substring(2, 10),
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker for BME280");
      mqttClient.subscribe(MQTT_BME_TOPIC);
    });

    mqttClient.on("message", (topic, payload) => {
      if (topic === MQTT_BME_TOPIC) {
        try {
          const data = JSON.parse(payload.toString());
          if (data.temperature !== undefined) setTemperature(data.temperature);
        } catch (e) {
          console.error("Failed to parse BME message:", e);
        }
      }
    });

    setClient(mqttClient);

    return () => mqttClient.end();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center">
      <div className="font-bold text-white/95 text-sm uppercase tracking-wide">Temperature</div>
      <div className="text-5xl font-extrabold text-white my-4">{temperature.toFixed(1)}°C</div>
      <div className="w-full flex items-center justify-center">
        <Thermometer value={temperature} min={min} max={max} />
      </div>
      <div className="font-semibold text-l text-blue-500 mt-4">Min: {min}°C</div>
      <div className="font-semibold text-l text-red-500">Max: {max}°C</div>
    </div>
  );
};

export default TemperatureCard;
