import React, {useEffect, useState} from "react";
import {SidebarNavigation, UserPanel} from "./components";
import {Outlet, useLocation} from "react-router-dom";
import {requestFactory} from "../common/utils";

const Portal = () => {
    //Extract page title from URL
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const pageTitle = location.pathname.split('/').pop().split();

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
                    {pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}
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