import React, {useEffect, useState} from "react";
import {requestFactory} from "../../common/utils";
import {CONSTANTS} from "../../common/constants";


const Diary = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    /*
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await requestFactory(CONSTANTS.API.DIARY);
            setUserData(response);
            setLoading(false);
            console.log(userData);
        }
        fetchUserData();
    }, []);
    */
    return (
        <div>

        </div>
    );
};

export default Diary;
