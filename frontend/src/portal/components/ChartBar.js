import React, {useState} from "react";
import {Line, Pie} from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip } from "chart.js";

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip);

const allData = {
    sales: {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
            {
                label: "Sales",
                data: [30, 50, 80, 40],
                borderColor: "blue",
                fill: false,
                pointHoverRadius: 8, // Bigger points on hover
            },
        ],
    },
    revenue: {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
            {
                label: "Revenue",
                data: [1000, 1500, 2000, 1700],
                borderColor: "green",
                fill: false,
                pointHoverRadius: 8,
            },
        ],
    },
};

const pieData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
        {
            data: [10, 20, 30],
            backgroundColor: ["red", "blue", "yellow"],
            hoverOffset: 8, // Makes hover effect bigger
        },
    ],
};

const ChartBar = () => {
    const [selectedDataset, setSelectedDataset] = useState("sales");

    return (
        <div className="flex flex-col items-center">
            {/* Filter Dropdown */}
            <label className="mb-2 text-lg">Select Dataset:</label>
            <select
                onChange={(e) => setSelectedDataset(e.target.value)}
                value={selectedDataset}
                className="border rounded px-3 py-1 mb-4"
            >
                <option value="sales">Sales Data</option>
                <option value="revenue">Revenue Data</option>
            </select>

            {/* Line Chart with hover effect */}
            <Line
                data={allData[selectedDataset]}
                options={{
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
                            },
                        },
                    },
                }}
            />

            {/* Pie Chart with hover effect */}
            <Pie data={pieData}/>
        </div>
    );
}


export default ChartBar;