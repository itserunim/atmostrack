import React from "react";
import TimeBasedBackground from "../components/TimeBasedBackground";
import TemperatureCard from "../components/TemperatureCard";
import HumidityCard from "../components/HumidityCard";
import WindCard from "../components/WindCard";
import ForecastGraph from "../components/ForecastGraph";
import MQTTPanel from "../components/MQTTPanel";
import ControlPanel from "../components/ControlPanel";
import StatusIndicator from "../components/StatusIndicator";

export default function DashboardPage() {
    const now = new Date();
    const sampleForecast = {
        labels: ["Now", "1h", "2h", "3h", "4h", "5h"],
        data: [22, 22.5, 23, 22.8, 21.9, 21],
    };

    const controls = [
        { id: 1, name: "Heater", state: false },
        { id: 2, name: "Humidifier", state: true },
        { id: 3, name: "Vent", state: false },
    ];

    return (
        <TimeBasedBackground>
            <div className="max-w-7xl mx-auto p-6">
                <header className="neumorph p-4 flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <img src="/atmostrack-logo.svg" alt="AtmosTrack" className="w-50 h-auto" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <StatusIndicator status="online" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">Updated: {now.toLocaleTimeString()}</p>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left vertical thermometer column */}
                    <aside className="col-span-12 md:col-span-2">
                        <div className="neumorph h-full flex items-center justify-center p-4">
                            <TemperatureCard current={25} min={15} max={45} />
                        </div>
                    </aside>

                    {/* Right main area */}
                    <section className="col-span-12 md:col-span-10 space-y-6">
                        {/* Top small cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="">
                                <HumidityCard humidity={70} />
                            </div>
                            <div className="">
                                <WindCard speed={8} direction={'SE'} />
                            </div>
                            <div className="">
                                <MQTTPanel />
                            </div>
                        </div>

                        {/* Middle area: large forecast and control panel */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                            <div className="lg:col-span-2">
                                <ForecastGraph labels={sampleForecast.labels} data={[22,21,22,23,24,25,23]} />
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