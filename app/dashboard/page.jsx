export default function DashboardPage() {
    return (
        <div className="dashboard-container p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="neumorph">Temperature Card Placeholder</div>
                <div className="neumorph">Humidity Card Placeholder</div>
                <div className="neumorph">Wind Card Placeholder</div>
            </div>

            <div className="mt-8 neumorph">Forecast Graph Placeholder</div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="neumorph">MQTT Panel Placeholder</div>
                <div className="neumorph">Control Panel Placeholder</div>
            </div>
        </div>
    );
}