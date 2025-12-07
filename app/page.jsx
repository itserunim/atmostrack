"use client";
import React, { useState, useEffect } from "react";
import TimeBasedBackground from "../components/TimeBasedBackground";
import TemperatureCard from "../components/TemperatureCard";
import HumidityCard from "../components/HumidityCard";
import WindCard from "../components/WindCard";
import PressureCard from "../components/PressureCard";
import ForecastGraph from "../components/ForecastGraph";
import RainCard from "../components/RainCard";
import ControlPanel from "../components/ControlPanel";
import StatusIndicator from "../components/StatusIndicator";

export default function DashboardPage() {
  const [now, setNow] = useState(null);
  const [mounted, setMounted] = useState(false); // track client mount

  useEffect(() => {
    setMounted(true); // safe to render client-only content
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null; // don't render anything during SSR

  const sampleForecast = {
    labels: ["Now", "1h", "2h", "3h", "4h", "5h"],
    data: [22, 22.5, 23, 22.8, 21.9, 21],
  };

  return (
    <TimeBasedBackground>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <header className="neumorph p-4 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img src="/atmostrack-logo.svg" alt="AtmosTrack" className="w-50 h-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <StatusIndicator status="Online" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Updated: {now ? now.toLocaleTimeString() : "--:--:--"}
            </p>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="col-span-12 md:col-span-2">
            <div className="neumorph h-full flex items-center justify-center p-4">
              <TemperatureCard current={25} min={0} max={50} />
            </div>
          </aside>

          {/* Right Content */}
          <section className="col-span-12 md:col-span-10 space-y-6">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <HumidityCard />
              <WindCard />
              <MQTTPanel />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                <ForecastGraph
                  labels={sampleForecast.labels}
                  data={sampleForecast.data}
                />
              </div>
              <div className="lg:col-span-1">
                <ControlPanel initial={true} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </TimeBasedBackground>
  );
}
