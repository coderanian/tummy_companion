import React, {useEffect, useState} from "react";
import {CONSTANTS} from "../../common/constants";
import {requestFactory} from "../../common/utils";
import {ChartBar} from "../components";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await requestFactory(CONSTANTS.API.DIARY);
            setUserData(response);
            setLoading(false);
        }
        fetchUserData();
    }, []);

    return (
        <div>
            {loading && <div className="text-2xl">Loading...</div>}
            {!loading && <ChartBar/>}
        </div>
    );
};

export default Dashboard;