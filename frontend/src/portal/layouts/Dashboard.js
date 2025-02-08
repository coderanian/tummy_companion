import React, {useEffect, useState} from "react";
import {CONSTANTS} from "../../common/constants";
import {requestFactory} from "../../common/utils";
import {ChartLine, ChartPie, DashboardFilter, MoodPanel} from "../components";

const Dashboard = () => {
    const today = new Date();
    const from = new Date(today.setDate(today.getDate() - today.getDay()));
    const to = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateFrom, setDateFrom] = useState(from);
    const [dateTo, setDateTo] = useState(to);
    const [filter, setFilter] = useState(null)

    //Load initial data for today
    useEffect(() => {fetchUserData()}, []);

    const fetchUserData = async () => {
        try {
            const fromISO = dateFrom.toISOString();
            const toISO = dateTo.toISOString();
            const response = await requestFactory(CONSTANTS.API.DIARY, null, fromISO, toISO);
            setLoading(false);
            if (!response.success) return;
            setEntries(response.response);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    const handleDateFromChange = (val) => {
        const newDate = new Date(val);
        setDateFrom(newDate);
        if (newDate > dateTo) handleDateToChange(val);
    }


    const handleDateToChange = (val) => {
        const newDate = new Date(val);
        setDateTo(newDate);
    }

    const getDate = (date) => {
        if (!date || isNaN(date.getTime())) return ""; // Handle invalid date
        return date.toISOString().split("T")[0]; // Convert Date object to YYYY-MM-DD for input
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between align-baseline">
                <button className="w-[150px] font-garet-heavy text-center space-y-2 p-2 border-2 border-black bg-primary rounded-xl
                            hover:cursor-custom-pointer hover:text-primary hover:bg-secondary"
                        onClick={fetchUserData}
                >
                    Update data
                </button>
                <div className="flex space-x-10 justify-end">
                    <DashboardFilter value={getDate(dateFrom)}
                                     setValue={handleDateFromChange}
                                     text={"Date From"}
                    />
                    <DashboardFilter value={getDate(dateTo)}
                                     setValue={handleDateToChange}
                                     text={"Date To"}
                                     min={dateFrom}
                    />
                </div>
            </div>
            {loading && <div className="text-xl">Loading...</div>}
            {entries.length > 0 ? (
                <div className="h-[400px] flex py-4">
                    <div
                        className="flex-1 pr-8 space-y-10 overflow-y-scroll scrollbar scrollbar-thumb-black scrollbar-thumb-rounded-full active:scrollbar-thumb-secondary hover:scrollbar-thumb-secondary scrollbar-hide">
                        <div className="flex space-x-10">
                            <ChartLine entries={entries} type={"stool"} title={"Symptoms occurrence: stool issues"}/>
                            <MoodPanel entries={entries}/>
                        </div>
                        <div className="flex space-x-10">
                            <ChartLine entries={entries} type={"stomach"} title={"Symptoms occurrence: stomach issues"}/>
                            <ChartPie entries={entries} type={"food"} title={"Food intake"}/>
                        </div>
                        <div className="flex space-x-10">
                            <ChartLine entries={entries} type={"sleep"} title={"Sleep"}/>
                            <ChartPie entries={entries} title={"Drink intake"}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-xl">No entries for this timeframe. Please repeat your search.</div>
            )}
        </div>
    );
};

export default Dashboard;