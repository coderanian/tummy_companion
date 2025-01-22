import React, {useEffect, useState} from "react";
import {SidebarNavigation, UserPanel} from "./components";
import {Outlet, useLocation} from "react-router-dom";
import {requestFactory} from "../common/utils";
import {CONSTANTS} from "../common/constants";

const Portal = () => {
    //Extract page title from URL
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const urlPath = location.pathname.split('/').slice(-1)[0].split('-').join(' ');
    const pageTitle = urlPath.charAt(0).toUpperCase() + urlPath.slice(1);



    useEffect(() => {
        const fetchUserData = async () => {
            const response = await requestFactory(CONSTANTS.API.DIARY);
            setUserData(response);
            setLoading(false);
        }
        fetchUserData();
    }, []);

    return (
        <div className="flex">
            <SidebarNavigation />
            <div className="flex-1 mx-20 my-10 space-y-10">
                {(!loading && userData) && <UserPanel user={userData.response.user} />}
                <h1 className="text-4xl font-garet-heavy">
                    {pageTitle}
                </h1>
                {loading ? (
                    <div className="text-2xl">Loading...</div>
                ) : (
                    <Outlet context={{ userData, setUserData }} />
                )}
            </div>
        </div>
    );
};

export default Portal;