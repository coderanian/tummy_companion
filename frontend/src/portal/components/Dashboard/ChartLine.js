import React, {useState} from "react";
import {Line, Pie} from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip } from "chart.js";
import {setLineData, setLineOptions} from "../../utils/utils";

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip);

const allData = {
    sales: {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
            {
                label: "Sales",
                data: [30, 50, 80, 40],
                borderColor: "#f4d668",
                borderWidth: 4,
                borderCapStyle: "round",
                borderJoinStyle: "round",
                tension: 0.4,
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
                borderColor: "black",
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

const ChartLine = ({entries, title, type}) => {
    return (
        <div className="h-[250px] rounded-2xl border-2 border-black px-5 py-10 space-y-2 w-2/3">
            <h3 className="text-xl font-garet-heavy">{title}</h3>
            <Line
                data={setLineData(entries, type)}
                options={setLineOptions(type)}
            />
        </div>
    );
}


export default ChartLine;