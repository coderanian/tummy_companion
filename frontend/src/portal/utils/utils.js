import {SYMPTOMS} from "./constants";

export function symptomsBuilder(entry) {
    let symptoms = [];
    if (entry.mood_scale < 3) symptoms.push("Bad mood");
    if (entry.sleep_quality_scale < 3 || entry.sleep_duration_length < 6) symptoms.push("Bad sleep");
    if (entry.stool_consistency_scale === 3
        || entry.stool_quantity_scale === 3
        || entry.stool_urgency
        || entry.stool_mucus
        || entry.stool_blood
    ) symptoms.push("Stool issues");
    if (entry.stomach_pain || entry.stomach_bloating || entry.stomach_flatulence) symptoms.push("Stomach issues");
    return symptoms.length === 0 ? "None" : symptoms.join(", ");
}

export function setLineData(entries, type) {
    if (!entries || entries.length === 0) {
        return { labels: [], datasets: [] };
    }

    // Convert timestamps to readable dates (YYYY-MM-DD)
    const labels = entries.map((entry) =>
        entry.timestamp ? new Date(entry.timestamp).toISOString().split("T")[0] : "N/A"
    );

    // Common dataset styles
    const datasetStyles = (label, data, color) => ({
        label,
        data,
        borderColor: color,
        borderWidth: 4,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        tension: 0.4,
        pointHoverRadius: 8,
    });

    if (type === "stool") {
        return {
            labels,
            datasets: [
                datasetStyles("Stool: Mucus", entries.map(e => e.stool_mucus ? 1 : 0), "#c98d26"),
                datasetStyles("Stool: Blood", entries.map(e => e.stool_blood ? 1 : 0), "#005e38"),
                datasetStyles("Stool: Urgency", entries.map(e => e.stool_urgency ? 1 : 0), "#f4d668"),
            ],
        };
    } else if (type === "stomach") {
        return {
            labels,
            datasets: [
                datasetStyles("Pain", entries.map(e => e.stomach_pain ? 1 : 0), "#c98d26"),
                datasetStyles("Bloating", entries.map(e => e.stomach_bloating ? 1 : 0), "#005e38"),
                datasetStyles("Flatulence", entries.map(e => e.stomach_flatulence ? 1 : 0), "#f4d668"),
            ],
        };
    } else {
        return {
            labels,
            datasets: [
                datasetStyles("Sleep Quality", entries.map(e => e.sleep_quality_scale), "#c98d26"),
                datasetStyles("Sleep Duration", entries.map(e => e.sleep_duration_length), "#005e38"),
            ],
        };
    }
}

export function setLineOptions(type) {
    return {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: { grid: { color: "black" } },
            y: {
                min: 0,
                max: type === "sleep" ? 10 : 1,
                ticks: {
                    stepSize: 1, // Only allow 0 and 1
                    callback: function (value) {
                        return value === 0 || value === 1 ? value : "";
                    },
                },
                grid: { color: "black" }
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    color: "#000", // Text color
                    font: {
                        size: 14, // Font size
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;
                        const datasetLabel = tooltipItem.dataset.label;
                        const value = tooltipItem.raw;
                        return `${datasetLabel}: ${value}`;
                    }
                },
            },
        }
    }
}

export function getMoodValueForTimeframe(entries) {
    if (!entries) return {icon: "X", label: "No data available"}
    const moodTimeframe = Math.ceil(entries.reduce((sum, entry) => sum + entry.mood_scale, 0) / entries.length);
    return SYMPTOMS.wellbeing.formValues[moodTimeframe];
}

export function setPieData(entries, type) {
    const counts = {};
    if (type === "food") {
        entries.forEach(entry => {
            entry.food.forEach(item => {
                counts[item] = (counts[item] || 0) + 1;
            });
        });
    } else {
        entries.forEach(entry => {
            entry.drink.forEach(item => {
                counts[item] = (counts[item] || 0) + 1;
            });
        });
    }
    return {
        labels: Object.keys(counts),
        datasets: [
            {
                data: Object.values(counts),
                hoverOffset: 8,
                backgroundColor: [
                    "#f4d668",
                    "#005e38",
                    "#c98d26",
                    "#4bc0c0",
                    "#9966ff",
                    "#ff9f40",
                ],
            },
        ],
    };
}